import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
    CButton,
    CCard,
    CCardBody,
    CCardGroup,
    CCol,
    CContainer,
    CForm,
    CFormInput,
    CInputGroup,
    CInputGroupText,
    CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'

const Logout = () => {
    useEffect(() => {
        cookies.remove('asasas')
        window.location.href = '/login'
    }, [])

    return <>Loading..</>
}

export default Logout
