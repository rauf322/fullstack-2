import { refreshToken } from '@/api/auth'
import type { AuthContextType } from '@/types'
import type { ReactNode } from 'react'
import { createContext, useContext, useEffect, useState } from 'react'
import { setStoredAccessToken } from '@/lib/authToken'

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [accessToken, setAccessToken] = useState<string | null>(null)
  const [user, setUser] = useState<AuthContextType['user']>(null)

  useEffect(() => {
    ;(async () => {
      try {
        const { accessToken: newToken, user: userData } = await refreshToken()
        setAccessToken(newToken)
        setUser(userData)

        setStoredAccessToken(newToken)
      } catch (e) {
        console.log('No refresh token available')
      }
    })()
  }, [])

  useEffect(() => {
    setAccessToken(accessToken)
  }, [accessToken])

  return (
    <AuthContext.Provider
      value={{ accessToken, setAccessToken, user, setUser }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error(`UseAuth must be used within an AuthProvider`)
  }
  return context
}
