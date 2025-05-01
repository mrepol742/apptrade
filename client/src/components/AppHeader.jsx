import React, { useEffect, useRef } from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
    CContainer,
    CDropdown,
    CDropdownItem,
    CDropdownMenu,
    CDropdownToggle,
    CHeader,
    CHeaderNav,
    CHeaderToggler,
    CNavLink,
    CNavItem,
    useColorModes,
    CFormInput,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
    cilBell,
    cilContrast,
    cilEnvelopeOpen,
    cilList,
    cilMenu,
    cilMoon,
    cilSun,
} from '@coreui/icons'

import AppBreadcrumb from './AppBreadcrumb'

const AppHeader = () => {
    const headerRef = useRef()
    const { colorMode, setColorMode } = useColorModes('coreui-free-react-admin-template-theme')

    const dispatch = useDispatch()
    const sidebarShow = useSelector((state) => state.sidebarShow)

    useEffect(() => {
        document.addEventListener('scroll', () => {
            headerRef.current &&
                headerRef.current.classList.toggle(
                    'shadow-sm',
                    document.documentElement.scrollTop > 0,
                )
        })
    }, [])

    return (
        <CHeader position="sticky" className="mb-4 p-0" ref={headerRef}>
            <CContainer className="border-bottom px-4" fluid>
                <CHeaderToggler
                    onClick={() => dispatch({ type: 'set', sidebarShow: !sidebarShow })}
                    style={{ marginInlineStart: '-14px' }}
                >
                    <CIcon icon={cilMenu} size="lg" />
                </CHeaderToggler>
                <CHeaderNav className="ms-auto">
                    <CNavItem>
                        <CNavLink href="#">
                            <CIcon icon={cilBell} size="lg" />
                        </CNavLink>
                    </CNavItem>
                </CHeaderNav>
                <CHeaderNav>
                    <CDropdown variant="nav-item" placement="bottom-end">
                        <CDropdownToggle caret={false}>
                            {colorMode === 'dark' ? (
                                <CIcon icon={cilMoon} size="lg" />
                            ) : colorMode === 'auto' ? (
                                <CIcon icon={cilContrast} size="lg" />
                            ) : (
                                <CIcon icon={cilSun} size="lg" />
                            )}
                        </CDropdownToggle>
                        <CDropdownMenu>
                            <CDropdownItem
                                active={colorMode === 'light'}
                                className="d-flex align-items-center"
                                as="button"
                                type="button"
                                onClick={() => setColorMode('light')}
                            >
                                <CIcon className="me-2" icon={cilSun} size="lg" /> Light
                            </CDropdownItem>
                            <CDropdownItem
                                active={colorMode === 'dark'}
                                className="d-flex align-items-center"
                                as="button"
                                type="button"
                                onClick={() => setColorMode('dark')}
                            >
                                <CIcon className="me-2" icon={cilMoon} size="lg" /> Dark
                            </CDropdownItem>
                            <CDropdownItem
                                active={colorMode === 'auto'}
                                className="d-flex align-items-center"
                                as="button"
                                type="button"
                                onClick={() => setColorMode('auto')}
                            >
                                <CIcon className="me-2" icon={cilContrast} size="lg" /> Auto
                            </CDropdownItem>
                        </CDropdownMenu>
                    </CDropdown>
                    <CNavItem className="d-block d-md-none">
                        <CNavLink href="#">
                            <CIcon icon={cilBell} size="lg" />
                        </CNavLink>
                    </CNavItem>
                    <CFormInput
                        className="mx-2 d-none d-md-block"
                        type="search"
                        placeholder="Search"
                        aria-label="Search"
                        size="sm"
                        style={{ width: '300px' }}
                    />
                </CHeaderNav>
            </CContainer>
            <CContainer className="px-4" fluid>
                <AppBreadcrumb />
            </CContainer>
        </CHeader>
    )
}

export default AppHeader
