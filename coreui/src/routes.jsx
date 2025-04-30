import React, { lazy } from 'react'

const Dashboard = lazy(() => import('./views/dashboard'))
const NewProduct = lazy(() => import('./views/new-product'))
const NewDepartment = lazy(() => import('./views/new-department'))
const NewUser = lazy(() => import('./views/new-user'))
const Reports = lazy(() => import('./views/reports'))

const Departments = lazy(() => import('./views/departments'))
const Products = lazy(() => import('./views/products'))
const Users = lazy(() => import('./views/users'))

const Logout = lazy(() => import('./views/auth/Logout'))

const routes = [
    { path: '/', exact: true, name: 'Home' },
    { path: '/dashboard', name: 'Dashboard', element: Dashboard },
    { path: '/reports', name: 'Reports', element: Reports },

    { path: '/departments', name: 'Departments', element: Departments },
    { path: '/products', name: 'Products', element: Products },
    { path: '/users', name: 'Users', element: Users },

    { path: '/new-product', name: 'New Product', element: NewProduct },
    { path: '/new-department', name: 'New Department', element: NewDepartment },
    { path: '/new-user', name: 'New User', element: NewUser },

    { path: '/logout', name: 'Logout', element: Logout },
]

export default routes
