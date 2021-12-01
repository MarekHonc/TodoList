import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

/**
 * Interface pro data z formuláře.
 */
interface FormData {
    userName: string,
    password: string,
    rememberMe: boolean
}

/**
 * Formulář pro přihlášení uživatele.
 */
function LoginComponent() {
    // Deklarace hook form pro práci s formulářem.
    const { register, handleSubmit, formState: {errors}} = useForm<FormData>({ mode: "onChange" });

    // Akce, která se provede na odeslání formuláře.
    const onSubmit = handleSubmit(({userName, password, rememberMe}) => {
        console.log("HEEEEJ");
    })

    return(
        <div className="min-h-screen">
            <div className="max-v-md w-full mx-auto mt-20">
                <div className="text-3xl font-bold text-gray-900 mt-2 text-center">Přihlášení</div>
                <div className="text-center font-medium text-xl">
                    <Link to="/register" className="text-blue-500 hover:text-blue-700">Registrace</Link>
                </div>
            </div>
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
                            style={{ borderColor: errors.userName ? "red" : "" }}
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
                            style={{ borderColor: errors.password ? "red" : "" }}
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
                        <button type="submit" className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded-md text-white text-sm">Přihlásit</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default LoginComponent;