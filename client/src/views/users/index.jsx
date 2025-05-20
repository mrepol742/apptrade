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
import NewUser from '../new-user'

const Users = () => {
    const [users, setUsers] = useState([])

    useEffect(() => {
        fetchUsers()
    }, [])

    const fetchUsers = async () => {
        try {
            const response = await axios.get('/users')
            setUsers(response.data)
        } catch (error) {
            console.error('Error fetching Users:', error)
        }
    }

    const exportUsers = async () => {
        window.open('http://localhost:8000/api/export/users', '_blank')
    }

    return (
        <div>
            <Helmet>
                <title>Users - Apptrade</title>
            </Helmet>
            <CRow>
                <CCol>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h1>Users</h1>
                        <div>
                            <CButton
                                size="sm"
                                className="me-1"
                                color="primary"
                                onClick={() => exportUsers()}
                            >
                                Export
                            </CButton>
                            <CButton
                                className="d-inline d-xl-none"
                                size="sm"
                                color="primary"
                                onClick={() => navigate('/new-user')}
                            >
                                Add
                            </CButton>
                        </div>
                    </div>
                    {users.length === 0 ? (
                        <div className="d-flex justify-content-center align-items-center">
                            <h3>Loading users...</h3>
                        </div>
                    ) : (
                        <>
                            <CTable striped bordered hover responsive>
                                <CTableHead>
                                    <CTableRow>
                                        <CTableHeaderCell scope="col">Department</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">Username</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">Role</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">Email</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">Phone</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">Status</CTableHeaderCell>
                                        <CTableHeaderCell scope="col"></CTableHeaderCell>
                                    </CTableRow>
                                </CTableHead>
                                <CTableBody>
                                    {users.map((user, index) => (
                                        <CTableRow key={user.id}>
                                            <CTableDataCell>{user.department.name}</CTableDataCell>
                                            <CTableDataCell>{user.name}</CTableDataCell>
                                            <CTableDataCell>{user.username}</CTableDataCell>
                                            <CTableDataCell>{user.role}</CTableDataCell>
                                            <CTableDataCell>{user.email}</CTableDataCell>
                                            <CTableDataCell>{user.phone}</CTableDataCell>
                                            <CTableDataCell>{user.status}</CTableDataCell>
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
                        </>
                    )}
                </CCol>
                <CCol className="d-none d-xl-block">
                    <NewUser />
                </CCol>
            </CRow>
        </div>
    )
}

export default Users
