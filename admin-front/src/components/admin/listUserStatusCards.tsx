import {
    Flex,
    Text,
} from '@chakra-ui/react'

import { UserAPI } from '../pages/ListUser'
export function StatusCards(props: { users: Array<UserAPI> }) {
    const { users } = props
    return <Flex
        direction={'column'}
        w={'100%'}
        gap={4}
    >
        <Flex
            bg={'white'}
            direction={'column'}
            alignItems={'center'}
            p={8}
        >
            <Text fontSize='md'>Total Usuarios</Text>
            <Text fontSize='2xl' as='b'>{users.length}</Text>
        </Flex>
        <Flex
            bg={'white'}
            direction={'column'}
            alignItems={'center'}
            p={8}
        >
            <Text fontSize='md'>Total Usuarios</Text>
            <Text fontSize='2xl' as='b'>{users.length}</Text>
        </Flex>
        <Flex
            bg={'white'}
            direction={'column'}
            alignItems={'center'}
            p={8}
        >
            <Text fontSize='md'>Total Usuarios</Text>
            <Text fontSize='2xl' as='b'>{users.length}</Text>
        </Flex>
        <Flex
            bg={'white'}
            direction={'column'}
            alignItems={'center'}
            p={8}
        >
            <Text fontSize='md'>Total Usuarios</Text>
            <Text fontSize='2xl' as='b'>{users.length}</Text>
        </Flex>
    </Flex>
}