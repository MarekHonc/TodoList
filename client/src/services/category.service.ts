import axios from 'axios';
import { config, routes } from '../config';
import authHeader from './auth.header';

/**
 * Rozharaní pro kategorii.
 */
export interface Category {
    name: string,
    description: string,
    color: string
}

export interface ExtendedCategory extends Category {
    _id : string
}

/**
 * Služba pro práci s kategoriemi.
 */
class CategoryService {
    /**
     * Funkce pro vytvoření kategorie.
     */
    create({
        name,
        description,
        color
    } : {
        name: string,
        description: string,
        color: string
    }) {
        return axios.post(config.apiUrl + routes.categories, {
            name,
            description,
            color
        }, {
            headers: authHeader()
        });
    }

    /**
     * Funkce pro upravení kategorie.
     */
    update({
        id,
        name,
        description,
        color
    } : {
        id: string
        name: string,
        description: string,
        color: string
    }) {
        return axios.put(config.apiUrl + routes.categories + "/" + id, {
            name,
            description,
            color
        }, {
            headers: authHeader()
        });
    }

    /**
     * Funkce, která vrací kategorii podle jejího id.
     */
    get(id: string) {
        return axios.get(config.apiUrl + routes.categories + "/" + id, {
            headers: authHeader()
        }).then(response => {
            return response.data;
        });
    }

    /**
     * Funkce, která vrací všechny vytvořené kategorie.
     */
    getAll() {
        return axios.get(config.apiUrl + routes.categories, {
            headers: authHeader()
        }).then(response => {
            return response.data;
        });
    }
}

export default new CategoryService();