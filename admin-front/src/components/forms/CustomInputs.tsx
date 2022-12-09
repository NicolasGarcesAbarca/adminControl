import { useField } from 'formik';

export const MyTextInput = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
        <div className='MyTextInput__container'>
            <label className='MyTextInput__label' htmlFor={props.id || props.name}>{label}</label>
            <input className="MyTextInput__input" {...field} {...props} />
            {meta.touched && meta.error ? (
                <p className="MyTextInput__error">{meta.error}</p>
            ) : null}
        </div>
    );
};



export const MyCheckbox = ({ children, ...props }) => {
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



export const MySelect = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
        <div>
            <label htmlFor={props.id || props.name}>{label}</label>
            <select {...field} {...props} />
            {meta.touched && meta.error ? (
                <div className="error">{meta.error}</div>
            ) : null}
        </div>
    );
};

// export const PasswordInput = ({ label, ...props }) => {
//     const [field, meta] = useField(props);
//     return (
//         <div className='MyTextInput__container'>
//             <label className='MyTextInput__label' htmlFor={props.id || props.name}>{label}</label>
//             <input className="form__text-input" {...field} {...props} />
//             {meta.touched && meta.error ? (
//                 <p className="MyTextInput__error">{meta.error}</p>
//             ) : null}
//         </div>
//     );
// };