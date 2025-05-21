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
    CSpinner,
} from '@coreui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDownLong } from '@fortawesome/free-solid-svg-icons'
import { toast } from 'react-toastify'
import DeleteModal from './modal/delete'
import QuantityModal from './modal/quantity'
import DiscountModal from './modal/discount'
import PaymentModal from './modal/payment'
import Controls from './sidebar/controls'
import Menu from './sidebar/menu'

const PointOfSale = () => {
    const [products, setProducts] = useState([])
    const [selectedProduct, setSelectedProduct] = useState([])
    const [salesLock, setSalesLock] = useState(null)
    const [searchQuery, setSearchQuery] = useState('')
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [showQuantityModal, setShowQuantityModal] = useState(false)
    const [showDiscountModal, setShowDiscountModal] = useState(false)
    const [showNewSaleModal, setShowNewSaleModal] = useState(false)
    const [showPaymentModal, setShowPaymentModal] = useState(false)
    const [paymentMethod, setPaymentMethod] = useState('cash')
    const [showMenu, setShowMenu] = useState(false)
    const [isDirty, setIsDirty] = useState(false)
    const [deleteMode, setDeleteMode] = useState(null)

    const addProduct = (product) => {
        setProducts((prevProducts) => {
            const existingProduct = prevProducts.find((p) => p.id === product.id)
            if (existingProduct) {
                return prevProducts.map((p) =>
                    p.id === product.id ? { ...p, quantity: p.quantity + 1, discount: 0 } : p,
                )
            } else {
                return [...prevProducts, { ...product, quantity: 1, discount: 0 }]
            }
        })
    }

    const subTotal = products
        .filter((product) => product.id !== 'discount' && !product.deleted)
        .reduce((acc, product) => {
            const discountedPrice = product.sale_price * (1 - product.discount / 100)
            return acc + discountedPrice * product.quantity
        }, 0)

    const totalTaxes = products
        .filter((product) => product.id !== 'discount' && !product.deleted)
        .reduce((acc, product) => {
            const discountedPrice = product.sale_price * (1 - product.discount / 100)
            return (
                acc +
                (product.taxes ? (discountedPrice * product.taxes) / 100 : 0) * product.quantity
            )
        }, 0)
        .toFixed(2)

    const discount = products
        .filter((product) => product.id === 'discount')
        .reduce((acc, product) => acc + (product.discount || 0), 0)

    const total = (parseFloat(subTotal) + parseFloat(totalTaxes)) * (1 - parseFloat(discount) / 100)

    const calculateTotal = (itemPrice, itemQuantity, itemDiscount = 0) => {
        const discountedPrice = itemPrice * (1 - itemDiscount / 100)
        return discountedPrice * itemQuantity
    }

    const calculatePrice = (itemPrice, itemDiscount = 0) => {
        const discountedPrice = itemPrice * (1 - itemDiscount / 100)
        return discountedPrice
    }

    const handleKeyDown = (event) => {
        if (event.key === 'F2') {
            event.preventDefault()
            handleDiscount()
        } else if (event.key === 'F4') {
            event.preventDefault()
            handleQuantity()
        } else if (event.key === 'F10') {
            event.preventDefault()
            handlePayment()
        } else if (event.key === 'Delete') {
            event.preventDefault()
            handleDelete()
        }
    }

    const fetchSalesLock = async () => {
        axios
            .get(`/sales-lock`)
            .then((response) => {
                if (response.data.length > 0) {
                    setSalesLock(true)
                    setProducts(JSON.parse(response.data))
                } else {
                    setSalesLock(false)
                }
            })
            .catch((error) => {
                console.error('Error fetching sales lock:', error)
            })
    }

    const handleSalesLock = async () => {
        if (products.length === 0) return toast.error('No products in cart')
        axios
            .post(`/sales-lock`, {
                products: !salesLock ? JSON.stringify(products) : '[]',
                mode: !salesLock,
            })
            .then((response) => {
                toast.success(
                    salesLock ? 'Sales unlocked successfully' : 'Sales locked successfully',
                )
                setSalesLock(!salesLock)
            })
            .catch((error) => {
                console.error('Error fetching sales lock:', error)
            })
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

    useEffect(() => {
        fetchSalesLock()
    }, [])

    const handleSearch = (event) => {
        if (salesLock) return toast.error('Sales locked')
        const query = event.target.value

        const existingProduct = products.find((p) => p.barcode && p.barcode.toLowerCase() === query)
        if (existingProduct) {
            setProducts((prevProducts) =>
                prevProducts.map((p) =>
                    p.barcode && p.barcode.toLowerCase() === query
                        ? { ...p, quantity: p.quantity + 1, discount: 0 }
                        : p,
                ),
            )
            setIsDirty(true)
            return
        }

        axios
            .get(`/products/${query}`)
            .then((response) => {
                if (response.data.length === 0) return toast.error('Product not found')
                const foundProduct = response.data[0]
                setProducts((prevProducts) => {
                    const existingProduct = prevProducts.find((p) => p.id === foundProduct.id)
                    if (existingProduct) {
                        return prevProducts.map((p) =>
                            p.id === foundProduct.id
                                ? { ...p, quantity: p.quantity + 1, discount: 0 }
                                : p,
                        )
                    } else {
                        return [...prevProducts, { ...foundProduct, quantity: 1, discount: 0 }]
                    }
                })
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
        if (salesLock) return toast.error('Sales locked')
        if (selectedProduct.length === 0) return toast.error('Select a product')
        setShowQuantityModal(true)
    }

    const handleDiscount = () => {
        if (salesLock) return toast.error('Sales locked')
        setShowDiscountModal(true)
    }

    const handleDelete = (mode) => {
        if (salesLock) return toast.error('Sales locked')
        if (selectedProduct.length === 0) return toast.error('Select a product')
        setShowDeleteModal(true)
        setDeleteMode(mode)
    }

    const handleNewSale = () => {
        if (products.length === 0) return toast.error('No products in cart')
        setProducts([])
        setSelectedProduct([])
    }

    const handlePayment = () => {
        if (salesLock) return toast.error('Sales locked')
        if (products.length === 0) return toast.error('No products in cart')
        setShowPaymentModal(true)
    }

    const handleSearchInput = (event) => {
        setSearchQuery(event.target.value)

        // if (event.target.value.length > 0) {
        //     const currentTime = new Date().getTime()
        //     if (!event.target.lastInputTime) {
        //         event.target.lastInputTime = currentTime
        //     } else {
        //         const timeDifference = currentTime - event.target.lastInputTime
        //         event.target.lastInputTime = currentTime
        //         console.log(timeDifference + 'ms')
        //         if (timeDifference > 1000) {
        //             handleSearch(event)
        //             event.target.value = ''
        //             setSearchQuery('')
        //         }
        //     }
        // }
    }

    if (salesLock === null)
        return (
            <div className="d-flex justify-content-center align-items-center vh-100">
                <CSpinner color="primary" />
            </div>
        )

    return (
        <div className="d-flex flex-column" style={{ height: '100vh', width: '99.3%' }}>
            <DeleteModal
                data={{
                    showDeleteModal,
                    setShowDeleteModal,
                    products,
                    setProducts,
                    selectedProduct,
                    setSelectedProduct,
                    deleteMode,
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
            <DiscountModal
                data={{
                    showDiscountModal,
                    setShowDiscountModal,
                    products,
                    setProducts,
                    selectedProduct,
                    setSelectedProduct,
                }}
            />
            <PaymentModal
                data={{
                    showPaymentModal,
                    setShowPaymentModal,
                    products,
                    setProducts,
                    selectedProduct,
                    setSelectedProduct,
                    total,
                    paymentMethod,
                    setPaymentMethod,
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
                        autoFocus
                        onFocus={(event) => {
                            event.target.select()
                            event.target.setSelectionRange(0, event.target.value.length)
                        }}
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
                                    <CTableHeaderCell
                                        scope="col"
                                        className="text-uppercase"
                                        style={{ minWidth: 180 }}
                                    >
                                        Product
                                    </CTableHeaderCell>
                                    <CTableHeaderCell
                                        scope="col"
                                        className="text-uppercase text-center"
                                        style={{ width: 80, maxWidth: 100 }}
                                    >
                                        Quantity
                                    </CTableHeaderCell>
                                    <CTableHeaderCell
                                        scope="col"
                                        className="text-uppercase text-end"
                                        style={{ width: 100, maxWidth: 120 }}
                                    >
                                        Price
                                    </CTableHeaderCell>
                                    <CTableHeaderCell
                                        scope="col"
                                        className="text-uppercase text-end"
                                        style={{ width: 110, maxWidth: 130 }}
                                    >
                                        Total
                                    </CTableHeaderCell>
                                </CTableRow>
                            </CTableHead>
                            {products.length === 0 ? (
                                <div className="position-absolute top-50 start-50 translate-middle text-center">
                                    <h3 className="text-muted mb-0">No items in cart</h3>
                                </div>
                            ) : (
                                <CTableBody>
                                    {products.map((product, index) => {
                                        const priceWithTax = product.taxes
                                            ? product.sale_price +
                                              (product.sale_price * product.taxes) / 100
                                            : product.sale_price

                                        if (product.id !== 'discount')
                                            return (
                                                <CTableRow
                                                    key={index}
                                                    active={selectedProduct.includes(product.id)}
                                                    onClick={() => handleFocusClick(product.id)}
                                                >
                                                    <CTableDataCell style={{ minWidth: 180 }}>
                                                        <span
                                                            className={`${product.deleted && 'text-danger'}`}
                                                        >
                                                            {product.name}
                                                        </span>
                                                        <span
                                                            className={`${product.deleted && 'text-danger'} d-block`}
                                                            style={{ fontSize: '0.7em' }}
                                                        >
                                                            {product.barcode}
                                                        </span>
                                                    </CTableDataCell>
                                                    <CTableDataCell
                                                        className={`${product.deleted && 'text-danger'} text-end`}
                                                        style={{ width: 80, maxWidth: 100 }}
                                                    >
                                                        {product.quantity}
                                                    </CTableDataCell>
                                                    <CTableDataCell
                                                        className={`${product.deleted && 'text-danger'} text-end`}
                                                        style={{ width: 100, maxWidth: 120 }}
                                                    >
                                                        {product.discount > 0 && (
                                                            <FontAwesomeIcon
                                                                icon={faDownLong}
                                                                className={`${product.deleted ? 'text-danger' : 'text-success'} me-1`}
                                                                style={{
                                                                    width: '12px',
                                                                    height: '12px',
                                                                }}
                                                            />
                                                        )}
                                                        {calculatePrice(
                                                            priceWithTax,
                                                            product.discount,
                                                        ).toLocaleString('en-PH', {
                                                            minimumFractionDigits: 2,
                                                            maximumFractionDigits: 2,
                                                        })}
                                                    </CTableDataCell>
                                                    <CTableDataCell
                                                        className={`${product.deleted && 'text-danger'} text-end`}
                                                        style={{ width: 110, maxWidth: 130 }}
                                                    >
                                                        {calculateTotal(
                                                            priceWithTax,
                                                            product.quantity,
                                                            product.discount,
                                                        ).toLocaleString('en-PH', {
                                                            minimumFractionDigits: 2,
                                                            maximumFractionDigits: 2,
                                                        })}
                                                    </CTableDataCell>
                                                </CTableRow>
                                            )
                                    })}
                                </CTableBody>
                            )}
                        </CTable>
                    </div>
                    <div className="bg-body-secondary p-3 m-3 rounded mt-auto">
                        <div className="d-flex justify-content-between">
                            <span>Subtotal:</span>
                            <span>
                                {subTotal.toLocaleString('en-PH', {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                })}
                            </span>
                        </div>
                        {discount > 0 && (
                            <div className="d-flex justify-content-between">
                                <span>Discount:</span>
                                <span>{discount}%</span>
                            </div>
                        )}
                        <div className="d-flex justify-content-between  border-bottom border-secondary pb-2">
                            <span>Tax:</span>
                            <span>
                                {totalTaxes.toLocaleString('en-PH', {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                })}
                            </span>
                        </div>
                        <div className="d-flex justify-content-between pt-2">
                            <strong>Total:</strong>
                            <strong>
                                {total.toLocaleString('en-PH', {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                })}
                            </strong>
                        </div>
                    </div>
                </CCol>
                <CCol
                    lg={5}
                    xl={3}
                    className="d-flex flex-column border-start border-2 border-secondary"
                >
                    {!showMenu ? (
                        <Controls
                            data={{
                                handleDelete,
                                handleQuantity,
                                handleNewSale,
                                handleDiscount,
                                handleSalesLock,
                                handlePayment,
                                salesLock,
                                selectedProduct,
                                showMenu,
                                setShowMenu,
                                discount,
                                paymentMethod,
                                setPaymentMethod,
                            }}
                        />
                    ) : (
                        <Menu
                            data={{
                                showMenu,
                                setShowMenu,
                            }}
                        />
                    )}
                </CCol>
            </CRow>
        </div>
    )
}

export default PointOfSale
