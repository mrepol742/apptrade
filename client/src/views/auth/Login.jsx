import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
    CButton,
    CCard,
    CCardBody,
    CCardGroup,
    CCol,
    CContainer,
    CForm,
    CFormInput,
    CInputGroup,
    CInputGroupText,
    CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import { toast } from 'react-toastify'

const Login = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    })
    const [loading, setLoading] = useState(false)

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }))
    }

    const handleLogin = async (e) => {
        e.preventDefault()
        axios
            .post('/auth/login', formData)
            .then((response) => {
                if (response.data.error) return toast.error(response.data.error)
                toast.success('Login successful')
                cookies.set('session_id', response.data.session_token, {
                    expires: 1,
                })
                window.location.href = '/'
            })
            .catch((error) => toast.error('Invalid username or password'))
    }

    const canvas = document.getElementById('canvas')
    canvas.width = 320
    canvas.height = 320
    const ctx = canvas.getContext('2d')

    // inspired by gl-matrix beta 4
    class Vec2 extends Array {
        constructor(...values) {
            switch (values.length) {
                case 2: {
                    const v = values[0]
                    super(v, values[1])
                    break
                }
                case 1: {
                    const v = values[0]
                    super(v, v)
                    break
                }
                default: {
                    super(2)
                    break
                }
            }
        }

        get x() {
            return this[0]
        }
        set x(value) {
            this[0] = value
        }

        get y() {
            return this[1]
        }
        set y(value) {
            this[1] = value
        }

        add(b) {
            this[0] += b[0]
            this[1] += b[1]
        }

        distance(b) {
            return Vec2.distance(this, b)
        }

        static distance(a, b) {
            return Math.hypot(b[0] - a[0], b[1] - a[1])
        }
    }

    class Particle {
        constructor() {
            this.speed = new Vec2(Math.random(), Math.random())
            this.position = new Vec2(
                Math.random() * window.innerWidth,
                Math.random() * window.innerHeight,
            )
            this.radius = Math.random() * 4 + 1
        }

        update() {
            if (this.position.x > window.innerWidth || this.position.x < 0) {
                this.speed.x *= -1
            }
            if (this.position.y > window.innerHeight || this.position.y < 0) {
                this.speed.y *= -1
            }
            this.position.add(this.speed)
        }
    }

    const particles = []

    for (let i = 0; i < 100; i++) {
        particles.push(new Particle())
    }

    const update = () => {
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
        const MAX_DISTANCE = (window.innerWidth + window.innerHeight) / 20

        for (let i = 0; i < particles.length; i++) {
            particles[i].update()

            for (let j = i; j < particles.length; j++) {
                const distance = particles[i].position.distance(particles[j].position)
                if (distance < MAX_DISTANCE) {
                    ctx.strokeStyle = `rgba(255, 95, 158, ${1 - distance / MAX_DISTANCE})`
                    ctx.beginPath()
                    ctx.moveTo(...particles[i].position)
                    ctx.lineTo(...particles[j].position)
                    ctx.stroke()
                }
            }

            ctx.fillStyle = 'rgba(255, 95, 158, 0.5)'
            ctx.beginPath()

            ctx.arc(...particles[i].position, particles[i].radius, 0, 2 * Math.PI)
            ctx.fill()
        }
        requestAnimationFrame(update)
    }

    update()

    return (
        <div
            className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center"
            style={{ position: 'relative' }}
        >
            <div
                className="auth-bg"
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    zIndex: 1,
                }}
            />
            <canvas
                id="canvas"
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100vw',
                    height: '100vh',
                    zIndex: 2,
                    pointerEvents: 'none',
                }}
            ></canvas>
            <CContainer style={{ position: 'relative', zIndex: 3 }}>
                <CRow className="justify-content-center">
                    <CCol md={8} lg={6} xl={4}>
                        <CCard className="p-4">
                            <CCardBody>
                                <CForm onSubmit={handleLogin}>
                                    <h1>Apptrade</h1>
                                    <p className="text-body-secondary">Sign In to your account</p>
                                    <CInputGroup className="mb-3">
                                        <CInputGroupText>
                                            <CIcon icon={cilUser} />
                                        </CInputGroupText>
                                        <CFormInput
                                            onChange={handleChange}
                                            value={formData.username}
                                            type="text"
                                            name="username"
                                            placeholder="Username"
                                            autoComplete="username"
                                        />
                                    </CInputGroup>
                                    <CInputGroup className="mb-4">
                                        <CInputGroupText>
                                            <CIcon icon={cilLockLocked} />
                                        </CInputGroupText>
                                        <CFormInput
                                            onChange={handleChange}
                                            value={formData.password}
                                            name="password"
                                            type="password"
                                            placeholder="Password"
                                            autoComplete="current-password"
                                        />
                                    </CInputGroup>
                                    <CRow>
                                        <CCol xs={6}>
                                            <CButton color="primary" className="px-4" type="submit">
                                                Login
                                            </CButton>
                                        </CCol>
                                        {/* <CCol xs={6} className="text-right">
                      <CButton color="link" className="px-0">
                        Forgot password?
                      </CButton>
                    </CCol> */}
                                    </CRow>
                                </CForm>
                            </CCardBody>
                        </CCard>
                    </CCol>
                </CRow>
            </CContainer>
        </div>
    )
}

export default Login
