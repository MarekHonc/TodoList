import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";
import AuthService from '../../services/auth.service';

/**
 * Interface pro data z formuláře.
 */
interface FormData {
    name: string,
    userName: string,
    password: string,
    passwordConfirmation: string
}

/**
 * Formulář pro registraci uživatele.
 */
function RegisterComponent() {
    // Deklarace hook form pro práci s formulářem.
    const { register, watch, handleSubmit, formState: {errors}} = useForm<FormData>({ mode: "onChange" });

    // Pomocní proměnné pro UI.
    const [ registerFailed, setRegisterFailed ] = useState(false);
    const [ loading, setLoading ] = useState(false);

    // Navigační prvek.
    const navigate = useNavigate();

    // Akce, která se provede na odeslání formuláře.
    const onSubmit = handleSubmit(({name, userName, password, passwordConfirmation}) => {
        setLoading(true);

        AuthService.register({name, userName, password, passwordConfirmation}).then(
            () => {
                navigate("/loginRedirect");
            },
            error => {
                console.log(error);
                setRegisterFailed(true);
                setLoading(false);
            }
        )
    })

    return(
        <div className="min-h-screen">
            <div className="max-v-md w-full mx-auto mt-20">
                <div className="text-3xl font-bold text-gray-900 mt-2 text-center">Registrace</div>
                <div className="text-center font-medium text-xl">
                    <Link to="/login" className="text-blue-500 hover:text-blue-700">Přihlášení</Link>
                </div>
            </div>
            <div className={"transition duration-500 ease-in-out " + (loading ? "opacity-50" : "")}>
                <div className="max-w-md w-full mx-auto mt-4 bg-white p-8 border border-gray-300">
                    <form action="" className="space-y-6" onSubmit={onSubmit}>
                        <div>
                            <label htmlFor="name" className="text-sm font-bold text-gray-600 block">Jméno a příjmení</label>
                            <input
                                {...register("name", {
                                    required: true
                                })}
                                id="name"
                                name="name"
                                style={{ borderColor: errors.name ? "red" : "" }}
                                type="text" className="w-full p-2 border border-gray-300 rounded mt-1"
                                autoComplete="off"
                            />
                            <span className="text-sm text-red-500 mt-2 block">
                                {errors.name && errors.name.type === "required" && "Jméno a příjmení je povinný"}
                            </span>
                        </div>
                        <div>
                            <label htmlFor="userName" className="text-sm font-bold text-gray-600 block">Přihlašovací e-mail</label>
                            <input
                                {...register("userName", {
                                    required: true,
                                    pattern: /\S+@\S+\.\S+/,
                                })}
                                id="userName"
                                name="userName"
                                style={{ borderColor: errors.userName || registerFailed ? "red" : "" }}
                                type="text" className="w-full p-2 border border-gray-300 rounded mt-1"
                                autoComplete="off"
                            />
                            <span className="text-sm text-red-500 mt-2 block">
                                {errors.userName && errors.userName.type === "required" && "Přihlašovací e-mail je povinné"}
                                {errors.userName && errors.userName.type === "pattern" && "Přihlašovací e-mail není platná e-mailová adresa"}
                                {registerFailed && "Uživatel s tímto e-mailem již existuje."}
                            </span>
                        </div>
                        <div>
                            <label htmlFor="password" className="text-sm font-bold text-gray-600 block">Heslo</label>
                            <input 
                                {...register("password", {
                                    required: true,
                                    minLength: 6,
                                    pattern: /^[a-zA-Z0-9_.-]*$/
                                })}
                                id="password"
                                name="password"
                                style={{ borderColor: errors.password ? "red" : "" }}
                                type="password" className="w-full p-2 border border-gray-300 rounded mt-1"
                            />
                            <span className="text-sm text-red-500 mt-2 block">
                                {errors.password && errors.password.type === "required" && "Heslo je povinné"}
                                {errors.password && errors.password.type === "minLength" && "Heslo musí být minimálně 6 znaků dlouhé"}
                                {errors.password && errors.password.type === "pattern" && "Heslo může obsahovat pouze znaky: a-z, A-Z, 0-9, _, ."}
                            </span>
                        </div>
                        <div>
                            <label htmlFor="passwordConfirmation" className="text-sm font-bold text-gray-600 block">Potrzení hesla</label>
                            <input 
                                {...register("passwordConfirmation", {
                                    validate: value =>
                                        value === watch('password')
                                })}
                                id="passwordConfirmation"
                                name="passwordConfirmation"
                                style={{ borderColor: errors.password ? "red" : "" }}
                                type="password" className="w-full p-2 border border-gray-300 rounded mt-1"
                            />
                            <span className="text-sm text-red-500 mt-2 block">
                                {errors.passwordConfirmation && errors.passwordConfirmation.type === "validate" && "Hesla se neshodují"}
                            </span>
                        </div>
                        <div>
                            <button type="submit" className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded-md text-white text-sm">Registrovat</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default RegisterComponent;