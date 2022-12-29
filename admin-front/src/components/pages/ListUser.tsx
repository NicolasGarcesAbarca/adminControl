import { useEffect, useState } from "react"
import { BsSearch, BsPlus } from "react-icons/bs";
import ListUser from "../admin/listUser"
import { useNavigate } from "react-router-dom";
import {
    Box,
    Center,
    Flex,
    Text,
    Input,
    Button,
} from '@chakra-ui/react'
import { collection, query, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import { StatusCards } from "../admin/listUserStatusCards";

export interface UserAPI {
    uid: string,
    displayName: string,
    email: string,
    ruts: Array<string>,
}

export function UserList() {
    const [search, setSearch] = useState<string>('')
    const [users, setUsers] = useState<Array<UserAPI>>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const navigate = useNavigate()
    useEffect(() => {
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
        getUsers()
    }, [])

    if (error) return <p>Error</p>
    if (loading) return <p>Loading...</p>
    return (<>{users ?
        <Flex
            bg={'gray.100'}
            p={12}
            gap={4}
        >
            <Flex
                w={['30%']}
            >
                <StatusCards users={users}/>
            </Flex>
            <Flex
                direction='column'
                align='center'
                w={['100%']}
                h={'100vh'}
            >
                <Flex
                    justifyContent={'space-between'}
                    alignItems={'center'}
                    w={'100%'}
                    bg={'white'}
                    p={4}
                >
                    <Flex>
                        <Button rightIcon={<BsPlus />}
                            colorScheme='green'
                            variant='solid'
                            onClick={() => navigate('/admin/createUser')}
                        >
                            <Text pr={4}>Crear Usuario</Text>
                        </Button>
                    </Flex>
                    <Flex>
                        <Input
                            variant='outline'
                            placeholder='Search user'
                            borderColor={'gray.400'}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <Center ml={2}>
                            <BsSearch />
                        </Center>
                    </Flex>
                </Flex>
                <Box
                    w={['100%']}
                >
                    <ListUser users={users} search={search}/>
                </Box>
            </Flex>
        </Flex> :
        <p>No users</p>}</>)
}