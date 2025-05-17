import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAdd, faCartPlus, faClose } from '@fortawesome/free-solid-svg-icons'
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
    } = data

    return (
        <>
            <div className="flex-grow-1 text-uppercase" data-aos="fade-in">
                <div className=" d-flex justify-content-between align-items-center mt-2 text-center">
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
                        Delete
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
                <div className="d-flex justify-content-between align-items-center text-center">
                    <div
                        className="rounded py-3 m-1 d-flex flex-column align-items-center border border-2 border-secondary"
                        onClick={() => alert('Cash')}
                        style={{ flex: 1 }}
                    >
                        Cash
                    </div>
                    <div
                        className="rounded py-3 m-1 d-flex flex-column align-items-center border border-2 border-secondary"
                        onClick={() => alert('Credit Card')}
                        style={{ flex: 1 }}
                    >
                        Credit Card
                    </div>
                    <div
                        className="rounded py-3 m-1 d-flex flex-column align-items-center border border-2 border-secondary"
                        onClick={() => alert('Debit Card')}
                        style={{ flex: 1 }}
                    >
                        Debit Card
                    </div>
                </div>
                <div className="d-flex justify-content-between align-items-center mb-3 text-center">
                    <div
                        className="rounded py-3 m-1 d-flex flex-column align-items-center border border-2 border-secondary"
                        onClick={() => alert('Check')}
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
    }).isRequired,
}
