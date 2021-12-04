import { config } from "../config";
import { AxiosRequestHeaders } from "axios";
import defaultHeader from "./default.header";

/**
 * Vrací hlavičku s autorizací, pokud je uživatel přihlášen.
 * Pokud přihlášen není vrací prázdný objekt (aby stále šel vložit do hlavičky).
 */
export default function authHeader() {
    // Nejdříve zjsitím uživatele.
    const userStr = localStorage.getItem(config.userStorageKey);

    // Získal jsem uživatele.
    if(userStr){
        // Konvertuji na objekt.
        const user = JSON.parse(userStr);

        // Mám oba tokeny
        if(user.acessToken && user.refreshToken){
            var headers : AxiosRequestHeaders = { 
                ...defaultHeader,
                'Authorization': 'Bearer ' + user.acessToken,
                'x-refresh': user.refreshToken
            };

            return headers
        }
    }

    // Vracím prázný objekt.
    return defaultHeader;
}