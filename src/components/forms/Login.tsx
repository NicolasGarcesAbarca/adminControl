import { Formik, Form , FormikHelpers} from 'formik';
import { MyTextInput } from './CustomInputs';
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../firebase';
import { useNavigate } from 'react-router-dom'
import { useToast } from '@chakra-ui/react'

interface IValues {
    emailx: any;
    passwordx: any
}

interface IErrors {
    emailx: string;
    passwordx: string;
}

const validate = (values: IValues): any => {
    const errors: IErrors = {} as IErrors;

    if (!values.emailx) {
        errors.emailx = 'Debes ingresar mail';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.emailx)) {
        errors.emailx = 'Mail no valido';
    }
    if (!values.passwordx) {
        errors.passwordx = 'Debes ingresar password';
    } else if (values.passwordx.length < 6) {
        errors.passwordx = 'Password debe tener almenos 6 caracteres';
    }
    return errors;

};


export const Login = () => {
    const navigation = useNavigate()
    const toast = useToast()
    async function submitLogin(values: IValues, actions: FormikHelpers<IValues>): Promise<void> {
        const { emailx, passwordx } = values;
        try {
            const userCredential = await signInWithEmailAndPassword(auth, emailx, passwordx);
            actions.setSubmitting(false)
            //TODO insert toast
            console.log("credential signin in with email and password")
            console.log(userCredential)
            toast({
                title: 'Login existoso.',
                description: "Ahora puedes ingresar.",
                status: 'success',
                duration: 1000,
                isClosable: true,
            })
            navigation('/', { state: 1 })
        } catch (e) {
            //TODO insert toast error
            console.log(e)
        }
    }

    return (
        <Formik initialValues={{ emailx: '', passwordx: '' }}
            validate={validate}
            onSubmit={(values,actions) => {
                submitLogin(values, actions)
            }}
        >
            <Form>
                <MyTextInput
                    label="Email"
                    name="emailx"
                    type="email"
                    placeholder="jane@yahoo.com"
                />
                <MyTextInput
                    label="Password"
                    name="passwordx"
                    type="password"
                    placeholder="********"
                />
                <button className="button" type="submit">LogIn</button>
            </Form>
        </Formik>
    );


};