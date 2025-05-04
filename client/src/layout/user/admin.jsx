import React from 'react'
import { AppContent, AppSidebar, AppHeader } from '../../components/index'

const AdminLayout = () => {
    return (
        <div>
            <AppSidebar />
            <div className="wrapper d-flex flex-column min-vh-100">
                <AppHeader />
                <div className="body flex-grow-1">
                    <AppContent />
                </div>
            </div>
        </div>
    )
}

export default AdminLayout
