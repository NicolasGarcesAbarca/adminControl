import { useContext, useState } from 'react'
import { Formik, Form, FormikHelpers } from 'formik';
import { MyTextInput, RutInput } from './CustomInputs';
import { userContext } from '../../hooks/user'
import axios from 'axios'
import { useToast } from '@chakra-ui/react';

interface IValues {
    displayName: string;
    email: string;
    password: string;
    password2: string;
    rut: string;
}

interface IErrors {
    displayName: string;
    email: string;
    password: string;
    password2: string;
    rut: string;
}


export const CreateUserForm = () => {
    //use state for list ruts management
    
    const [ruts, setRuts] = useState<Array<string>>([]);
    const toast = useToast();
    //get user from context
    const { user, userIsLoading } = useContext(userContext)
    //validate form function
    const validate = (values: IValues): any => {
        const errors: IErrors = {} as IErrors;

        if (!values.email) {
            errors.email = 'Debes ingresar mail';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
            errors.email = 'Mail no valido';
        }
        if (!values.password) {
            errors.password = 'Debes ingresar password';
        } else if (values.password.length < 6) {
            errors.password = 'Password debe tener almenos 6 caracteres';
        }
        if (!values.password2) {
            errors.password2 = 'Debes repetir password';
        } else if (values.password !== values.password2) {
            errors.password2 = 'Las password no coinciden';
        }
        if (!values.rut) {
            errors.rut = 'Debes ingresar rut';
        }
        return errors;

    };
    //function for create user through firebase cloud function
    async function createUser(values: IValues, actions: FormikHelpers<IValues>): Promise<void> {
        const { displayName, email, password} = values;
        const url = 'https://us-central1-remind23451.cloudfunctions.net/api/users'
        const accessToken = user ? user.accessToken : '';
        const data = { displayName, email, password ,ruts}
        const config = {
            headers: { Authorization: `Bearer ${accessToken}` }
        };

        try {
            const response = await axios.post(url, data, config);
            toast({
                title: 'Usuario Creado.',
                description: "Verifica en la lista.",
                status: 'success',
                duration: 3000,
                isClosable: true,
            })
        } catch (error) {
            console.error(error);
            toast({
                title: 'Error al crear usuario.',
                description: "Intente nuevamente.",
                status: 'error',
                duration: 3000,
                isClosable: true,
            })
        } finally {
            actions.setSubmitting(false)
        }
    }

    return (
        <Formik initialValues={{ email: '', password: '', password2: '', displayName: '', rut: '' }}
            validate={validate}
            onSubmit={(values, actions) => { createUser(values, actions) }}
        >
            <Form>
                <MyTextInput
                    label="Email"
                    name="email"
                    type="email"
                    placeholder="jane@safira.com"
                />
                <MyTextInput
                    label="Nombre"
                    name="displayName"
                    type="text"
                    placeholder="John Doe"
                />
                <MyTextInput
                    label="Password"
                    name="password"
                    type="password"
                    placeholder='********'
                />
                <MyTextInput
                    label="Repite password"
                    name="password2"
                    type="password"
                    placeholder='********'
                />
                <RutInput
                    label="Ingrese rut"
                    name="rut"
                    type="text"
                    ruts={ruts}
                    setruts={setRuts}
                />
                <button className="button" type="submit">Crear Usuario</button>
            </Form>
        </Formik>
    );


};