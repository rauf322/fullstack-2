import axios from 'axios'
import { getStoredAccessToken, setStoredAccessToken } from './authToken'
import { refreshToken } from '@/api/auth'

const api = axios.create({
  baseURL: '/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Attach token on refresh
api.interceptors.request.use((config) => {
  const token = getStoredAccessToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const origianlRequest = error.config
    if (
      error.response?.status == 401 &&
      !origianlRequest._retry &&
      !origianlRequest.url.includes('/auth/refresh')
    ) {
      origianlRequest._retry = true
      try {
        const { accessToken: newToken } = await refreshToken()
        setStoredAccessToken(newToken)
        origianlRequest.headers.Authorization = `Bearer ${newToken}`
        return api(origianlRequest)
      } catch (e) {
        console.log(`Refresh token is invalid`, e)
      }
    }
    return Promise.reject(error)
  },
)

export default api
