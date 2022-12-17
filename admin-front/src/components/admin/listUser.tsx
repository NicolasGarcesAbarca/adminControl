import { UserAPI } from "./users"
import { Card, Stack, CardBody, Text, Button, Flex, UnorderedList, ListItem } from '@chakra-ui/react'

export default function ListUser(props: { users: Array<UserAPI> }) {
    return (
        <Flex width='100%'>
            <UnorderedList width="100%" mx={6} style={{listStyleType:'none'}}>
                {props.users.map((user) => {
                    return (
                        <ListItem 
                            key={user.uid}
                            mb={4}
                        >
                            <User user={user} />
                        </ListItem>
                    )
                }
                )}
            </UnorderedList>
        </Flex>
    )
}

function User({ user }: { user: UserAPI }) {
    return <Card
        direction={{ base: 'column', sm: 'row' }}
        overflow='hidden'
    >
        <Stack>
            <CardBody>
                <Text >{user.email}</Text>
                <Text >{user.displayName}</Text>
                <UnorderedList>
                    {user.ruts.map((rut) => <ListItem key={rut}>{rut}</ListItem>)}
                </UnorderedList>
                <Button variant='solid' colorScheme='purple'>edit</Button>
            </CardBody>
        </Stack>
    </Card>
}