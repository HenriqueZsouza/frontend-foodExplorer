import { createContext, useContext, useState, useEffect } from 'react'
import { message } from 'antd'

import { api } from '../services/api'

export const AuthContext = createContext()

function AuthProvider({ children }) {
  const [data, setData] = useState({})
  const [loading, setLoading] = useState(false)

  async function signIn({ email, password }) {

    try {
      setLoading(true)
      const response = await api.post("/sessions", { email, password })

      const { user, token } = response.data

      localStorage.setItem("foodexplorer:user", JSON.stringify(user))
      localStorage.setItem("foodexplorer:token", token)

      api.defaults.headers.common['Authorization'] = `Bearer ${token}`
      setData({ user, token })

      setLoading(false)

    } catch (error) {
      if (error.response) {
        message.error("Email ou senha incorretos!")
      } else {
        message.error("Não foi possível realizar login, tente novamente!")
      }

      setLoading(false)
    }
  }

  function signOut() {
    localStorage.removeItem("foodexplorer:token")
    localStorage.removeItem("foodexplorer:user")

    setData({})
  }

  useEffect(() => {
    const token = localStorage.getItem("foodexplorer:token")
    const user = localStorage.getItem("foodexplorer:user")

    if (token && user) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`

      setData({
        token,
        user: JSON.parse(user)
      })
    }
  }, [])

  return (
    <AuthContext.Provider value={{
      signIn,
      signOut,
      loading,
      setLoading,
      user: data.user,
    }}>
      {children}
    </AuthContext.Provider>
  )
}

function useAuth() {
  const context = useContext(AuthContext)

  return context
}

export { AuthProvider, useAuth }
