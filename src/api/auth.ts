import type { AuthContextType, User, UserCredentials } from '@/types'
import api from '@/lib/axios'

export async function postUser(newUser: User): Promise<AuthContextType> {
  try {
    const res = await api.post(`/auth/register`, newUser)
    return res.data
  } catch (e: any) {
    const message = e.response?.data?.message || 'Registration failed'
    throw new Error(message)
  }
}

export async function logInUser(
  user: Omit<User, 'name'>,
): Promise<AuthContextType> {
  try {
    const res = await api.post('/auth/login', user)
    return res.data
  } catch (e: any) {
    const message = e.response?.data?.message || 'Registration failed'
    throw new Error(message)
  }
}

export async function logoutUser(): Promise<void> {
  try {
    await api.post('/auth/logout')
  } catch (e: any) {
    const message = e.response?.data?.message || 'Failed logout'
    throw new Error(message)
  }
}

export async function refreshToken(): Promise<{
  user: UserCredentials
  accessToken: string
}> {
  try {
    const res = await api.post('/auth/refresh')
    return res.data
  } catch (e: any) {
    const message = e.response?.data?.message || 'Failed to refresh token'
    throw new Error(message)
  }
}
