import { Link } from "react-router-dom";

/**
 * Komponenta pro přesměrování na login.
 */
function LoginRedirect() {
    return (
        <div className="min-h-screen">
            <div className="max-v-md w-full mx-auto mt-20">
                <div className="text-4xl font-bold text-blue-600 mt-2 text-center mb-4">Registrace proběhla úspěšně.</div>
                <div className="text-center font-medium text-xl">
                    Pro přihlášení klikněte <Link to="/login" className="text-blue-500 hover:text-blue-700">zde</Link>
                </div>
            </div>
        </div>
    )
}

export default LoginRedirect;