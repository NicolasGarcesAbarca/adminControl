import { useEffect,useState } from "react";
import { UserAPI } from "../pages/ListUser"
import { BsTrash } from "react-icons/bs";
import {
    Avatar,
    Text,
    Flex,
    UnorderedList,
    ListItem,
    Divider,
    HStack,
    IconButton,
} from '@chakra-ui/react'
import {matchSorter} from 'match-sorter'

export default function ListUser(props: { users: Array<UserAPI> ,search: string}) {
    const [filteredUsers, setFilteredUsers] = useState<Array<UserAPI>>([])
    useEffect(() => {
        //filter users
        setFilteredUsers(matchSorter(props.users, props.search, { keys: ['displayName', 'email']} ))

    }, [props.users, props.search])
    return (
        <Flex
            w={'100%'}
            mt={4}
        >
            <UnorderedList
                w={"100%"}
                listStyleType={'none'}
                marginInlineStart={0}
            >
                {filteredUsers.map((user) => {
                    return (
                        <ListItem
                            key={user.uid}
                        >
                            <User user={user} />
                            <Divider color={'gray.300'} />
                        </ListItem>
                    )
                }
                )}
            </UnorderedList>
        </Flex>
    )
}

function User({ user }: { user: UserAPI }) {
    return <Flex
        overflow='hidden'
        alignItems={'center'}
        justifyContent={'space-between'}
        bg={'white'}
        p={4}
    >
        <HStack
            gap={4}
        >
            <Avatar size='md' name={user.displayName} />
            <Flex
                direction='column'
            >
                <Text fontSize={'lg'}>{user.email}</Text>
                <Text fontSize={'sm'}>{user.displayName}</Text>
            </Flex>
        </HStack>
        {/* <UnorderedList>
            {user.ruts.map((rut) => <ListItem key={rut}>{rut}</ListItem>)}
        </UnorderedList> */}
        <IconButton aria-label='Search database' icon={<BsTrash/>} />
    </Flex>
}