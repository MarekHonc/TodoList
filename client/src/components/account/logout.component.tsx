import { Link } from "react-router-dom";


/**
 * Komponenta pro přesměrování na login.
 */
function Logout() {
    // A vrátím korespondující hlášku.
    return (
        <div className="min-h-screen">
            <div className="max-v-md w-full mx-auto mt-20">
                <div className="text-4xl font-bold text-blue-600 mt-2 text-center mb-4">Odhlášení bylo úspěšné.</div>
                <div className="text-center font-medium text-xl">
                    Pro opětovné přihlášení klikněte <Link to="/login" className="text-blue-500 hover:text-blue-700">zde</Link>
                </div>
            </div>
        </div>
    )
}

export default Logout;