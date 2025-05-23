import React, { useEffect, useState, useRef, use } from 'react'
import {
    CButton,
    CFormInput,
    CModal,
    CModalBody,
    CModalFooter,
    CModalHeader,
    CModalTitle,
} from '@coreui/react'
import PropTypes from 'prop-types'
import { toast } from 'react-toastify'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDeleteLeft } from '@fortawesome/free-solid-svg-icons'
import { reference } from '@popperjs/core'

const PaymentInput = ({ data }) => {
    const {
        showPaymentModal,
        setShowPaymentModal,
        products,
        setProducts,
        selectedProduct,
        setSelectedProduct,
        total,
        paymentMethod,
        setPaymentMethod,
    } = data
    const [amount, setAmount] = useState(products.amount || '')

    const handleClose = () => {
        setAmount('')
        setShowPaymentModal(false)
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter' && showPaymentModal) handleCheckout()
    }

    const handleChange = () => {
        const amount1 = parseFloat(amount)
        const total1 = parseFloat(total)
        const value =
            amount1 >= total1 ? (
                <>
                    {(amount1 - total1).toLocaleString('en-PH', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                    })}
                </>
            ) : (
                '0.00'
            )
        return value
    }

    const handleCheckout = async () => {
        if (products.length === 0) return toast.error('Select a product')
        if (amount < 0) return toast.error('Amount cannot be negative')
        if (parseInt(amount) < parseInt(total)) return toast.error('Amount is less than total')
        if (parseInt(amount) > Number.MAX_SAFE_INTEGER)
            return toast.error('Amount is greater than max safe integer')
        axios
            .post('/sales/checkout', {
                products: products,
                total: total,
                total_discount: 0,
                total_taxes: 0,
                total_payment: amount,
                total_change: amount - total,
                mode_of_payment: paymentMethod,
                reference_number: '12',
            })
            .then((res) => {
                if (res.data.error) return toast.error(res.data.error)
                if (res.status === 200) {
                    const socket = new WebSocket('ws://localhost:8080')

                    socket.onopen = () => {
                        console.log('Connected to print server')
                        socket.send(
                            JSON.stringify({
                                name: 'Apptrade Inc.',
                                address: '1234 Main St, City, State, Zip',
                                phone: '123-456-7890',
                                email: 'example@gmail.com',
                                website: 'www.example.com',
                                date: new Date().toLocaleString(),
                                receipt: res.data.receipt,
                            }),
                        )
                    }

                    socket.onmessage = (event) => {
                        console.log('Server says:', event.data)
                    }

                    socket.onerror = (error) => {
                        console.error('WebSocket Error:', error)
                    }

                    setProducts([])
                    setSelectedProduct([])
                    setShowPaymentModal(false)
                    toast.success('Checkout successful')
                }
            })
            .catch((err) => {
                console.error(err)
                toast.error('Checkout failed')
            })
    }

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown)

        return () => {
            window.removeEventListener('keydown', handleKeyDown)
        }
    }, [])

    return (
        <>
            <CModal
                alignment="center"
                scrollable
                visible={showPaymentModal}
                onClose={handleClose}
                aria-labelledby="Payment"
            >
                <CModalBody>
                    <h5>Payment</h5>
                    <div className="d-flex flex-row justify-content-between gap-2 mb-3">
                        <div
                            className={`rounded py-3 m-1 d-flex flex-column align-items-center border border-2 flex-fill ${paymentMethod === 'cash' ? 'bg-primary border-primary' : 'border-secondary'}`}
                            onClick={() => setPaymentMethod('cash')}
                            style={{ cursor: 'pointer' }}
                        >
                            Cash
                        </div>
                        <div
                            className={`rounded py-3 m-1 d-flex flex-column align-items-center border border-2 flex-fill ${paymentMethod === 'credit' ? 'bg-primary border-primary' : 'border-secondary'}`}
                            onClick={() => setPaymentMethod('credit')}
                            style={{ cursor: 'pointer' }}
                        >
                            Credit
                        </div>
                        <div
                            className={`rounded py-3 m-1 d-flex flex-column align-items-center border border-2 flex-fill ${paymentMethod === 'debit' ? 'bg-primary border-primary' : 'border-secondary'}`}
                            onClick={() => setPaymentMethod('debit')}
                            style={{ cursor: 'pointer' }}
                        >
                            Debit
                        </div>
                        <div
                            className={`rounded py-3 m-1 d-flex flex-column align-items-center border border-2 flex-fill ${paymentMethod === 'check' ? 'bg-primary border-primary' : 'border-secondary'}`}
                            onClick={() => setPaymentMethod('check')}
                            style={{ cursor: 'pointer' }}
                        >
                            Check
                        </div>
                    </div>
                    <div className="d-flex justify-content-between">
                        <p>Total:</p>
                        <div className="text-wrap text-break overflow-y">
                            {total.toLocaleString('en-PH', {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                            })}
                        </div>
                    </div>
                    <div className="d-flex justify-content-between">
                        <p className="my-auto">Paid:</p>
                        <CFormInput
                            type="number"
                            value={amount}
                            onChange={(e) => {
                                let val = e.target.value
                                if (val.length > 1 && val.startsWith('0')) {
                                    val = val.replace(/^0+/, '')
                                }
                                if (val === '' || Number(val) <= Number.MAX_SAFE_INTEGER) {
                                    setAmount(val)
                                }
                            }}
                            placeholder="Enter amount"
                            min={0}
                            max={Number.MAX_SAFE_INTEGER}
                            className="w-50"
                        />
                    </div>
                    <hr />
                    <div className="d-flex justify-content-between">
                        <p className="me-3">Change:</p>
                        <div className="text-wrap text-break overflow-y">{handleChange()}</div>
                    </div>
                    <div className="d-flex justify-content-end mt-3 gap-2">
                        <CButton
                            color="primary"
                            onClick={handleCheckout}
                            disabled={
                                !amount ||
                                parseInt(amount) < parseInt(total) ||
                                parseInt(amount) > Number.MAX_SAFE_INTEGER
                            }
                        >
                            Print Receipt
                        </CButton>
                    </div>
                </CModalBody>
            </CModal>
        </>
    )
}

export default PaymentInput

PaymentInput.propTypes = {
    data: PropTypes.shape({
        showPaymentModal: PropTypes.bool.isRequired,
        setShowPaymentModal: PropTypes.func.isRequired,
        products: PropTypes.array.isRequired,
        setProducts: PropTypes.func.isRequired,
        selectedProduct: PropTypes.array.isRequired,
        setSelectedProduct: PropTypes.func.isRequired,
        total: PropTypes.number.isRequired,
        paymentMethod: PropTypes.string.isRequired,
        setPaymentMethod: PropTypes.func.isRequired,
    }).isRequired,
}
