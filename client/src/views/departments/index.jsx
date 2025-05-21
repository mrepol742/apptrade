import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import {
    CButton,
    CRow,
    CTable,
    CTableBody,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow,
    CCol,
} from '@coreui/react'
import NewDepartment from '../new-department'
import AppPagination from '../../components/AppPagination'

const Departments = () => {
    const [departments, setDepartments] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(0)

    useEffect(() => {
        fetchDepartments(currentPage)
    }, [currentPage])

    const fetchDepartments = async (currentPage) => {
        try {
            const response = await axios.get('/departments', {
                params: {
                    page: currentPage,
                },
            })
            setDepartments(response.data.data)
            setTotalPages(response.data.totalPages)
            setCurrentPage(response.data.currentPage)
        } catch (error) {
            console.error('Error fetching Users:', error)
        }
    }

    const exportDepartments = async () => {
        window.open('http://localhost:8000/api/export/departments', '_blank')
    }

    return (
        <div>
            <Helmet>
                <title>Departments - Apptrade</title>
            </Helmet>
            <CRow>
                <CCol>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h1>Departments</h1>
                        <div>
                            <CButton
                                size="sm"
                                className="me-1"
                                color="primary"
                                onClick={() => exportDepartments()}
                            >
                                Export
                            </CButton>
                            <CButton
                                className="d-inline d-xl-none"
                                size="sm"
                                color="primary"
                                onClick={() => navigate('/new-department')}
                            >
                                Add Department
                            </CButton>
                        </div>
                    </div>
                    {departments.length === 0 ? (
                        <div className="d-flex justify-content-center align-items-center">
                            <h3>Loading departments...</h3>
                        </div>
                    ) : (
                        <>
                            <CTable striped bordered hover responsive>
                                <CTableHead>
                                    <CTableRow>
                                        <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                                        <CTableHeaderCell scope="col"></CTableHeaderCell>
                                    </CTableRow>
                                </CTableHead>
                                <CTableBody>
                                    {departments.map((department, index) => (
                                        <CTableRow key={department.id}>
                                            <CTableDataCell>{department.name}</CTableDataCell>
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
                            <AppPagination
                                currentPage={currentPage}
                                setCurrentPage={setCurrentPage}
                                totalPages={totalPages}
                                setTotalPages={setTotalPages}
                            />
                        </>
                    )}
                </CCol>
                <CCol>
                    <NewDepartment />
                </CCol>
            </CRow>
        </div>
    )
}

export default Departments
