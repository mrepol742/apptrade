import React, { useState } from 'react'
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
import { toast } from 'react-toastify'

const Login = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    })
    const [loading, setLoading] = useState(false)

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }))
    }

    const handleLogin = async (e) => {
        e.preventDefault()
        axios
            .post('/auth/login', formData)
            .then((response) => {
                if (response.data.error) return toast.error(response.data.error)
                toast.success('Login successful')
                cookies.set('session_id', response.data.session_token, {
                    expires: 1,
                })
                window.location.href = '/'
            })
            .catch((error) => toast.error('Invalid username or password'))
    }

    return (
        <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
            <div className="auth-bg" />
            <CContainer>
                <CRow className="justify-content-center">
                    <CCol md={8} lg={6} xl={4}>
                        <CCard className="p-4">
                            <CCardBody>
                                <CForm onSubmit={handleLogin}>
                                    <h1>Apptrade</h1>
                                    <p className="text-body-secondary">Sign In to your account</p>
                                    <CInputGroup className="mb-3">
                                        <CInputGroupText>
                                            <CIcon icon={cilUser} />
                                        </CInputGroupText>
                                        <CFormInput
                                            onChange={handleChange}
                                            value={formData.username}
                                            type="text"
                                            name="username"
                                            placeholder="Username"
                                            autoComplete="username"
                                        />
                                    </CInputGroup>
                                    <CInputGroup className="mb-4">
                                        <CInputGroupText>
                                            <CIcon icon={cilLockLocked} />
                                        </CInputGroupText>
                                        <CFormInput
                                            onChange={handleChange}
                                            value={formData.password}
                                            name="password"
                                            type="password"
                                            placeholder="Password"
                                            autoComplete="current-password"
                                        />
                                    </CInputGroup>
                                    <CRow>
                                        <CCol xs={6}>
                                            <CButton color="primary" className="px-4" type="submit">
                                                Login
                                            </CButton>
                                        </CCol>
                                        {/* <CCol xs={6} className="text-right">
                      <CButton color="link" className="px-0">
                        Forgot password?
                      </CButton>
                    </CCol> */}
                                    </CRow>
                                </CForm>
                            </CCardBody>
                        </CCard>
                    </CCol>
                </CRow>
            </CContainer>
        </div>
    )
}

export default Login
