import React, { useState, useEffect } from 'react'
import {
    CRow,
    CCol,
    CCard,
    CCardBody,
    CCardHeader,
    CButton,
    CTable,
    CTableHead,
    CTableRow,
    CTableHeaderCell,
    CTableBody,
    CFormInput,
    CTableDataCell,
} from '@coreui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose, faSearch, faAdd, faCartPlus } from '@fortawesome/free-solid-svg-icons'

const PointOfSale = () => {
    const [products, setProducts] = useState([])
    const [selectedProduct, setSelectedProduct] = useState([])
    const [showQuantityModal, setShowQuantityModal] = useState(false)

    const addProduct = (product) => {
        setProducts((prevProducts) => {
            const existingProduct = prevProducts.find((p) => p.id === product.id)
            if (existingProduct) {
                return prevProducts.map((p) =>
                    p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p,
                )
            } else {
                return [...prevProducts, { ...product, quantity: 1 }]
            }
        })
    }

    const subTotal = products.reduce((acc, product) => {
        return acc + product.sale_price * product.quantity
    }, 0)

    const handleKeyDown = (event) => {
        if (event.key === 'F1') {
            event.preventDefault()
        }
    }

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown)
        return () => {
            window.removeEventListener('keydown', handleKeyDown)
        }
    }, [])

    const handleSearch = (event) => {
        const query = event.target.value.toLowerCase()
        axios
            .get(`/products/${query}`)
            .then((response) => {
                addProduct(response.data[0])
            })
            .catch((error) => {
                console.error('Error searching products:', error)
            })
    }

    const handleFocusClick = (product_id) => {
        if (selectedProduct.includes(product_id))
            return setSelectedProduct(selectedProduct.filter((id) => id !== product_id))
        setSelectedProduct([...selectedProduct, product_id])
    }

    const handleQuantity = () => {
        if (selectedProduct.length === 0) return alert('Select a product')
        setShowQuantityModal(true)
    }

    const handleDelete = () => {
        if (selectedProduct.length === 0) return alert('Select a product')
        setProducts((prevProducts) =>
            prevProducts.filter((product) => !selectedProduct.includes(product.id)),
        )
        setSelectedProduct([])
    }

    const handleNewSale = () => {
        if (products.length === 0) return alert('No products in cart')
        setProducts([])
        setSelectedProduct([])
    }

    return (
        <CRow style={{ height: '100vh' }}>
            <CCol>
                <CFormInput
                    className="rounded-0 py-3 border-0 border-bottom"
                    type="search"
                    placeholder="Search product by name or barcode"
                    aria-label="Search"
                    onKeyDown={(event) => {
                        if (event.key === 'Enter') {
                            handleSearch(event)
                            event.target.value = ''
                        }
                    }}
                />
                <div style={{ height: 'calc(100% - 180px)', overflowY: 'auto' }}>
                    <CTable hover responsive>
                        <CTableHead>
                            <CTableRow>
                                <CTableHeaderCell scope="col">Product</CTableHeaderCell>
                                <CTableHeaderCell scope="col">Price</CTableHeaderCell>
                                <CTableHeaderCell scope="col">Quantity</CTableHeaderCell>
                                <CTableHeaderCell scope="col">Total</CTableHeaderCell>
                            </CTableRow>
                        </CTableHead>
                        {products.length == 0 ? (
                            <div className="text-center">
                                <h1>No items</h1>
                            </div>
                        ) : (
                            <CTableBody>
                                {products.map((product, index) => (
                                    <CTableRow
                                        key={index}
                                        active={selectedProduct.includes(product.id)}
                                        onClick={() => handleFocusClick(product.id)}
                                    >
                                        <CTableDataCell>{product.name}</CTableDataCell>
                                        <CTableDataCell>{product.sale_price}</CTableDataCell>
                                        <CTableDataCell>{product.quantity}</CTableDataCell>
                                        <CTableDataCell>
                                            {product.sale_price * product.quantity}
                                        </CTableDataCell>
                                    </CTableRow>
                                ))}
                            </CTableBody>
                        )}
                    </CTable>
                </div>
                <div className="bg-body-secondary p-2">
                    <div className="d-flex justify-content-between">
                        <span>Subtotal:</span>
                        <span>{subTotal}</span>
                    </div>
                    <div className="d-flex justify-content-between">
                        <span>Tax:</span>
                        <span>0.00</span>
                    </div>
                    <div className="d-flex justify-content-between">
                        <strong>Total:</strong>
                        <strong>{subTotal}</strong>
                    </div>
                </div>
            </CCol>
            <CCol
                className="bg-body-secondary rounded m-2"
                style={{ height: '100vh', width: '100%' }}
            >
                <div className="d-flex justify-content-between align-items-center mb-3 mt-2 text-center">
                    <div
                        className="rounded py-5 m-1 d-flex flex-column align-items-center border border-secondary"
                        onClick={handleDelete}
                        style={{ flex: 1 }}
                    >
                        <FontAwesomeIcon
                            icon={faClose}
                            className="mb-2"
                            style={{ width: '50px', height: '50px' }}
                        />
                        Delete
                    </div>
                    <div
                        className="rounded py-5 m-1 d-flex flex-column align-items-center border border-secondary"
                        onClick={handleQuantity}
                        style={{ flex: 1 }}
                    >
                        <FontAwesomeIcon
                            icon={faCartPlus}
                            className="mb-2"
                            style={{ width: '50px', height: '50px' }}
                        />
                        Quantity
                    </div>
                    <div
                        className="rounded py-5 m-1 d-flex flex-column align-items-center border border-secondary"
                        onClick={handleNewSale}
                        style={{ flex: 1 }}
                    >
                        <FontAwesomeIcon
                            icon={faAdd}
                            className="mb-2"
                            style={{ width: '50px', height: '50px' }}
                        />
                        New Sale
                    </div>
                </div>
                <div className="d-flex justify-content-between align-items-center text-center">
                    <div
                        className="rounded py-3 m-1 d-flex flex-column align-items-center border border-secondary"
                        onClick={() => alert('Cash')}
                        style={{ flex: 1 }}
                    >
                        Cash
                    </div>
                    <div
                        className="rounded py-3 m-1 d-flex flex-column align-items-center border border-secondary"
                        onClick={() => alert('Credit Card')}
                        style={{ flex: 1 }}
                    >
                        Credit Card
                    </div>
                    <div
                        className="rounded py-3 m-1 d-flex flex-column align-items-center border border-secondary"
                        onClick={() => alert('Debit Card')}
                        style={{ flex: 1 }}
                    >
                        Debit Card
                    </div>
                </div>
                <div className="d-flex justify-content-between align-items-center mb-3 text-center">
                    <div
                        className="rounded py-3 m-1 d-flex flex-column align-items-center border border-secondary"
                        onClick={() => alert('Check')}
                        style={{ flex: 1 }}
                    >
                        Check
                    </div>
                    <div
                        className="rounded py-3 m-1 d-flex flex-column align-items-center border border-secondary"
                        onClick={() => alert('Gift Card')}
                        style={{ flex: 1 }}
                    >
                        Gift Card
                    </div>
                    <div
                        className="rounded py-3 m-1 d-flex flex-column align-items-center border border-secondary"
                        onClick={() => alert('Voucher')}
                        style={{ flex: 1 }}
                    >
                        Voucher
                    </div>
                </div>
                <div className="d-flex justify-content-between align-items-center mb-3 text-center"></div>
            </CCol>
        </CRow>
    )
}

export default PointOfSale
