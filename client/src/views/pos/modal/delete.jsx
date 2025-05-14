import React, { useState } from 'react'
import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from '@coreui/react'
import PropTypes from 'prop-types'

const DeleteConfirmation = ({ data }) => {
    const {
        showDeleteModal,
        setShowDeleteModal,
        products,
        setProducts,
        selectedProduct,
        setSelectedProduct,
    } = data

    const handleDelete = () => {
        if (selectedProduct.length === 0) return alert('Select a product')
        setProducts((prevProducts) =>
            prevProducts.filter((product) => !selectedProduct.includes(product.id)),
        )
        setSelectedProduct([])
        setShowDeleteModal(false)
    }

    return (
        <>
            <CModal
                visible={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                aria-labelledby="Confirm Delete?"
            >
                <CModalHeader>
                    <CModalTitle id="LiveDemoExampleLabel">Confirm Delete?</CModalTitle>
                </CModalHeader>
                <CModalBody>Woohoo, confirm to delete {selectedProduct.length} items?</CModalBody>
                <CModalFooter>
                    <CButton color="secondary" onClick={() => setShowDeleteModal(false)}>
                        Close
                    </CButton>
                    <CButton color="primary" onClick={handleDelete}>
                        Save changes
                    </CButton>
                </CModalFooter>
            </CModal>
        </>
    )
}

export default DeleteConfirmation

DeleteConfirmation.propTypes = {
    data: PropTypes.shape({
        showDeleteModal: PropTypes.bool.isRequired,
        setShowDeleteModal: PropTypes.func.isRequired,
        products: PropTypes.array.isRequired,
        setProducts: PropTypes.func.isRequired,
        selectedProduct: PropTypes.array.isRequired,
        setSelectedProduct: PropTypes.func.isRequired,
    }).isRequired,
}
