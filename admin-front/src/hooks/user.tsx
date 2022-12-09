import React, {
    createContext, useState, useEffect,
} from 'react';
import { onAuthStateChanged, User } from 'firebase/auth'
import { auth } from '../firebase'
import { z } from 'zod'

type TT = { children: React.ReactNode }
const Claims = z.promise(
    z.object({
        authTime: z.date(),
        claims: z.object({
            aud: z.string(),
            auth_time: z.number(),
            email: z.string(),
            email_verified: z.boolean(),
            exp: z.number(),
            firebase: z.object({}),
            iat: z.number(),
            iss: z.string(),
            name: z.string(),
            role: z.string().optional(),
            sub: z.string(),
            user_id: z.string()
        }),
        expirationTime: z.date(),
        issuedAtTime: z.date(),
        signInProvider: z.string(),
        signInFactor: z.string().optional(),
        token: z.string()
    })
)


const Usr = z.object({
    providerId: z.string(),
    email: z.string(),
    accessToken: z.string(),
    displayName: z.union([z.string(),z.null()]),
    role: z.string().optional(),
    getIdTokenResult: z.function().args(z.boolean()).returns(Claims).optional()
})

type Usr=z.infer<typeof Usr>



export const userContext = createContext<Usr|null>(null)

export function ProvideUser(props: TT) {
    const [user, setUser] = useState<Usr|null>(null)
    //add on auth state change
    useEffect(() => {
        return () => {
            onAuthStateChanged(auth, async (fbUser) => {
                console.log("user on auth change")
                console.log(fbUser)
                if (fbUser) {
                    const validUser = Usr.parse(fbUser)
                    // console.log(fbUser)
                    console.log('id token')
                    const idTokenResult = await fbUser.getIdTokenResult(true);
                    if (idTokenResult.claims.role) {
                        validUser.role = idTokenResult.claims.role;
                    }
                    setUser(validUser)
                } else {
                    setUser(null)
                }
            })
        }
    }, [])

    return (
        <userContext.Provider value={user}>
            {props.children}
        </userContext.Provider>
    )
}
