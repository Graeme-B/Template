import { createContext, useContext, useState } from 'react'

const AuthContext = createContext({})

export const useAuthContext = () => useContext(AuthContext)

export const AuthContextProvider = ({ children, ...props }) => {
  const [authenticated, setAuthenticated] = useState(props.authenticated)
  const [name, setName] = useState(props.name)
  const [email, setEmail] = useState(props.email)
  return (
    <AuthContext.Provider
      value={{
        authenticated,
        setAuthenticated,
        name,
        setName,
        email,
        setEmail
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
