import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
    CCloseButton,
    CSidebar,
    CSidebarBrand,
    CSidebarFooter,
    CSidebarHeader,
    CSidebarToggler,
    CImage,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { useNavigate } from 'react-router-dom'
import { AppSidebarNav } from './AppSidebarNav'

import { logo } from 'src/assets/brand/logo'
import { sygnet } from 'src/assets/brand/sygnet'

// sidebar nav config
import AdminSidebar from './routes/admin'
import CashierSidebar from './routes/cashier'

const AppSidebar = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const unfoldable = useSelector((state) => state.sidebarUnfoldable)
    const sidebarShow = useSelector((state) => state.sidebarShow)
    const user = useSelector((state) => state.user)

    const getSidebar = () => {
        if (user.role === 'super_admin' || user.role === 'admin') {
            return AdminSidebar
        } else if (user.role === 'cashier') {
            return CashierSidebar
        }
    }

    return (
        <CSidebar
            className="border-end"
            position="fixed"
            unfoldable={unfoldable}
            visible={sidebarShow}
            onVisibleChange={(visible) => {
                dispatch({ type: 'set', sidebarShow: visible })
            }}
        >
            <CSidebarHeader className="border-bottom">
                <CSidebarBrand to="/">
                    <CImage
                        src="/images/careers_at_apptrade_cover.jpg"
                        className="sidebar-brand-full rounded"
                        alt="AppTrade Logo"
                        width={220}
                        height={80}
                    />
                    <CImage
                        src="/favicon.png"
                        className="sidebar-brand-narrow"
                        alt="AppTrade Favicon"
                        width={50}
                        height={30}
                    />
                </CSidebarBrand>
                <CCloseButton
                    className="d-lg-none"
                    dark
                    onClick={() => dispatch({ type: 'set', sidebarShow: false })}
                />
            </CSidebarHeader>
            <AppSidebarNav items={getSidebar()} />
            <CSidebarFooter className="border-top d-none d-lg-flex">
                <span onClick={(e) => navigate('/logout')}>Logout</span>
                <CSidebarToggler
                    onClick={() =>
                        dispatch({
                            type: 'set',
                            sidebarUnfoldable: !unfoldable,
                        })
                    }
                />
            </CSidebarFooter>
        </CSidebar>
    )
}

export default React.memo(AppSidebar)
