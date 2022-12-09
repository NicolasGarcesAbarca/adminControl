import { useContext } from 'react'
import { Login } from '../forms/Login'
import { userContext } from '../../hooks/user'


export function LoginPage() {
    const user = useContext(userContext)
    return (
        <div className='LoginPage__container'>
            {user ? <p>you are {user.email}</p>:<Login />}
            
        </div>
    )
}