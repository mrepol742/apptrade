import React, { use, useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import {
    CButton,
    CTable,
    CTableBody,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow,
} from '@coreui/react'
import AppPagination from '../../components/AppPagination'

const Sales = () => {
    const [sales, setSales] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(0)

    useEffect(() => {
        fetchSales(currentPage)
    }, [currentPage])

    const fetchSales = async (currentPage) => {
        try {
            const response = await axios.get('/sales', {
                params: {
                    page: currentPage,
                },
            })
            if (response.data.error) return toast.error(response.data.error)
            setSales(response.data.data)
            setTotalPages(response.data.totalPages)
            setCurrentPage(response.data.currentPage)
        } catch (error) {
            console.error('Error fetching Products:', error)
        }
    }

    return (
        <div>
            <Helmet>
                <title>Sales - Apptrade</title>
            </Helmet>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h1>Sales</h1>
                <div></div>
            </div>
            {sales.length === 0 ? (
                <div className="d-flex justify-content-center align-items-center">
                    <h3>Loading sales...</h3>
                </div>
            ) : (
                <>
                    <CTable striped bordered hover responsive>
                        <CTableHead>
                            <CTableRow>
                                <CTableHeaderCell scope="col">OR #</CTableHeaderCell>
                                <CTableHeaderCell scope="col">Cashier</CTableHeaderCell>
                                <CTableHeaderCell scope="col">Amount</CTableHeaderCell>
                                <CTableHeaderCell scope="col">Discount</CTableHeaderCell>
                                <CTableHeaderCell scope="col">Tax</CTableHeaderCell>
                                <CTableHeaderCell scope="col">Payment</CTableHeaderCell>
                                <CTableHeaderCell scope="col">Reference Number</CTableHeaderCell>
                            </CTableRow>
                        </CTableHead>
                        <CTableBody>
                            {sales.map((sale, index) => (
                                <CTableRow key={sale.id}>
                                    <CTableDataCell>{sale.id}</CTableDataCell>
                                    <CTableDataCell>{sale.cashier.name}</CTableDataCell>
                                    <CTableDataCell>{sale.total}</CTableDataCell>
                                    <CTableDataCell>{sale.total_discount}</CTableDataCell>
                                    <CTableDataCell>{sale.total_taxes}</CTableDataCell>
                                    <CTableDataCell>{sale.mode_of_payment}</CTableDataCell>
                                    <CTableDataCell>{sale.reference_number}</CTableDataCell>
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
        </div>
    )
}

export default Sales
