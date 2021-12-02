import axios from 'axios';
import { config, routes } from '../config';
import authHeader from './auth.header';
import defaultHeader from './default.header';

/**
 * Služba pro autorizaci pomocí JWT vůči Api.
 */
class AuthService {
    /**
     * Funkce pro přihlášení uživatele.
     * @param userName uživatelské jméno.
     * @param password heslo.
     */
    logIn({
        userName,
        password
    }:{
        userName: string,
        password: string
    }) {
        return axios
            .post(config.apiUrl + routes.sessions, {
                email: userName,
                password
            }, defaultHeader)
            .then(response => {
                // 200 - přihlášení proběhlo úspěšně.
                if(response.status == 200){
                    // Uložím token do storage.
                    localStorage.setItem(
                        config.userStorageKey,
                        JSON.stringify({
                            userName,
                            acessToken: response.data.acessToken,
                            refreshToken: response.data.refreshToken
                        })
                    );

                    console.log("saved");
                }
                
                // Vracím odpověď serveru.
                return response.data;
            });
    }

    /**
     * Funkce pro odhlášení uživatele.
     */
    async logOut() {
        // Odeberu klíče z lokální storage.
        localStorage.removeItem(config.userStorageKey);

        // A smažu odhlášení i ze serveru.
        return axios
            .delete(config.apiUrl + routes.sessions, {
                headers: authHeader()
            })
    }

    /**
     * Funkce pro registraci uživatele.
     */
    async register({
        name,
        userName,
        password,
        passwordConfirmation
    } : {
        name: string,
        userName: string,
        password: string,
        passwordConfirmation: string
    }) {
        return axios
            .post(config.apiUrl + routes.users, {
                name,
                email: userName,
                password,
                passwordConfirmation
            });
    }

    /**
     * Funkce pro získání aktuálně přihlášeného uživatele.
     */
    getCurrentUser() {
        const user = localStorage.getItem(config.userStorageKey);

        // Pokud je někdo přihlášený -> vracím objekt uživatele.
        if(user)
            return JSON.parse(user);

        return null;
    }

    /**
     * Vrací, zda-li je uživatel přihlášen.
     */
    isLogged() {
        return this.getCurrentUser() != null;
    }
}

export default new AuthService();