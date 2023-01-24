import React, { useContext } from 'react'
import { userContext } from '../../hooks/user'
import { Navigate } from "react-router-dom";
import { Spinner } from '@chakra-ui/react'

export function AllowOnlyAdmin({ children }: { children: React.ReactNode }) {
    const { user, userIsLoading } = useContext(userContext)

    if (userIsLoading) {
        return <div><Spinner thickness='4px'
            speed='0.65s'
            emptyColor='gray.200'
            color='teal.500'
            size='xl' /></div>
    }

    if (user && user.role && user.role === 'admin') {
        return <>{children}</>
    } else {
        return <Navigate to="/login" replace={true} />
    }
}