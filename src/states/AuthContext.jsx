import React, { useState, useContext, useEffect, createContext } from "react"
import { auth } from "../config/firebase-config";
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";

const authContext = createContext()

export function useAuth() {
    return useContext(authContext)
}

export function AuthProvider({ children }) {

    const [currentUser, setCurrentUser] = useState(null)
    const [loading, setLoading] = useState(true)

    function login(email, password) {
        return signInWithEmailAndPassword(auth, email, password)
    }
    function logout() {
        return signOut(auth)
    }


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user)
            setLoading(false)

        })
        return unsubscribe
    }, [])

    const value = {
        currentUser,
        login,
        logout
    }
    return (

        <authContext.Provider value={value}>
            {loading ? <div>Loading...</div> : children}
        </authContext.Provider>
    )
}