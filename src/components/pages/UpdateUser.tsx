import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { UserAPI } from '../pages/ListUser';
import { useParams } from "react-router-dom";
import { UserDetail } from "../admin/UserDetail";
import { Spinner } from "@chakra-ui/react";

export function UpdateUser() {
    const { userId } = useParams<{ userId: string }>();
    const [user, setUser] = useState<UserAPI>({} as UserAPI);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getUser = async () => {
            setError(false)
            setLoading(true)
            try {
                const docRef = doc(db, "users", userId as string);
                const docSnapshot = await getDoc(docRef);
                if (docSnapshot.exists()) {
                    console.log("update user page")
                    console.log("Document data:", docSnapshot.data());
                    setUser(docSnapshot.data() as UserAPI)
                } else {
                    throw new Error("No such document!")
                }
            } catch (e) {
                setError(true)
            } finally {
                setLoading(false)
            }
        }
        getUser()
    }, []);
    if (error) return <p>Error</p>
    if (loading) return <div>
        <Spinner thickness='4px'
            speed='0.9s'
            emptyColor='gray.100'
            color='red.500'
            size='xl' /></div>
    return <div>
        <UserDetail userInfo={user} />
    </div>;
}