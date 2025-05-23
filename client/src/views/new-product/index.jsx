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

const NewProduct = () => {
    const [department, setDepartment] = useState([])
    const [group, setGroup] = useState([])
    const [product, setProduct] = useState({
        name: '',
        code: '',
        barcode: '',
        unit_measurement: '',
        group: '',
        active: true,
        default_quantity: true,
        age_restriction: 0,
        description: '',
        taxes: 0,
        cost_price: 0,
        markup: 0,
        sale_price: 0,
        color: '',
        image: null,
    })

    const handleChange = (e) => {
        const { id, value } = e.target
        setProduct((prevProduct) => ({
            ...prevProduct,
            [id]: value,
        }))
    }

    const handleSwitchChange = (e) => {
        const { id, checked } = e.target
        setProduct((prevProduct) => ({
            ...prevProduct,
            [id]: checked,
        }))
    }

    const handleSelectChange = (e) => {
        const { id, value } = e.target
        setProduct((prevProduct) => ({
            ...prevProduct,
            [id]: value,
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        axios
            .post('/products', product)
            .then((response) => {
                if (response.data.error) return toast.error(response.data.error)
                toast.success('Product created successfully')
                setProduct({
                    name: '',
                    code: '',
                    barcode: '',
                    unit_measurement: '',
                    group: '',
                    active: true,
                    default_quantity: true,
                    age_restriction: 0,
                    description: '',
                    taxes: 0,
                    cost_price: 0,
                    markup: 0,
                    sale_price: 0,
                    color: '',
                    image: null,
                })
            })
            .catch((error) => {
                console.error('Error adding product:', error)
            })
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setProduct((prevProduct) => ({
                    ...prevProduct,
                    image: reader.result,
                }))
            }
            reader.readAsDataURL(file)
        }
    }

    const handleClearImage = () => {
        setProduct((prevProduct) => ({
            ...prevProduct,
            image: null,
        }))
    }

    const fetchData = async () => {
        const [fetchDepartments, fetchGroups] = await Promise.all([
            axios.get('/departments'),
            axios.get('/groups'),
        ])
        setDepartment(fetchDepartments.data)
        setGroup(fetchGroups.data)
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <CForm onSubmit={handleSubmit} className="border rounded-3 p-4 mx-3">
            <div className="d-flex justify-content-between">
                <h3 className="mb-3">New Product</h3>
                <div>
                    <CButton color="secondary" className="me-2" size="sm">
                        Cancel
                    </CButton>
                    <CButton color="primary" size="sm" type="submit">
                        Save
                    </CButton>
                </div>
            </div>
            <h5>Details</h5>
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
                <CCol xs={12} md={6}>
                    <CFormSelect
                        id="department_id"
                        floatingClassName="mb-3"
                        floatingLabel="Department"
                        onChange={handleSelectChange}
                        options={[
                            { label: 'Select a department', value: '' },
                            ...department.map((d) => ({
                                label: d.name,
                                value: d.id,
                            })),
                        ]}
                    />
                </CCol>
            </CRow>
            <CRow>
                <CCol xs={12} md={6}>
                    <CFormInput
                        type="text"
                        id="code"
                        floatingClassName="mb-3"
                        floatingLabel="Code"
                        onChange={handleChange}
                        placeholder=""
                    />
                </CCol>
                <CCol xs={12} md={6}>
                    <CFormInput
                        type="text"
                        id="barcode"
                        floatingClassName="mb-3"
                        floatingLabel="Barcode"
                        onChange={handleChange}
                        placeholder=""
                    />
                </CCol>
            </CRow>
            <CRow>
                <CCol xs={12} md={6}>
                    <CFormInput
                        type="text"
                        id="unit_measurement"
                        floatingClassName="mb-3"
                        floatingLabel="Unit of Measurement"
                        onChange={handleChange}
                        placeholder=""
                    />
                </CCol>
                <CCol xs={12} md={6}>
                    <CFormSelect
                        id="group_id"
                        floatingClassName="mb-3"
                        floatingLabel="Group"
                        onChange={handleSelectChange}
                        options={[
                            { label: 'Select a group', value: '' },
                            ...group.map((g) => ({
                                label: g.name,
                                value: g.id,
                            })),
                        ]}
                    />
                </CCol>
            </CRow>
            <CFormSwitch
                onChange={handleSwitchChange}
                label="Active"
                id="is_active"
                defaultChecked
            />
            <CFormSwitch
                onChange={handleSwitchChange}
                label="Default Quantity"
                id="default_quantity"
                defaultChecked
            />
            <CFormInput
                type="number"
                id="age_restriction"
                floatingClassName="mb-3"
                floatingLabel="Age Restriction"
                onChange={handleChange}
                placeholder=""
            />
            <CFormInput
                type="text"
                id="description"
                floatingClassName="mb-3"
                floatingLabel="Description"
                onChange={handleChange}
                placeholder=""
            />
            <h5>Price</h5>
            <CRow>
                <CCol xs={12} md={6}>
                    <CFormInput
                        type="number"
                        id="taxes"
                        floatingClassName="mb-3"
                        floatingLabel="Taxes %"
                        onChange={handleChange}
                        placeholder=""
                    />
                </CCol>
                <CCol xs={12} md={6}>
                    <CFormInput
                        type="number"
                        id="cost_price"
                        floatingClassName="mb-3"
                        floatingLabel="Cost"
                        onChange={handleChange}
                        placeholder=""
                    />
                </CCol>
            </CRow>
            <CRow>
                <CCol xs={12} md={6}>
                    <CFormInput
                        type="number"
                        id="markup"
                        floatingClassName="mb-3"
                        floatingLabel="Markup"
                        onChange={handleChange}
                        placeholder=""
                    />
                </CCol>
                <CCol xs={12} md={6}>
                    <CFormInput
                        type="number"
                        id="sale_price"
                        floatingClassName="mb-3"
                        floatingLabel="Sale Price"
                        onChange={handleChange}
                        placeholder=""
                    />
                </CCol>
            </CRow>
            <h5>Image & Color</h5>
            <CFormInput
                type="text"
                id="color"
                floatingClassName="mb-3"
                floatingLabel="Color"
                onChange={handleChange}
                placeholder=""
            />
            <div className="mb-3">
                <CFormInput
                    type="file"
                    id="image"
                    onChange={handleImageChange}
                    accept="image/*"
                    className="mb-2"
                />
                <CButton color="secondary" className="me-2" size="sm" onClick={handleClearImage}>
                    Clear
                </CButton>
            </div>
            {product.image && (
                <CImage
                    src={product.image}
                    className="img-fluid mb-3"
                    alt="Selected image"
                    style={{ maxWidth: '150px', maxHeight: '150px' }}
                />
            )}
        </CForm>
    )
}

export default NewProduct
