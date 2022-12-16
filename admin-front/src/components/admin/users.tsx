import axios from "axios"
import { useEffect, useState, useContext } from "react"
import { userContext } from "../../hooks/user"
import ListUser from "./listUser"
import { Box } from '@chakra-ui/react'

export interface UserAPI {
    uid: string,
    name: string,
    email: string,
    role: string,
    lastSignInTime: string,
    creationTime: string,
}

const URL = "http://127.0.0.1:5001/remind23451/us-central1/api/users"
export default function User() {
    const { user, userIsLoading } = useContext(userContext)
    const [users, setUsers] = useState < Array<UserAPI>>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    let config: any = null
    if (user) {
        config = {
            headers: { Authorization: `Bearer ${user.accessToken}` }
        };
    }
    useEffect(() => {
        const getUsers = async () => {
            setError(false)
            setLoading(true)
            try {
                const { data } = await axios.get(URL, config)
                //creationTime string
                //displayName: string
                //email: string
                //lastSignInTime string
                //role string
                //uid string
                setUsers(data.users)
            } catch (e) {
                setError(true)
            } finally {
                setLoading(false)
            }
        }
        getUsers()
    }, [user])

    if (error) return <p>Error</p>
    if (loading) return <p>Loading...</p>
    return (<>{users ?
        <Box>
            <ListUser users={users} />
        </Box> :
        <p>No users</p>}</>)
}