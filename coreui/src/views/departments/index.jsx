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

const Departments = () => {
    const [departments, setDepartments] = useState([])

    useEffect(() => {
        fetchDepartments()
    }, [])

    const fetchDepartments = async () => {
        try {
            const response = await axios.get('/departments')
            setDepartments(response.data)
        } catch (error) {
            console.error('Error fetching Users:', error)
        }
    }

    if (departments.length === 0) {
        return (
            <div className="d-flex justify-content-center align-items-center vh-100">
                <h1>Loading departments...</h1>
            </div>
        )
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
                        <CButton
                           className="d-block d-xl-none"
                           size="sm"
                           color="primary"
                           onClick={() => navigate('/new-department')}
                        >
                            Add Department
                        </CButton>
                    </div>
                    <CTable striped bordered hover responsive>
                        <CTableHead>
                            <CTableRow>
                                <CTableHeaderCell scope="col">#</CTableHeaderCell>
                                <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                                <CTableHeaderCell scope="col"></CTableHeaderCell>
                            </CTableRow>
                        </CTableHead>
                        <CTableBody>
                            {departments.map((department, index) => (
                                <CTableRow key={department.id}>
                                    <CTableDataCell>{index + 1}</CTableDataCell>
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
                </CCol>
                <CCol>
                    <NewDepartment />
                </CCol>
            </CRow>
        </div>
    )
}

export default Departments
