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

const DiscountInput = ({ data }) => {
    const {
        showDiscountModal,
        setShowDiscountModal,
        products,
        setProducts,
        selectedProduct,
        setSelectedProduct,
    } = data
    const [discount, setDiscount] = useState(
        products.find((product) => selectedProduct.includes(product.id))?.discount || '',
    )

    const handleClose = () => {
        setDiscount(0)
        setShowDiscountModal(false)
    }

    const handleDiscountUpdate = () => {
        if (discount < 0) return toast.error('Discount cannot be negative')
        if (discount > 100) return toast.error('Discount cannot be more than 100%')
        if (selectedProduct.length > 0) {
            setProducts((prevProducts) =>
                prevProducts.map((product) =>
                    selectedProduct.includes(product.id) ? { ...product, discount } : product,
                ),
            )
        } else {
            setProducts((prevProducts) => {
                const discountIndex = prevProducts.findIndex((product) => product.id === 'discount')
                if (discountIndex !== -1)
                    return prevProducts.map((product) =>
                        product.id === 'discount'
                            ? { ...product, discount: Number(discount), date: Date.now() }
                            : product,
                    )
                return [
                    ...prevProducts,
                    {
                        id: 'discount',
                        date: Date.now(),
                        discount: Number(discount),
                    },
                ]
            })
        }
        setSelectedProduct([])
        setShowDiscountModal(false)
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') handleDiscountUpdate()
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
                visible={showDiscountModal}
                onClose={handleClose}
                aria-labelledby="Discount Input"
            >
                <CModalBody>
                    <CFormInput
                        type="number"
                        id="discount"
                        placeholder="Enter discount"
                        value={discount}
                        onChange={(e) => setDiscount(e.target.value)}
                    />
                    <div
                        className="numpad"
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(3, 1fr)',
                            gap: '10px',
                            marginTop: '15px',
                        }}
                    >
                        <CButton
                            color="primary"
                            onClick={() => setDiscount(20)}
                            style={{ height: '50px' }}
                        >
                            Senior
                        </CButton>
                        <CButton
                            color="primary"
                            onClick={() => setDiscount(20)}
                            style={{ height: '50px' }}
                        >
                            PWD
                        </CButton>
                        <CButton
                            color="primary"
                            onClick={() => setDiscount(30)}
                            style={{ height: '50px' }}
                        >
                            Employee
                        </CButton>
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num, index) => (
                            <CButton
                                key={num}
                                color="outline-primary"
                                onClick={() => setDiscount((prev) => parseInt(prev + '' + num))}
                                style={{ height: '50px' }}
                            >
                                {num}
                            </CButton>
                        ))}
                        <CButton
                            color="outline-danger"
                            onClick={() => setDiscount('')}
                            style={{ height: '50px' }}
                        >
                            C
                        </CButton>
                        <CButton
                            color="outline-primary"
                            onClick={() => setDiscount((prev) => parseInt(prev + '' + 0))}
                            style={{ height: '50px' }}
                        >
                            0
                        </CButton>
                        <CButton
                            color="outline-danger"
                            onClick={() =>
                                setDiscount((prev) => (prev && prev.toString().slice(0, -1)) || '')
                            }
                            style={{ height: '50px' }}
                        >
                            <FontAwesomeIcon icon={faDeleteLeft} />
                        </CButton>
                    </div>
                    <div className="d-flex justify-content-end mt-3 gap-2">
                        <CButton color="primary" onClick={handleDiscountUpdate}>
                            Save changes
                        </CButton>
                    </div>
                </CModalBody>
            </CModal>
        </>
    )
}

export default DiscountInput

DiscountInput.propTypes = {
    data: PropTypes.shape({
        showDiscountModal: PropTypes.bool.isRequired,
        setShowDiscountModal: PropTypes.func.isRequired,
        products: PropTypes.array.isRequired,
        setProducts: PropTypes.func.isRequired,
        selectedProduct: PropTypes.array.isRequired,
        setSelectedProduct: PropTypes.func.isRequired,
    }).isRequired,
}
