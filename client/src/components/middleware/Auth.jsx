import React, { useEffect, useState } from 'react'
import { CSpinner } from '@coreui/react'

const Auth = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    useEffect(() => {
        const token = cookies.get('asasas')
        if (token) return setIsAuthenticated(true)
        window.location.href = '/login'
    }, [])

    if (!isAuthenticated)
        return (
            <div className="pt-3 text-center">
                <CSpinner color="primary" variant="grow" />
            </div>
        )

    return <>{children}</>
}

export default Auth
