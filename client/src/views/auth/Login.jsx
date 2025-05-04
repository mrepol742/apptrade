import React from 'react'
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

const Login = () => {
    const [formData, setFormData] = React.useState({
        username: '',
        password: '',
    })
    const [error, setError] = React.useState(null)
    const [loading, setLoading] = React.useState(false)

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }))
    }

    const handleLogin = async (e) => {
        e.preventDefault()
        const response = await axios.post('/auth/login', formData)
        if (response.status === 200) {
            alert('Login successful')
            cookies.set('session_id', response.data.session_token, {
                expires: 1,
            })
            window.location.href = '/'
        } else {
            alert('Login failed')
        }
    }

    return (
        <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
            <CContainer>
                <CRow className="justify-content-center">
                    <CCol md={8} lg={6} xl={4}>
                        <CCard className="p-4">
                            <CCardBody>
                                <CForm onSubmit={handleLogin}>
                                    <h1>Apptrade MC</h1>
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
