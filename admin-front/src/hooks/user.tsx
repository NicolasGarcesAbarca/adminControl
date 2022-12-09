import React, {
    createContext, useState, useEffect,
} from 'react';
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../firebase'

type TT = { children: React.ReactNode }


export const userContext = createContext<any>(null)

export function ProvideUser(props: TT) {
    const [user, setUser] = useState<any>(null)
    //add on auth state change
    useEffect(() => {
        return () => {
            onAuthStateChanged(auth, async (fbUser) => {
                if (fbUser) {
                    console.log("user on auth change")
                    // console.log(Object.keys(fbUser))
                    // console.log(fbUser)
                    const idTokenResult = await fbUser.getIdTokenResult(true);
                    console.log('id token')
                    console.log(idTokenResult.claims.role)
                    setUser(fbUser)
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
