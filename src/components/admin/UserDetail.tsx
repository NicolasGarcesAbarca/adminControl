import { useState, useContext } from "react";
import { userContext } from "../../hooks/user";
import { UserAPI } from "../pages/ListUser";
import {
    Card,
    Stack,
    HStack,
    Text,
    Button,
    UnorderedList,
    ListItem,
} from '@chakra-ui/react'
import axios from "axios";

export function UserDetail({ userInfo }: { userInfo: UserAPI }) {
    //get user from context
    const { user, userIsLoading } = useContext(userContext)
    const [displayName, setDisplayName] = useState(userInfo.displayName)
    const [email, setEmail] = useState(userInfo.email)
    const [ruts, setRuts] = useState(userInfo.ruts)
    const [rut, setRut] = useState("")
    function handleAddRut() {
        return () => {
            if (ruts.indexOf(rut) === -1) {
                setRuts(x => [...x, rut])
                setRut("")
            }
        }
    }
    function handleSaveChanges() {
        return async () => {
            const accessToken = user ? user.accessToken : '';
            const data = {
                displayName,
                email,
                ruts
            }
            const config = {
                headers: { Authorization: `Bearer ${accessToken}` }
            };
            const url = `https://us-central1-remind23451.cloudfunctions.net/api/users/${userInfo.uid}`
            try {
                const _resp = await axios.patch(url, data, config)
            } catch (e) {
                console.log(e)
            }
        }
    }
    return <Card
        direction={{ base: 'column', sm: 'row' }}
        overflow='hidden'
    >
        <Stack>
            {/**TODO: move inputs to formik + validation */}
            <HStack>
                <Text >email: </Text>
                <input value={email} onChange={(e) => { setEmail(e.target.value) }} />
            </HStack>
            <HStack>
                <Text >nombre: </Text>
                <input value={displayName} onChange={(e) => { setDisplayName(e.target.value) }} />
            </HStack>
            <HStack>
                <Text>Ruts:</Text>
                <input value={rut} onChange={(e) => { setRut(e.target.value) }} />
                <Button onClick={handleAddRut()}>add</Button>
            </HStack>
            {ruts.length < 1 ? <Text>No hay ruts</Text> :
                <ListRutsModifiable ruts={ruts} setRuts={setRuts} />}

            <Button
                variant='solid'
                colorScheme='purple'
                onClick={handleSaveChanges()}
            >
                Guardar Cambios
            </Button>
        </Stack>
    </Card>
}

interface ListRutsModifiableProps {
    ruts: Array<string>;
    setRuts: React.Dispatch<React.SetStateAction<string[]>>;
}

function ListRutsModifiable({ ruts, setRuts }: ListRutsModifiableProps) {
    return <UnorderedList>
        {ruts.map((rut) => (
            <ListItem key={rut}>
                <HStack>
                    <Text>{rut}</Text>
                    <Button>pen</Button>
                    <Button onClick={() => { setRuts(removeFromArray(ruts, rut)) }}>del</Button>
                </HStack>
            </ListItem>)
        )}
    </UnorderedList>
}
//delete element from array 
function removeFromArray<T>(array: Array<T>, element: T) {
    const index = array.indexOf(element);
    if (index > -1) {
        array.splice(index, 1);
    }
    return [...array];
}


