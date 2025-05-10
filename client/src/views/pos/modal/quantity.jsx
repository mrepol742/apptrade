import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
    CButton,
    CFormInput,
    CModal,
    CModalBody,
    CModalFooter,
    CModalHeader,
    CModalTitle,
} from '@coreui/react'

const QuantityInput = ({ data }) => {
    const {
        showQuantityModal,
        setShowQuantityModal,
        products,
        setProducts,
        selectedProduct,
        setSelectedProduct,
    } = data
    const [quantity, setQuantity] = useState(
        products.find((product) => selectedProduct.includes(product.id))?.quantity,
    )

    const handleQuantityUpdate = () => {
        setProducts((prevProducts) =>
            prevProducts.map((product) =>
                selectedProduct.includes(product.id) ? { ...product, quantity } : product,
            ),
        )
        setSelectedProduct([])
        setShowQuantityModal(false)
    }

    return (
        <>
            <CModal
                visible={showQuantityModal}
                onClose={() => setShowQuantityModal(false)}
                aria-labelledby="Quantity Input"
            >
                <CModalBody>
                    <CFormInput
                        type="number"
                        id="quantity"
                        placeholder="Enter quantity"
                        value={quantity}
                        min={1}
                        max={999}
                        onChange={(e) => setQuantity(e.target.value)}
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
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((num, index) => (
                            <CButton
                                key={num}
                                color="primary"
                                onClick={() => setQuantity((prev) => (prev || '') + num)}
                                style={{ height: '50px' }}
                            >
                                {num}
                            </CButton>
                        ))}
                        <CButton
                            color="danger"
                            onClick={() => setQuantity((prev) => prev?.slice(0, -1) || '')}
                            style={{ gridColumn: 'span 3', width: '100%', height: '50px' }}
                        >
                            Del
                        </CButton>
                    </div>
                </CModalBody>
                <CModalFooter>
                    <CButton color="secondary" onClick={() => setShowQuantityModal(false)}>
                        Close
                    </CButton>
                    <CButton color="primary" onClick={handleQuantityUpdate}>
                        Save changes
                    </CButton>
                </CModalFooter>
            </CModal>
        </>
    )
}

export default QuantityInput

QuantityInput.propTypes = {
    data: PropTypes.shape({
        showQuantityModal: PropTypes.bool.isRequired,
        setShowQuantityModal: PropTypes.func.isRequired,
        products: PropTypes.array.isRequired,
        setProducts: PropTypes.func.isRequired,
        selectedProduct: PropTypes.array.isRequired,
        setSelectedProduct: PropTypes.func.isRequired,
    }).isRequired,
}
