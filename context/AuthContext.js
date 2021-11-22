import {createContext, useEffect, useState} from "react";
import {useRouter} from "next/router";
import {NEXT_URL} from "@/config/index";

const AuthContext = createContext()

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [error, setError] = useState(null)

    const router = useRouter()

    useEffect(() => checkUserLoggedIn(), [])

    // Register User
    const register = async (user) => {
        const res = await fetch(`${NEXT_URL}/api/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user)
        })
        const data = await res.json()
        console.log(data)

        if (res.ok) {
            setUser(data.user)
            router.push(`/account/dashboard`)
        } else {
            setError(data.message)
            setError(null)
        }
    }

    // Login User
    const login = async ({email: identifier, password}) => {
        // identifier = use in strapi. it can be username or email
        const res = await fetch(`${NEXT_URL}/api/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                identifier,
                password,
            })
        })
        const data = await res.json()
        // data ===> const data = await strapiRes.json()
        console.log(data)

        if (res.ok) {
            setUser(data.user)
            router.push(`/account/dashboard`)
        } else {
            setError(data.message)
            // message:
            // res.status(data.statusCode).json({message:data.message[0].messages[0].message})
            setError(null)
        }
    }

    // Logout user
    const logout = async () => {
        // Call api route
        const res = await fetch(`${NEXT_URL}/api/logout`, {
            method: 'POST'
        })
        if (res.ok) {
            setUser(null)
            router.push('/')
        }
    }

    // Check if user is logged in
    const checkUserLoggedIn = async (user) => {
        const res = await fetch(`${NEXT_URL}/api/user`)
        const data = await res.json()

        if (res.ok) {
            setUser(data.user)
        } else {
            setUser(null)
        }
    }

    return (
        <AuthContext.Provider value={{user, error, register, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext