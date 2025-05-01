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

const Products = () => {
    const navigate = useNavigate()
    const [products, setProducts] = useState([])

    useEffect(() => {
        fetchProducts()
    }, [])

    const fetchProducts = async () => {
        try {
            const response = await axios.get('/products')
            setProducts(response.data)
        } catch (error) {
            console.error('Error fetching Products:', error)
        }
    }

    if (products.length === 0) {
        return (
            <div className="d-flex justify-content-center align-items-center vh-100">
                <h1>Loading products...</h1>
            </div>
        )
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
                        <CButton
                            className="d-block d-xl-none"
                            size="sm"
                            color="primary"
                            onClick={() => navigate('/new-product')}
                        >
                            Add Product
                        </CButton>
                    </div>
                    <CTable striped bordered hover responsive>
                        <CTableHead>
                            <CTableRow>
                                <CTableHeaderCell scope="col">#</CTableHeaderCell>
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
                            {products.map((user, index) => (
                                <CTableRow key={user.id}>
                                    <CTableDataCell>{index + 1}</CTableDataCell>
                                    <CTableDataCell>{user.name}</CTableDataCell>
                                    <CTableDataCell>{user.code}</CTableDataCell>
                                    <CTableDataCell>{user.barcode}</CTableDataCell>
                                    <CTableDataCell>{user.cost_price}</CTableDataCell>
                                    <CTableDataCell>{user.sale_price}</CTableDataCell>
                                    <CTableDataCell>{user.is_active ? 'Yes' : 'No'}</CTableDataCell>
                                    <CTableDataCell>{user.department.name}</CTableDataCell>
                                    <CTableDataCell>{user.group.name}</CTableDataCell>
                                    <CTableDataCell>
                                        <div className="d-flex">
                                            <CButton
                                                size="sm"
                                                color="primary"
                                                onClick={() => alert(`Edit ${user.name}`)}
                                            >
                                                Edit
                                            </CButton>
                                            <CButton
                                                size="sm"
                                                color="danger"
                                                onClick={() => alert(`Delete ${user.name}`)}
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
                </CCol>
                <CCol className="d-none d-xl-block">
                    <NewProduct />
                </CCol>
            </CRow>
        </div>
    )
}

export default Products
