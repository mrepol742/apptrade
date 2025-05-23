import React, { useState, useEffect } from 'react'
import {
    CForm,
    CFormInput,
    CRow,
    CCol,
    CFormSwitch,
    CButtonGroup,
    CImage,
    CButton,
    CFormSelect,
} from '@coreui/react'
import { Helmet } from 'react-helmet'
import { toast } from 'react-toastify'

const NewDepartment = () => {
    const [department, setDepartment] = useState({
        name: '',
    })

    const handleChange = (e) => {
        const { id, value } = e.target
        setDepartment((prevProduct) => ({
            ...prevProduct,
            [id]: value,
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        axios
            .post('/departments', department)
            .then((response) => {
                if (response.data.error) return toast.error(response.data.error)
                toast.success('Department created successfully')
                setDepartment({
                    name: '',
                })
            })
            .catch((error) => {
                console.error('Error adding product:', error)
            })
    }

    return (
        <CForm onSubmit={handleSubmit} className="border rounded-3 p-4 mx-3">
            <div className="d-flex justify-content-between">
                <h3 className="mb-3">New Department</h3>
                <div>
                    <CButton color="secondary" className="me-2" size="sm">
                        Cancel
                    </CButton>
                    <CButton color="primary" size="sm" type="submit">
                        Save
                    </CButton>
                </div>
            </div>
            <CRow>
                <CCol xs={12} md={6}>
                    <CFormInput
                        type="text"
                        id="name"
                        floatingClassName="mb-3"
                        floatingLabel="Name"
                        onChange={handleChange}
                        placeholder=""
                        required
                    />
                </CCol>
            </CRow>
        </CForm>
    )
}

export default NewDepartment
