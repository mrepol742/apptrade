import React, { lazy } from 'react'

const Dashboard = lazy(() => import('./views/dashboard'))
const NewProduct = lazy(() => import('./views/new-product'))
const NewDepartment = lazy(() => import('./views/new-department'))
const NewUser = lazy(() => import('./views/new-user'))

const Departments = lazy(() => import('./views/departments'))
const Products = lazy(() => import('./views/products'))
const Users = lazy(() => import('./views/users'))

const Sales = lazy(() => import('./views/sales'))

const Logout = lazy(() => import('./views/auth/Logout'))

const routes = [
    { path: '/', exact: true, name: 'Home' },
    { path: '/dashboard', name: 'Dashboard', element: Dashboard },

    { path: '/departments', name: 'Departments', element: Departments },
    { path: '/products', name: 'Products', element: Products },
    { path: '/users', name: 'Users', element: Users },
    { path: '/sales', name: 'Sales', element: Sales },

    { path: '/new-product', name: 'New Product', element: NewProduct },
    { path: '/new-department', name: 'New Department', element: NewDepartment },
    { path: '/new-user', name: 'New User', element: NewUser },

    { path: '/logout', name: 'Logout', element: Logout },
]

export default routes
