"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface User {
  id: string
  name: string
  email: string
  password: string
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  login: (email: string, password: string) => boolean
  signup: (name: string, email: string, password: string) => boolean
  logout: () => void
  deleteAccount: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    // Check if user is logged in on initial load
    const storedUser = localStorage.getItem("currentUser")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
      setIsAuthenticated(true)
    }
  }, [])

  const getUsers = (): User[] => {
    const users = localStorage.getItem("users")
    return users ? JSON.parse(users) : []
  }

  const saveUsers = (users: User[]) => {
    localStorage.setItem("users", JSON.stringify(users))
  }

  const login = (email: string, password: string): boolean => {
    const users = getUsers()
    const foundUser = users.find((u) => u.email === email && u.password === password)
  
    if (foundUser) {
      console.log("Login successful for user:", foundUser)
      setUser(foundUser)
      setIsAuthenticated(true)
      localStorage.setItem("currentUser", JSON.stringify(foundUser))
  
      // ✅ Set cookie for middleware
      document.cookie = `currentUser=true; path=/`
  
      return true
    }
  
    console.log("Login failed for email:", email)
    return false
  }

  
  const signup = (name: string, email: string, password: string): boolean => {
    const users = getUsers()

    // Check if email already exists
    if (users.some((u) => u.email === email)) {
      return false
    }

    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      password,
    }

    const updatedUsers = [...users, newUser]
    saveUsers(updatedUsers)

    setUser(newUser)
    setIsAuthenticated(true)
    localStorage.setItem("currentUser", JSON.stringify(newUser))

    return true
  }

  const logout = () => {
    setUser(null)
    setIsAuthenticated(false)
    localStorage.removeItem("currentUser")
  
    // Remove cookie
    document.cookie = "currentUser=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/"
  }
  
  const deleteAccount = () => {
    if (!user) return

    const users = getUsers()
    const updatedUsers = users.filter((u) => u.id !== user.id)
    saveUsers(updatedUsers)

    setUser(null)
    setIsAuthenticated(false)
    localStorage.removeItem("currentUser")
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        signup,
        logout,
        deleteAccount,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

