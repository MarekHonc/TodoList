import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthService from "../services/auth.service";

/**
 * Předávané prvky navigaci.
 */
interface NavbarProps {
    userName: string,
    selectedPage: string,
    setOverlay: (value: boolean) => void,
    setAuthenticated: (value: boolean) => void
}

function Navigation(props: NavbarProps) {
    // CSS pro stylování navigace.
    // Vybraný prvek.
    const selected = "py-4 px-2 text-blue-500 border-b-4 border-blue-500 font-semibold";
    const mobileSelected = "bg-blue-700 md:bg-transparent text-white block pl-3 pr-4 py-2 md:text-blue-700 md:p-0 rounded";

    // Prvek k vybrání.
    const notSelected = "py-4 px-2 text-gray-500 font-semibold hover:text-blue-500 transition duration-300";
    const monileNotSelected = "text-gray-700 hover:bg-gray-50 border-b border-gray-100 md:hover:bg-transparent md:border-0 block pl-3 pr-4 py-2 md:hover:text-blue-700 md:p-0";

    // Dynamické přepíná stránek.
    const [ currentPage, setCurrentPage ] = useState(props.selectedPage);

    // Mobilní meny
    const [ mobileHidden, setMobileHidden ] = useState(true);

    // Navigační prvek.
    const navigate = useNavigate();

    // Handler pro logout
    const handleLogout = function() {
        // Řeknu aplikace že proběhlo odhlášení.
        props.setAuthenticated(false);

        // Uživatele odhlásím.
        AuthService.logOut().then(() => {
            // Přesměruji na odhlášení.
            navigate("/logout");
        });
    }

    return(
		<nav className="bg-white shadow-lg z-10">
			<div className="max-w-6xl mx-auto px-4">
				<div className="flex justify-between">
					<div className="flex space-x-7">
						<div>
							<Link to="/" className="flex items-center py-4 px-2" onClick={() => setCurrentPage("/")}>
								<span className="font-semibold text-gray-500 text-lg">Úkolníček</span>
							</Link>
						</div>
						<div className="hidden md:flex items-center space-x-1">                            
							<Link to="/" className={(currentPage === "/" || currentPage !== "/categories" ) ? selected : notSelected} onClick={() => setCurrentPage("/")}>Úkoly</Link>
							<Link to="/categories" className={currentPage === "/categories" ? selected : notSelected} onClick={() => setCurrentPage("/categories")}>Kategorie</Link>
						</div>
					</div>
					<div className="hidden md:flex items-center space-x-3 ">
                        <span>{props.userName} <span 
                                className="font-medium text-blue-500 hover:text-blue-700 hover:underline cursor-pointer"
                                onClick={() => handleLogout()}>
                                (Odhlásit)
                        </span></span>
					</div>
					<div className="md:hidden flex items-center">
						<button 
                            className="outline-none mobile-menu-button"
                            onClick={() => {
                                setMobileHidden(!mobileHidden)
                                 props.setOverlay(mobileHidden)
                            }}
                        >
						<svg className=" w-6 h-6 text-gray-500 hover:text-blue-500 "
							x-show="!showMenu"
							fill="none"
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							viewBox="0 0 24 24"
							stroke="currentColor">
							<path d="M4 6h16M4 12h16M4 18h16"></path>
						</svg>
					</button>
					</div>
				</div>
			</div>
            <div className={"transition duration-500 md:hidden w-full md:items-center md:w-auto bg-white shadow-lg absolute z-10 " + (mobileHidden ? "hidden" : "")}>
                <ul className="flex-col md:flex-row flex md:space-x-8 md:mt-0 md:text-sm md:font-medium p-4">
                    <li className="py-1">
                        <Link to="/" className={(currentPage === "/" || currentPage !== "/categories") ? mobileSelected : monileNotSelected} onClick={() => setCurrentPage("/")}>Úkoly</Link>	
                    </li>
                    <li className="py-1">
                        <Link to="/categories" className={currentPage === "/categories" ? mobileSelected : monileNotSelected} onClick={() => setCurrentPage("/categories")}>Kategorie</Link>
                    </li>
                </ul>
            </div>
		</nav>
    )
}

export default Navigation;