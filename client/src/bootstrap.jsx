import axios from 'axios'
import cookies from 'js-cookie'

const excludedPaths = ['/login', '/register']
const axiosInstance = axios.create({
    baseURL: 'http://localhost:8000/api',
    timeout: 30000,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
    withCredentials: true,
})

// axiosInstance.interceptors.request.use(
//     (config) => {
//         const token = cookies.get('session_id')
//         if (token) {
//             config.headers['Authorization'] = `Bearer ${token}`
//         }
//         return config
//     },
//     (error) => {
//         return Promise.reject(error)
//     },
// )

axiosInstance.interceptors.response.use(
    (response) => {
        return response
    },
    (error) => {
        if (error.response?.status === 401 && !excludedPaths.includes(window.location.pathname)) {
            cookies.remove('session_id')
            window.location.href = '/login'
        }
        return Promise.reject(error)
    },
)

window.axios = axiosInstance
window.cookies = cookies
