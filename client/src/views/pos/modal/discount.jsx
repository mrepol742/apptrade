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
        products.find((product) => selectedProduct.includes(product.id))?.discount,
    )

    const handleClose = () => {
        setDiscount(0)
        setShowDiscountModal(false)
    }

    const handleDiscountUpdate = () => {
        if (discount < 0) return toast.error('Discount cannot be negative')
        if (discount > 100) return toast.error('Discount cannot be more than 100%')
        setProducts((prevProducts) =>
            prevProducts.map((product) =>
                selectedProduct.includes(product.id) ? { ...product, discount } : product,
            ),
        )
        setSelectedProduct([])
        setShowDiscountModal(false)
    }

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
                        min={1}
                        max={999}
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
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((num, index) => (
                            <CButton
                                key={num}
                                color="outline-primary"
                                onClick={() => setDiscount((prev) => (prev + '' || '') + num)}
                                style={{ height: '50px' }}
                            >
                                {num}
                            </CButton>
                        ))}
                        <CButton
                            color="outline-danger"
                            onClick={() => setDiscount((prev) => prev?.slice(0, -1) || '')}
                            style={{ gridColumn: 'span 3', width: '100%', height: '50px' }}
                        >
                            Del
                        </CButton>
                    </div>
                </CModalBody>
                <CModalFooter>
                    <CButton color="secondary" onClick={() => setShowDiscountModal(false)}>
                        Close
                    </CButton>
                    <CButton color="primary" onClick={handleDiscountUpdate}>
                        Save changes
                    </CButton>
                </CModalFooter>
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
