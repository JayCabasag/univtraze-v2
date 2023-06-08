import React, {createContext, useState} from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {

    const [userType, setUserType] = useState(null)

    return (
        <AuthContext.Provider value={{userType, setUserType}} >{children}</AuthContext.Provider>
    )
}