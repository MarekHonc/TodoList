import { object, string, ref } from 'yup';

/**
 * Schéma pro validaci vytvoření uživatele.
 */
export const createUserSchema = object({
    body: object({
        name: string().required('Name is required'),
        password: string()
            .required('Password is required')
            .min(6, 'Password is to short - should be 6 chars minimum.')
            .matches(/^[a-zA-Z0-9_.-]*$/, 'Password can only contain Latin lettes'),
        passwordConfirmation: string().oneOf(
            [ref('password'), null],
            'Passwords must match'
        ),
        email: string()
            .email('Must be a valid email')
            .required('Email is required')
    })
});

/**
 * Schéma pro validaci přihlášení.
 */
export const createUserSessionSchema = object({
    body: object({
        password: string()
            .required('Password is required')
            .min(6, 'Password is to short - should be 6 chars minimum.')
            .matches(/^[a-zA-Z0-9_.-]*$/, 'Password can only contain Latin lettes'),
        email: string()
            .email('Must be a valid email')
            .required('Email is required')
    })
});