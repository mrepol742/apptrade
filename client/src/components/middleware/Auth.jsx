import React, { useEffect, useState } from 'react'
import { CSpinner } from '@coreui/react'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import AdminLayout from '../../layout/user/admin'
import CashierLayout from '../../layout/user/cashier'

const Auth = () => {
    const [status, setStatus] = useState('loading')
    const dispatch = useDispatch()
    const user = useSelector((state) => state.user)
    const navigate = useNavigate()
    const session_id = cookies.get('session_id')

    const verify = () => {
        const checkAuthStatus = async () => {
            try {
                const response = await axios.post('/auth/verify-session', { session_id })
                dispatch({ type: 'SET_USER', payload: response.data.user })
                setStatus('authenticated')
            } catch (error) {
                cookies.remove('session_id')
                navigate('/login')
            }
        }

        if (user || session_id) return checkAuthStatus()
        navigate('/login')
    }

    useEffect(() => {
        verify()
    }, [navigate, dispatch])

    if (status === 'loading') {
        return (
            <div
                className="d-flex justify-content-center align-items-center"
                style={{ height: '100vh' }}
            >
                <div className="spinner-border" color="primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        )
    }

    if (['super_admin', 'admin'].includes(user.role)) return <AdminLayout />

    return <CashierLayout />
}

export default Auth
