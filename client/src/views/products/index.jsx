import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import {
    CButton,
    CTable,
    CTableBody,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow,
    CRow,
    CCol,
} from '@coreui/react'
import { useNavigate } from 'react-router-dom'
import NewProduct from '../new-product/index'
import AppPagination from '../../components/AppPagination'

const Products = () => {
    const navigate = useNavigate()
    const [products, setProducts] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(0)

    useEffect(() => {
        fetchProducts(currentPage)
    }, [currentPage])

    const fetchProducts = async (currentPage) => {
        try {
            const response = await axios.get('/products', {
                params: {
                    page: currentPage,
                },
            })
            setProducts(response.data.data)
            setTotalPages(response.data.totalPages)
            setCurrentPage(response.data.currentPage)
        } catch (error) {
            console.error('Error fetching Products:', error)
        }
    }

    const exportProducts = async () => {
        window.open('http://localhost:8000/api/export/products', '_blank')
    }

    return (
        <div>
            <Helmet>
                <title>Products - Apptrade</title>
            </Helmet>
            <CRow>
                <CCol>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h1>Products</h1>
                        <div>
                            <CButton
                                size="sm"
                                className="me-1"
                                color="primary"
                                onClick={() => alert('Import Products')}
                            >
                                Import
                            </CButton>
                            <CButton
                                size="sm"
                                className="me-1"
                                color="primary"
                                onClick={() => exportProducts()}
                            >
                                Export
                            </CButton>
                            <CButton
                                className="d-inline d-xl-none"
                                size="sm"
                                color="primary"
                                onClick={() => navigate('/new-product')}
                            >
                                Add
                            </CButton>
                        </div>
                    </div>
                    {products.length === 0 ? (
                        <div className="d-flex justify-content-center align-items-center">
                            <h3>Loading products...</h3>
                        </div>
                    ) : (
                        <>
                            <CTable striped bordered hover responsive>
                                <CTableHead>
                                    <CTableRow>
                                        <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">Code</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">Barcode</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">Cost Price</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">Sale Price</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">Stock</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">Department</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">Group</CTableHeaderCell>
                                        <CTableHeaderCell scope="col"></CTableHeaderCell>
                                    </CTableRow>
                                </CTableHead>
                                <CTableBody>
                                    {products.map((product, index) => (
                                        <CTableRow key={product.id}>
                                            <CTableDataCell>{product.name}</CTableDataCell>
                                            <CTableDataCell>{product.code}</CTableDataCell>
                                            <CTableDataCell>{product.barcode}</CTableDataCell>
                                            <CTableDataCell>{product.cost_price}</CTableDataCell>
                                            <CTableDataCell>{product.sale_price}</CTableDataCell>
                                            <CTableDataCell>
                                                {product.is_active ? 'Yes' : 'No'}
                                            </CTableDataCell>
                                            <CTableDataCell>
                                                {product.department.name}
                                            </CTableDataCell>
                                            <CTableDataCell>{product.group.name}</CTableDataCell>
                                            <CTableDataCell>
                                                <div className="d-flex">
                                                    <CButton
                                                        size="sm"
                                                        color="primary"
                                                        onClick={() =>
                                                            alert(`Edit ${product.name}`)
                                                        }
                                                    >
                                                        Edit
                                                    </CButton>
                                                    <CButton
                                                        size="sm"
                                                        color="danger"
                                                        onClick={() =>
                                                            alert(`Delete ${product.name}`)
                                                        }
                                                        className="ms-2"
                                                    >
                                                        Delete
                                                    </CButton>
                                                </div>
                                            </CTableDataCell>
                                        </CTableRow>
                                    ))}
                                </CTableBody>
                            </CTable>
                            <AppPagination
                                currentPage={currentPage}
                                setCurrentPage={setCurrentPage}
                                totalPages={totalPages}
                                setTotalPages={setTotalPages}
                            />
                        </>
                    )}
                </CCol>
                <CCol className="d-none d-xl-block">
                    <NewProduct />
                </CCol>
            </CRow>
        </div>
    )
}

export default Products
