import React, { useEffect } from 'react'
import { CNavbarNav, CNavItem, CNavLink } from '@coreui/react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAdd, faChevronLeft } from '@fortawesome/free-solid-svg-icons'

const Menu = ({ data }) => {
    const { showMenu, setShowMenu } = data
    const route = [
        {
            name: 'Management',
            path: '/management',
            icon: faAdd,
        },
        {
            name: 'Sales History',
            path: '/sales-history',
            icon: faAdd,
        },
        {
            name: 'Open Sales',
            path: '/open-sales',
            icon: faAdd,
        },
        {
            name: 'Cash In/Out',
            path: '/cash-in-out',
            icon: faAdd,
        },
        {
            name: 'Credit Payments',
            path: '/credit-payments',
            icon: faAdd,
        },
        {
            name: 'End of Day',
            path: '/end-of-day',
            icon: faAdd,
        },
        {
            name: 'User Info',
            path: '/user-info',
            icon: faAdd,
        },
    ]

    useEffect(() => {
        const handleKeyDown = (event) => {
            console.log(event.key)
            if (event.key === 'Escape') {
                setShowMenu(false)
            }
        }

        window.addEventListener('keydown', handleKeyDown)

        return () => {
            window.removeEventListener('keydown', handleKeyDown)
        }
    }, [])

    return (
        <div className="m-2" data-aos="fade-in">
            <div
                className="d-flex justify-content-between align-items-center"
                style={{ cursor: 'pointer' }}
                onClick={() => setShowMenu(false)}
            >
                <div className="text-center py-3" onClick={() => setShowMenu(false)}>
                    <FontAwesomeIcon icon={faChevronLeft} className="my-auto me-3" />
                    <span className="text-uppercase">Menu</span>
                </div>
            </div>
            <CNavbarNav>
                {route.map((item, index) => (
                    <CNavItem key={index}>
                        <CNavLink>
                            <span
                                className="border p-3 rounded"
                                style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
                            >
                                <FontAwesomeIcon icon={item.icon} className="my-auto" />
                                <span>{item.name}</span>
                            </span>
                        </CNavLink>
                    </CNavItem>
                ))}
            </CNavbarNav>
        </div>
    )
}

export default Menu

Menu.propTypes = {
    data: PropTypes.shape({
        showMenu: PropTypes.bool.isRequired,
        setShowMenu: PropTypes.func.isRequired,
    }).isRequired,
}
