import { useField } from 'formik';

interface MyTextInputProps {
    label: string;
    name: string;
    type: string;
    placeholder: string;
}
type MyTextInput=(props: MyTextInputProps) => JSX.Element

export const MyTextInput:MyTextInput = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
        <div className='MyTextInput__container'>
            <label className='MyTextInput__label' htmlFor={props.name}>{label}</label>
            <input className="MyTextInput__input" {...field} {...props} />
            {meta.touched && meta.error ? (
                <p className="MyTextInput__error">{meta.error}</p>
            ) : null}
        </div>
    );
};

interface MyCheckboxProps {
    children: React.ReactNode;
    name: string;
}
type TMyCheckbox=(props: MyCheckboxProps) => JSX.Element

export const MyCheckbox:TMyCheckbox = ({ children, ...props }) => {
    const [field, meta] = useField({ ...props, type: 'checkbox' });
    return (
        <div>
            <label className="checkbox-input">
                <input type="checkbox" {...field} {...props} />
                {children}
            </label>
            {meta.touched && meta.error ? (
                <div className="error">{meta.error}</div>
            ) : null}
        </div>
    );
};


interface MySelectProps {
    label: string;
    name: string;
    options: string[];
}
type TMySelect=(props: MySelectProps) => JSX.Element
export const MySelect:TMySelect = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
        <div>
            <label htmlFor={props.name}>{label}</label>
            <select {...field} {...props} />
            {meta.touched && meta.error ? (
                <div className="error">{meta.error}</div>
            ) : null}
        </div>
    );
};
interface RutInputProps {
    label: string;
    name: string;
    type: string;
    ruts: string[];
    setruts: React.Dispatch<React.SetStateAction<string[]>>;
}

type TRutInput=(props: RutInputProps) => JSX.Element
export const RutInput:TRutInput = ({ label, ...props }) => {
    const { name, type, ruts, setruts } = props
    const [field, meta] = useField({ name, type });
    const { value, onBlur, onChange } = field;

    function handleClick() {
        return () => {
            setruts(x => [...x, value])
            onChange({ target: { name, value: ' ' } })
        }
    }

    return (
        <div className='MyTextInput__container'>
            <label className='MyTextInput__label' htmlFor={ props.name}>{label}</label>
            <div>
                <input
                    className="MyTextInput__input"
                    value={value}
                    onBlur={onBlur}
                    onChange={onChange}
                    type={type}
                    name={name}
                />
                <button className="MyTextInput__button" type='button' onClick={handleClick()}>+</button>
            </div>
            {meta.touched && meta.error ? (
                <p className="MyTextInput__error">{meta.error}</p>
            ) : null}
            <ul>
                {ruts.map((rut, index) => <li key={index}>{rut}</li>)}
            </ul>
        </div>
    );
};
