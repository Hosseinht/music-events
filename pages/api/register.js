import cookie from 'cookie'
import {API_URL} from "@/config/index";

// Strapi has json web token authentication system built in where you send your username
// or email and password, you get back a token then you take that token to access protected routes
// we don't want to make our request directly to strapi from our authcontext and our client because we need to save the token and we don't want to save it in client side

export default async (req, res) => {
    if (req.method === 'POST') {
        const {username, email, password} = req.body
        const strapiRes = await fetch(`${API_URL}/auth/local/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username,
                email,
                password,
            })
        })

        const data = await strapiRes.json()
        console.log(data)

        if (strapiRes.ok) {
            // Set Cookie
            res.setHeader('Set-Cookie', cookie.serialize('token', data.jwt, {
                httpOnly: true,
                secure: process.env.NODE_ENV !== 'development',
                maxAge: 60 * 60 * 24 * 7,
                sameSite: 'strict',
                path:'/'
            }))
            res.status(200).json({user: data.user})
        } else {
            res.status(data.statusCode).json({message: data.message[0].messages[0].message})
        }


    } else {
        res.setHeader('Allow', ['POST'])
        res.status(405).json({message: `Method ${req.method} not allowed`})
    }
}