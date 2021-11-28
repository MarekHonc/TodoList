import { object, string, date, number, mixed } from 'yup';
import { status, priority } from '../utils/constants'; 

/**
 * Validace pro tělo requestu.
 */
const requestBody = {
    body: object({
        name: string().required('Name is required'),
        description: string(),
        category: number().required("Category is required"),
        status: string().required("Status is required").oneOf(Object.keys(status)),
        priority: string().required("Priority is required").oneOf(Object.keys(priority)),
        deadline: date().required("Deadline is required").min(new Date()),
    })
};

/**
 * Validace parametrů v url adrese.
 */
const urlParams = {
    params: object({
        categoryId: number().required('TaskId is required')
    })
}

/**
 * Schéma pro validaci vytvoření úkolu.
 */
export const createTaskSchema = object({
    ...requestBody
})

/**
 * Schéma pro validaci editace úkolu.
 */
export const updateTaskSchema = object({
    ...urlParams,
    ...requestBody
})

/**
 * Schéma pro validaci smazání úkolu.
 */
export const deleteTaskSchema = object({
    ...urlParams
})

/**
 * Schéma pro validaci stažení konkrétního úkolu.
 */
export const getTaskSchema = object({
    ...urlParams
})