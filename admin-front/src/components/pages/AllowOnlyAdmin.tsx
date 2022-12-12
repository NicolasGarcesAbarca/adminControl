import React, { useContext } from 'react'
import { userContext } from '../../hooks/user'
import { Navigate } from "react-router-dom";

export function AllowOnlyAdmin({ children }: { children: React.ReactNode }) {
    const user = useContext(userContext)
    if (user && user.role && user.role === 'admin') {
        return <>{children}</>
    }

    return <Navigate to="/login" replace={true} />
}