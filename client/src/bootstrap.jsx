import axios from 'axios'
import cookies from 'js-cookie'

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8000/api',
    timeout: 30000,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
    withCredentials: true
})

axiosInstance.interceptors.request.use(
    (config) => {
        const token = cookies.get('asasas')
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    },
)

axiosInstance.interceptors.response.use(
    (response) => {
        return response
    },
    (error) => {
        if (error.response?.status === 401) {
            cookies.remove('asasas')
            window.location.href = '/login'
        }
        return Promise.reject(error)
    },
)

window.axios = axiosInstance
window.cookies = cookies
