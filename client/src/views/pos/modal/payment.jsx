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
    const [amount, setAmount] = useState(
        products.amount || '',
    )

    const handleClose = () => {
        setAmount('')
        setShowPaymentModal(false)
    }

    const handlePayment = () => {
        if (amount < 0) return toast.error('Amount cannot be negative')
        
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') handlePayment()
    }

    const handleChange = () => {
        const amount1 = parseFloat(amount)
        const total1 = parseFloat(total)
        const value = amount1 >= total1
            ? <>{(amount1 - total1).toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</>
            : '0.00'
            return value
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
                        <div className="text-wrap text-break overflow-y">{total}</div>
                    </div>
                    <div className="d-flex justify-content-between">
                        <p className="my-auto">Paid:</p>
                        <CFormInput
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder="Enter amount"
                            min={0}
                            className="w-50"
                        />
                    </div>
                    <hr />
                    <div className="d-flex justify-content-between">
                        <p className="me-3">Change:</p>
                        <div className="text-wrap text-break overflow-y">{handleChange()}</div>
                    </div>
                    <div className="d-flex justify-content-end mt-3 gap-2">
                        <CButton color="primary" onClick={handlePayment} disabled={!amount || parseInt(amount) < parseInt(total)}>
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
