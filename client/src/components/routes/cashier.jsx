import React from 'react'
import CIcon from '@coreui/icons-react'
import { cilSpeedometer } from '@coreui/icons'
import { CNavItem } from '@coreui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGauge } from '@fortawesome/free-solid-svg-icons'

const _nav = [
    {
        component: CNavItem,
        name: 'Management',
        to: '/management',
        icon: <FontAwesomeIcon icon={faGauge} className="me-2" />,
    },
    {
        component: CNavItem,
        name: 'Sales history',
        to: '/sales-history',
        icon: <FontAwesomeIcon icon={faGauge} className="me-2" />,
    },
    {
        component: CNavItem,
        name: 'Open Sales',
        to: '/open-sales',
        icon: <FontAwesomeIcon icon={faGauge} className="me-2" />,
    },
    {
        component: CNavItem,
        name: 'Cash in/out',
        to: '/cash-in-out',
        icon: <FontAwesomeIcon icon={faGauge} className="me-2" />,
    },
    {
        component: CNavItem,
        name: 'Credit Payments',
        to: '/credit-payments',
        icon: <FontAwesomeIcon icon={faGauge} className="me-2" />,
    },
    {
        component: CNavItem,
        name: 'End of Day',
        to: '/end-of-day',
        icon: <FontAwesomeIcon icon={faGauge} className="me-2" />,
    },
    {
        component: CNavItem,
        name: 'User info',
        to: '/user-info',
        icon: <FontAwesomeIcon icon={faGauge} className="me-2" />,
    },
]

export default _nav
