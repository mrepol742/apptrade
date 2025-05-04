import React from 'react'
import Auth from '../components/middleware/Auth'
import AdminLayout from './user/admin'
import CashierLayout from './user/cashier'

const DefaultLayout = () => {
    return <Auth />
}

export default DefaultLayout
