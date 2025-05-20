import React from 'react'
import PropTypes from 'prop-types'
import { CPagination, CPaginationItem } from '@coreui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons'

const AppPagination = ({ currentPage, setCurrentPage, totalPages, setTotalPages }) => {
    return (
        <CPagination aria-label="Page navigation">
            <CPaginationItem
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                aria-label="Previous"
            >
                <FontAwesomeIcon aria-hidden={true} icon={faChevronLeft} />
            </CPaginationItem>

            {(() => {
                const items = []
                const maxVisiblePages = 5

                const startPage = Math.max(1, currentPage - 2)
                const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1)

                if (startPage > 1) {
                    items.push(
                        <CPaginationItem key={1} onClick={() => setCurrentPage(1)}>
                            1
                        </CPaginationItem>,
                    )
                    if (startPage > 2) {
                        items.push(
                            <CPaginationItem key="ellipsis-start" disabled>
                                &hellip;
                            </CPaginationItem>,
                        )
                    }
                }

                for (let i = startPage; i <= endPage; i++) {
                    items.push(
                        <CPaginationItem
                            key={i}
                            onClick={() => setCurrentPage(i)}
                            active={currentPage === i}
                        >
                            {i}
                        </CPaginationItem>,
                    )
                }

                if (endPage < totalPages) {
                    if (endPage < totalPages - 1) {
                        items.push(
                            <CPaginationItem key="ellipsis-end" disabled>
                                &hellip;
                            </CPaginationItem>,
                        )
                    }
                    items.push(
                        <CPaginationItem
                            key={totalPages}
                            onClick={() => setCurrentPage(totalPages)}
                        >
                            {totalPages}
                        </CPaginationItem>,
                    )
                }

                return items
            })()}

            <CPaginationItem
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                aria-label="Next"
            >
                <FontAwesomeIcon aria-hidden={true} icon={faChevronRight} />
            </CPaginationItem>
        </CPagination>
    )
}

AppPagination.propTypes = {
    currentPage: PropTypes.number.isRequired,
    setCurrentPage: PropTypes.func.isRequired,
    totalPages: PropTypes.number.isRequired,
    setTotalPages: PropTypes.func.isRequired,
}

export default AppPagination
