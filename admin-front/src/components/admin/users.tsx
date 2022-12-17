import { useEffect, useState } from "react"
import ListUser from "./listUser"
import { Box } from '@chakra-ui/react'
import { collection, query, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
export interface UserAPI {
    uid: string,
    displayName: string,
    email: string,
    ruts: Array<string>,
}

const URL = "http://127.0.0.1:5001/remind23451/us-central1/api/users"
export default function User() {
    const [users, setUsers] = useState<Array<UserAPI>>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    useEffect(() => {
        console.log("useEffect")
        const getUsers = async () => {
            setError(false)
            setLoading(true)
            try {
                const q = query(collection(db, "users"));
                const querySnapshot = await getDocs(q);
                querySnapshot.forEach((doc) => {
                    console.log(doc.id, " => ", doc.data());
                    setUsers((users) => [...users, doc.data() as UserAPI])
                });
            } catch (e) {
                setError(true)
            } finally {
                setLoading(false)
            }
        }
        console.log("getUsers")
        getUsers()
    }, [])

    if (error) return <p>Error</p>
    if (loading) return <p>Loading...</p>
    return (<>{users ?
        <Box>
            <ListUser users={users} />
        </Box> :
        <p>No users</p>}</>)
}