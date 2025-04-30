import React from 'react'
import { AppContent, AppSidebar, AppHeader } from '../components/index'
import Auth from '../components/middleware/Auth'

const DefaultLayout = () => {
    return (
        <Auth>
            <AppSidebar />
            <div className="wrapper d-flex flex-column min-vh-100">
                <AppHeader />
                <div className="body flex-grow-1">
                    <AppContent />
                </div>
            </div>
        </Auth>
    )
}

export default DefaultLayout
