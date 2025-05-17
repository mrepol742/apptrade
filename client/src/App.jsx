import React, { Suspense, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { CSpinner, useColorModes } from '@coreui/react'
import { Slide, ToastContainer } from 'react-toastify'
import AOS from 'aos'
import './scss/style.scss'

const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

const Login = React.lazy(() => import('./views/auth/Login'))
const Page404 = React.lazy(() => import('./views/errors/Page404'))
const Page500 = React.lazy(() => import('./views/errors/Page500'))

const App = () => {
    AOS.init()
    const { isColorModeSet, setColorMode } = useColorModes('coreui-free-react-admin-template-theme')
    const storedTheme = useSelector((state) => state.theme)

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.href.split('?')[1])
        const theme = urlParams.get('theme') && urlParams.get('theme').match(/^[A-Za-z0-9\s]+/)[0]
        if (theme) setColorMode(theme)
        if (isColorModeSet()) return
        setColorMode(storedTheme)
    }, [])

    return (
        <div>
            <Router>
                <Suspense
                    fallback={
                        <div className="pt-3 text-center">
                            <CSpinner color="primary" variant="grow" />
                        </div>
                    }
                >
                    <Routes>
                        <Route exact path="/login" name="Login Page" element={<Login />} />
                        <Route exact path="/404" name="Page 404" element={<Page404 />} />
                        <Route exact path="/500" name="Page 500" element={<Page500 />} />
                        <Route path="*" name="Home" element={<DefaultLayout />} />
                    </Routes>
                </Suspense>
            </Router>
            <ToastContainer theme={storedTheme} transition={Slide} />
        </div>
    )
}

export default App
