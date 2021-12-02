import { Link } from 'react-router-dom';

/**
 * Komponent pro error 404.
 */
function NotFound() {
    return (
        <div className="flex items-center justify-center w-screen h-screen">
            <div className="px-4 lg:pb-12">
                <div className="lg:gap-4 lg:flex">
                    <div className="flex flex-col items-center justify-center md:pb-24 lg:pb-32">
                        <h1 className="font-bold text-blue-600 text-9xl">404</h1>
                        <p className="mb-2 text-2xl font-bold text-center text-gray-800 md:text-3xl">
                        <span className="text-red-500">Oops!</span> Stránka nebyla nalezena</p>
                        <p className="mb-8 text-center text-gray-500 md:text-lg">
                            Stránka, kterou hledáte neexistuje
                        </p>
                        <Link to="/" className="px-6 py-2 text-sm font-semibold text-blue-800 bg-blue-100">Domovská stránka</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NotFound;