import React from 'react'
import CIcon from '@coreui/icons-react'
import { cilSpeedometer } from '@coreui/icons'
import { CNavItem } from '@coreui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGauge } from '@fortawesome/free-solid-svg-icons'

const _nav = [
    {
        component: CNavItem,
        name: 'Dashboard',
        to: '/dashboard',
        icon: <FontAwesomeIcon icon={faGauge} className="me-2" />,
    },
    {
        component: CNavItem,
        name: 'Users',
        to: '/users',
        icon: <FontAwesomeIcon icon={faGauge} className="me-2" />,
    },
    {
        component: CNavItem,
        name: 'Departments',
        to: '/departments',
        icon: <FontAwesomeIcon icon={faGauge} className="me-2" />,
    },
    {
        component: CNavItem,
        name: 'Products',
        to: '/products',
        icon: <FontAwesomeIcon icon={faGauge} className="me-2" />,
    },
    {
        component: CNavItem,
        name: 'Sales',
        to: '/sales',
        icon: <FontAwesomeIcon icon={faGauge} className="me-2" />,
    },
]

export default _nav
