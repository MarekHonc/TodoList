import axios from 'axios';
import { priority, status } from '../code/constants';
import { config, routes } from '../config';
import authHeader from './auth.header';

/**
 * Rozharaní pro úkol.
 */
export interface Task {
    category: string;
    status: status;
    priority: priority;
    deadline: Date;
    name: string;
    description: string;
}

export interface ExtendedTask extends Task {
    _id : string
}

/**
 * Služba pro práci s úkoly.
 */
 class TasksService {
    /**
     * Funkce pro vytvoření úkolu.
     */
    create({
        name,
        description,
        deadline,
        status,
        priority,
        category
    } : {
        name: string,
        description: string,
        deadline: Date,
        status: status,
        priority: priority,
        category: string,
    }) {
        return axios.post(config.apiUrl + routes.tasks, {
            name,
            description,
            deadline,
            status,
            priority,
            category
        }, {
            headers: authHeader()
        });
    }

    /**
     * Funkce pro upravení úkolu.
     */
    update({
        id,
        name,
        description,
        deadline,
        status,
        priority,
        category
    } : {
        id: string
        name: string,
        description: string,
        deadline: Date,
        status: status,
        priority: priority,
        category: string,
    }) {
        return axios.put(config.apiUrl + routes.tasks + "/" + id, {
            name,
            description,
            deadline,
            status,
            priority,
            category
        }, {
            headers: authHeader()
        });
    }

    /**
     * Funkce, která vrací úkol podle jeho id.
     */
    get(id: string) {
        return axios.get(config.apiUrl + routes.tasks + "/" + id, {
            headers: authHeader()
        }).then(response => {
            return response.data;
        });
    }

    /**
     * Funkce, která vrací všechny vytvořené úkoly.
     */
    getAll() {
        return axios.get(config.apiUrl + routes.tasks, {
            headers: authHeader()
        }).then(response => {
            return response.data;
        });
    }

    /**
     * Funkce pro smazání konkrétního úkolu.
     */
    delete(id: string) {
        return axios.delete(config.apiUrl + routes.tasks + "/" + id, {
            headers: authHeader()
        });
    }
}

export default new TasksService();