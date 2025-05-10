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
import { toast } from 'react-toastify'
import DeleteModal from './modal/delete'
import QuantityModal from './modal/quantity'

const PointOfSale = () => {
    const [products, setProducts] = useState([])
    const [selectedProduct, setSelectedProduct] = useState([])
    const [searchQuery, setSearchQuery] = useState('')
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [showQuantityModal, setShowQuantityModal] = useState(false)
    const [showNewSaleModal, setShowNewSaleModal] = useState(false)
    const [isDirty, setIsDirty] = useState(false)

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

    const subTotal = products
        .reduce((acc, product) => {
            return acc + product.sale_price * product.quantity
        }, 0)
        .toFixed(2)

    const totalTaxes = products
        .reduce((acc, product) => {
            return (
                acc +
                (product.taxes ? (product.sale_price * product.taxes) / 100 : 0) * product.quantity
            )
        }, 0)
        .toFixed(2)

    const total = (parseFloat(subTotal) + parseFloat(totalTaxes)).toFixed(2)

    const handleKeyDown = (event) => {
        if (event.key === 'F1') {
            event.preventDefault()
        }
    }

    useEffect(() => {
        const handleBeforeUnload = (event) => {
            if (isDirty) {
                event.preventDefault()
                event.returnValue = ''
                return ''
            }
        }

        window.addEventListener('beforeunload', handleBeforeUnload)
        window.addEventListener('keydown', handleKeyDown)
        return () => {
            window.removeEventListener('keydown', handleKeyDown)
            window.removeEventListener('beforeunload', handleBeforeUnload)
        }
    }, [isDirty])

    const handleSearch = (event) => {
        const query = event.target.value.toLowerCase()
        axios
            .get(`/products/${query}`)
            .then((response) => {
                addProduct(response.data[0])
                setIsDirty(true)
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
        if (selectedProduct.length === 0) return toast.error('Select a product')
        setShowQuantityModal(true)
    }

    const handleDelete = () => {
        if (selectedProduct.length === 0) return toast.error('Select a product')
        setShowDeleteModal(true)
    }

    const handleNewSale = () => {
        if (products.length === 0) return toast.error('No products in cart')
        setProducts([])
        setSelectedProduct([])
    }

    const handleSearchInput = (event) => {
        setSearchQuery(event.target.value)

        if (event.target.value.length > 0) {
            const currentTime = new Date().getTime()
            if (!event.target.lastInputTime) {
                event.target.lastInputTime = currentTime
            } else {
                const timeDifference = currentTime - event.target.lastInputTime
                event.target.lastInputTime = currentTime

                if (timeDifference < 50) {
                    handleSearch(event)
                    event.target.value = ''
                    setSearchQuery('')
                }
            }
        }
    }

    return (
        <div className="d-flex flex-column" style={{ height: '100vh' }}>
            <DeleteModal
                data={{
                    showDeleteModal,
                    setShowDeleteModal,
                    products,
                    setProducts,
                    selectedProduct,
                    setSelectedProduct,
                }}
            />
            <QuantityModal
                data={{
                    showQuantityModal,
                    setShowQuantityModal,
                    products,
                    setProducts,
                    selectedProduct,
                    setSelectedProduct,
                }}
            />
            <CRow className="flex-grow-1 overflow-hidden">
                <CCol className="d-flex flex-column">
                    <CFormInput
                        className="rounded-0 py-3 border-0 border-bottom"
                        type="search"
                        placeholder="Search product by name or barcode"
                        aria-label="Search"
                        value={searchQuery}
                        onChange={handleSearchInput}
                        onKeyDown={(event) => {
                            if (event.key === 'Enter') {
                                handleSearch(event)
                                event.target.value = ''
                                setSearchQuery('')
                            }
                        }}
                    />
                    <div className="flex-grow-1 overflow-auto">
                        <CTable hover responsive>
                            <CTableHead>
                                <CTableRow>
                                    <CTableHeaderCell scope="col">Product</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Price</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Quantity</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Total</CTableHeaderCell>
                                </CTableRow>
                            </CTableHead>
                            {products.length === 0 ? (
                                <div className="text-center">
                                    <h1>No items</h1>
                                </div>
                            ) : (
                                <CTableBody>
                                    {products.map((product, index) => {
                                        const priceWithTax = product.taxes
                                            ? product.sale_price +
                                              (product.sale_price * product.taxes) / 100
                                            : product.sale_price
                                        return (
                                            <CTableRow
                                                key={index}
                                                active={selectedProduct.includes(product.id)}
                                                onClick={() => handleFocusClick(product.id)}
                                            >
                                                <CTableDataCell>{product.name}</CTableDataCell>
                                                <CTableDataCell>
                                                    {priceWithTax.toFixed(2)}
                                                </CTableDataCell>
                                                <CTableDataCell>{product.quantity}</CTableDataCell>
                                                <CTableDataCell>
                                                    {(priceWithTax * product.quantity).toFixed(2)}
                                                </CTableDataCell>
                                            </CTableRow>
                                        )
                                    })}
                                </CTableBody>
                            )}
                        </CTable>
                    </div>
                    <div className="bg-body-secondary p-2 mt-auto">
                        <div className="d-flex justify-content-between">
                            <span>Subtotal:</span>
                            <span>{subTotal}</span>
                        </div>
                        <div className="d-flex justify-content-between">
                            <span>Tax:</span>
                            <span>{totalTaxes}</span>
                        </div>
                        <div className="d-flex justify-content-between">
                            <strong>Total:</strong>
                            <strong>{total}</strong>
                        </div>
                    </div>
                </CCol>
                <CCol lg={5} xl={3} className="d-flex flex-column bg-body-secondary rounded m-2">
                    <div className="flex-grow-1">
                        <div className=" d-flex justify-content-between align-items-center mb-3 mt-2 text-center">
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
                    </div>
                    <div className="bg-body-secondary p-2 mt-auto">
                        <div className="d-flex justify-content-between align-items-center mb-3 text-center">
                            <div
                                className="rounded py-3 m-1 d-flex flex-column align-items-center border border-secondary"
                                onClick={() => alert('Check')}
                                style={{ flex: 1 }}
                            >
                                Lock
                            </div>
                            <div
                                className="rounded py-3 m-1 d-flex flex-column align-items-center border border-secondary"
                                onClick={() => alert('Gift Card')}
                                style={{ flex: 1 }}
                            >
                                Transfer
                            </div>
                            <div
                                className="rounded py-3 m-1 d-flex flex-column align-items-center border border-secondary"
                                onClick={() => alert('Voucher')}
                                style={{ flex: 1 }}
                            >
                                Void
                            </div>
                            <div
                                className="rounded py-3 m-1 d-flex flex-column align-items-center border border-secondary"
                                onClick={() => alert('Voucher')}
                                style={{ flex: 1 }}
                            >
                                Menu
                            </div>
                        </div>
                    </div>
                </CCol>
            </CRow>
        </div>
    )
}

export default PointOfSale
