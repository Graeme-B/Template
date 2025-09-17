import { createContext, useContext, useState } from 'react'

const AuthContext = createContext({})

export const useAuthContext = () => useContext(AuthContext)

export const AuthContextProvider = ({ children, ...props }) => {
  const [authenticated, setAuthenticated] = useState(props.authenticated)
  const [name, setName] = useState(props.name)
  const [email, setEmail] = useState(props.email)
  const [userid, setUserid] = useState(props.userid)
  return (
    <AuthContext.Provider
      value={{
        authenticated,
        setAuthenticated,
        name,
        setName,
        email,
        setEmail,
        userid,
        setUserid
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
