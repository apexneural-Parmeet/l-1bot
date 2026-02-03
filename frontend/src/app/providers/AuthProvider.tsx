import type { ReactNode } from 'react'
import { createContext, useContext, useMemo } from 'react'
import type { User } from '@/stores/authStore'
import { useAuthStore } from '@/stores/authStore'

interface AuthContextValue {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  setUser: (user: User | null) => void
  setToken: (token: string | null) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const user = useAuthStore((s) => s.user)
  const token = useAuthStore((s) => s.token)
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)
  const setUser = useAuthStore((s) => s.setUser)
  const setToken = useAuthStore((s) => s.setToken)
  const logout = useAuthStore((s) => s.logout)
  const value = useMemo(
    () => ({
      user,
      token,
      isAuthenticated,
      setUser,
      setToken,
      logout: () => {
        logout()
        localStorage.removeItem('auth_token')
      },
    }),
    [user, token, isAuthenticated, setUser, setToken, logout]
  )
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
