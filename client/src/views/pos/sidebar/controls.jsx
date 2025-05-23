import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    CDropdown,
    CDropdownItem,
    CDropdownMenu,
    CDropdownToggle,
    useColorModes,
} from '@coreui/react'
import { faAdd, faCartPlus, faClose, faExpand, faMinimize } from '@fortawesome/free-solid-svg-icons'
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
import PropTypes from 'prop-types'

const Controls = ({ data }) => {
    const {
        handleDelete,
        handleQuantity,
        handleNewSale,
        handleDiscount,
        handleSalesLock,
        handlePayment,
        salesLock,
        selectedProduct,
        showMenu,
        setShowMenu,
        discount,
        paymentMethod,
        setPaymentMethod,
    } = data
    const [isFullScreen, setIsFullScreen] = useState(false)
    const [currentTime, setCurrentTime] = useState(new Date())
    const { colorMode, setColorMode } = useColorModes('coreui-free-react-admin-template-theme')

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date())
        }, 1000)
        return () => clearInterval(timer)
    }, [])

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'F11') {
                event.preventDefault()
                handleFullScreen()
            }
        }
        window.addEventListener('keydown', handleKeyDown)
        return () => {
            window.removeEventListener('keydown', handleKeyDown)
        }
    }, [isFullScreen])

    const handleFullScreen = () => {
        if (!isFullScreen) {
            if (document.documentElement.requestFullscreen)
                document.documentElement.requestFullscreen()
            setIsFullScreen(true)
            return
        }
        if (document.exitFullscreen) document.exitFullscreen()
        setIsFullScreen(false)
    }

    return (
        <>
            <div className="flex-grow-1 text-uppercase" data-aos="fade-in">
                <div className="d-flex justify-content-between align-items-center mt-2 p-2 text-center">
                    {currentTime.toLocaleString('en-US', {
                        month: 'long',
                        day: '2-digit',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit',
                        hour12: true,
                    })}
                    <div>
                        <CDropdown>
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
                        <FontAwesomeIcon
                            className="ms-2"
                            icon={isFullScreen ? faMinimize : faExpand}
                            onClick={handleFullScreen}
                            style={{ cursor: 'pointer' }}
                            title={isFullScreen ? 'Exit Full Screen' : 'Full Screen'}
                        />
                    </div>
                </div>
                <div className=" d-flex justify-content-between align-items-center text-center">
                    <div
                        className={`rounded py-5 m-1 d-flex flex-column align-items-center border border-2 ${selectedProduct.length > 0 ? 'bg-danger border-danger' : 'border-secondary'}`}
                        onClick={(e) => handleDelete('del')}
                        style={{ flex: 1 }}
                    >
                        <FontAwesomeIcon
                            icon={faClose}
                            className="mb-2"
                            style={{ width: '30px', height: '50px' }}
                        />
                        Cancel
                    </div>
                    <div
                        className="rounded py-5 m-1 d-flex flex-column align-items-center border border-2 border-secondary"
                        onClick={handleQuantity}
                        style={{ flex: 1 }}
                    >
                        <FontAwesomeIcon
                            icon={faCartPlus}
                            className="mb-2"
                            style={{ width: '30px', height: '50px' }}
                        />
                        Quantity
                    </div>
                    <div
                        className="rounded py-5 m-1 d-flex flex-column align-items-center border border-2 border-secondary"
                        onClick={handleNewSale}
                        style={{ flex: 1 }}
                    >
                        <FontAwesomeIcon
                            icon={faAdd}
                            className="mb-2"
                            style={{ width: '30px', height: '50px' }}
                        />
                        New Sale
                    </div>
                </div>
                <small className="ms-1">Payments</small>
                <div className="d-flex justify-content-between align-items-center text-center">
                    <div
                        className={`rounded py-3 m-1 d-flex flex-column align-items-center border border-2 ${paymentMethod === 'cash' ? 'bg-primary border-primary' : 'border-secondary'}`}
                        onClick={() => setPaymentMethod('cash')}
                        style={{ flex: 1 }}
                    >
                        Cash
                    </div>
                    <div
                        className={`rounded py-3 m-1 d-flex flex-column align-items-center border border-2 ${paymentMethod === 'credit' ? 'bg-primary border-primary' : 'border-secondary'}`}
                        onClick={() => setPaymentMethod('credit')}
                        style={{ flex: 1 }}
                    >
                        Credit Card
                    </div>
                    <div
                        className={`rounded py-3 m-1 d-flex flex-column align-items-center border border-2 ${paymentMethod === 'debit' ? 'bg-primary border-primary' : 'border-secondary'}`}
                        onClick={() => setPaymentMethod('debit')}
                        style={{ flex: 1 }}
                    >
                        Debit Card
                    </div>
                </div>
                <div className="d-flex justify-content-between align-items-center mb-3 text-center">
                    <div
                        className={`rounded py-3 m-1 d-flex flex-column align-items-center border border-2 ${paymentMethod === 'check' ? 'bg-primary border-primary' : 'border-secondary'}`}
                        onClick={() => setPaymentMethod('check')}
                        style={{ flex: 1 }}
                    >
                        Check
                    </div>
                    <div
                        className="rounded py-3 m-1 d-flex flex-column align-items-center border border-2 border-secondary"
                        onClick={() => alert('Gift Card')}
                        style={{ flex: 1 }}
                    >
                        Gift Card
                    </div>
                    <div
                        className="rounded py-3 m-1 d-flex flex-column align-items-center border border-2 border-secondary"
                        onClick={() => alert('Voucher')}
                        style={{ flex: 1 }}
                    >
                        Voucher
                    </div>
                </div>
            </div>
            <div className="mt-auto text-uppercase" data-aos="fade-in">
                <div className="d-flex justify-content-between align-items-center text-center">
                    <div
                        className={`rounded py-3 m-1 d-flex flex-column align-items-center border border-2 ${discount > 0 ? 'bg-primary border-primary' : 'border-secondary'}`}
                        onClick={handleDiscount}
                        style={{ flex: 1 }}
                    >
                        Discount
                    </div>
                    <div
                        className="rounded py-3 m-1 d-flex flex-column align-items-center border border-2 border-secondary"
                        onClick={() => alert('Gift Card')}
                        style={{ flex: 1 }}
                    >
                        Refund
                    </div>
                    <div
                        className="rounded py-3 m-1 d-flex flex-column align-items-center border border-2 border-success bg-success"
                        onClick={handlePayment}
                        style={{ flex: 1 }}
                    >
                        Payment
                    </div>
                </div>
                <div className="d-flex justify-content-between align-items-center mb-3 text-center">
                    <div
                        className={`rounded py-3 m-1 d-flex flex-column align-items-center border border-2 ${salesLock ? 'bg-danger border-danger' : 'border-secondary'}`}
                        onClick={handleSalesLock}
                        style={{ flex: 1 }}
                    >
                        Lock
                    </div>
                    <div
                        className="rounded py-3 m-1 d-flex flex-column align-items-center border border-2 border-secondary"
                        onClick={() => alert('Gift Card')}
                        style={{ flex: 1 }}
                    >
                        Transfer
                    </div>
                    <div
                        className="rounded py-3 m-1 d-flex flex-column align-items-center border border-2 border-danger bg-danger"
                        onClick={(e) => handleDelete('void')}
                        style={{ flex: 1 }}
                    >
                        Void
                    </div>
                    <div
                        className="rounded py-3 m-1 d-flex flex-column align-items-center border border-2 border-secondary"
                        onClick={() => setShowMenu(!showMenu)}
                        style={{ flex: 1 }}
                    >
                        Menu
                    </div>
                </div>
            </div>
        </>
    )
}

export default Controls

Controls.propTypes = {
    data: PropTypes.shape({
        handleDelete: PropTypes.func.isRequired,
        handleQuantity: PropTypes.func.isRequired,
        handleNewSale: PropTypes.func.isRequired,
        handleDiscount: PropTypes.func.isRequired,
        handleSalesLock: PropTypes.func.isRequired,
        handlePayment: PropTypes.func.isRequired,
        salesLock: PropTypes.bool.isRequired,
        selectedProduct: PropTypes.array.isRequired,
        showMenu: PropTypes.bool.isRequired,
        setShowMenu: PropTypes.func.isRequired,
        discount: PropTypes.string.isRequired,
        paymentMethod: PropTypes.string.isRequired,
        setPaymentMethod: PropTypes.func.isRequired,
    }).isRequired,
}
