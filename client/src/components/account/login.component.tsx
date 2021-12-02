import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import AuthService from "../../services/auth.service";
import { useState } from "react";

/**
 * Interface pro data z formuláře.
 */
interface FormData {
    userName: string,
    password: string,
    rememberMe: boolean
}

/**
 * Interface pro předané prvky této komponentě.
 */
interface Props {
    setAutheticated: (authenticated: boolean) => void;
}

/**
 * Formulář pro přihlášení uživatele.
 */
function LoginComponent(props : Props) {
    // Deklarace hook form pro práci s formulářem.
    const { register, handleSubmit, formState: {errors}} = useForm<FormData>({ mode: "onChange" });

    // Navigační prvek.
    const navigate = useNavigate();

    // Pomocní proměnné pro UI.
    const [ loginFailed, setLoginFailed ] = useState(false);
    const [ loading, setLoading ] = useState(false);

    // Akce, která se provede na odeslání formuláře.
    const onSubmit = handleSubmit(({userName, password, rememberMe}) => {
        setLoading(true);

        AuthService.logIn({userName, password}).then(
            () => {
                // Nastavím že je uživatel ověřený.
                props.setAutheticated(true);

                // Přesměruji na domovskou stránku.
                navigate("/");
            },
            error => {
                setLoginFailed(true);
                setLoading(false);
            }
        )
    })

    return(
        <div className="min-h-screen">
            <div className="max-v-md w-full mx-auto mt-20">
                <div className="text-3xl font-bold text-gray-900 mt-2 text-center">Přihlášení</div>
                <div className="text-center font-medium text-xl">
                    <Link to="/register" className="text-blue-500 hover:text-blue-700">Registrace</Link>
                </div>
            </div>
            <div className={"transition duration-500 ease-in-out " + (loading ? "opacity-50" : "")}>
                <div className="max-w-md w-full mx-auto mt-4 bg-white p-8 border border-gray-300">
                    <form action="" className="space-y-6" onSubmit={onSubmit}>
                        <div>
                            <label htmlFor="userName" className="text-sm font-bold text-gray-600 block">Přihlašovací e-mail</label>
                            <input
                                {...register("userName", {
                                    required: true,
                                    pattern: /\S+@\S+\.\S+/,
                                })}
                                id="userName"
                                name="userName"
                                style={{ borderColor: errors.userName || loginFailed ? "red" : "" }}
                                type="text" className="w-full p-2 border border-gray-300 rounded mt-1"
                                autoComplete="off"
                            />
                            <span className="text-sm text-red-500 mt-2 block">
                                {errors.userName && errors.userName.type === "required" && "Přihlašovací e-mail je povinný"}
                                {errors.userName && errors.userName.type === "pattern" && "Přihlašovací e-mail není platná e-mailová adresa"}
                            </span>
                        </div>
                        <div>
                            <label htmlFor="password" className="text-sm font-bold text-gray-600 block">Heslo</label>
                            <input 
                                {...register("password", {
                                    required: true
                                })}
                                id="password"
                                name="password"
                                style={{ borderColor: errors.password || loginFailed ? "red" : "" }}
                                type="password" className="w-full p-2 border border-gray-300 rounded mt-1"
                            />
                            <span className="text-sm text-red-500 mt-2 block">
                                {errors.password && errors.password.type === "required" && "Heslo je povinné"}
                            </span>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    {...register("rememberMe")}
                                    id="rememberMe"
                                    name="rememberMe"
                                    type="checkbox" className="h-4 w-4 rounded"
                                />
                                <label htmlFor="rememberMe" className="ml-2 text-sm text-gray-600">Pamatovat si mě</label>
                            </div>
                        </div>
                        <div>
                            <span className="text-sm text-red-500 mt-2 block">
                                { loginFailed && "Zadaný přihlašovací e-mail nebo heslo není správné" }
                            </span>
                        </div>
                        <div>
                            <button type="submit" className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded-md text-white text-sm">Přihlásit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default LoginComponent;