import { object, string, number } from 'yup';

/**
 * Validace pro tělo requestu.
 */
const requestBody = {
    body: object({
        name: string().required('Name is required'),
        description: string(),
        color: string().required('Color is required').matches(/^#(?:[0-9a-fA-F]{3}){1,2}$/, 'Wrong color code')
    })
};

/**
 * Validace parametrů v url adrese.
 */
const urlParams = {
    params: object({
        categoryId: string().required('CategoryId is required')
    })
}

/**
 * Schéma pro validaci vytvoření kategorie.
 */
export const createCategorySchema = object({
    ...requestBody
})

/**
 * Schéma pro validaci editace kategorie.
 */
export const updateCategorySchema = object({
    ...urlParams,
    ...requestBody
})

/**
 * Schéma pro validaci smazání kategorie.
 */
export const deleteCategorySchema = object({
    ...urlParams
})

/**
 * Schéma pro validaci stažení konkrétní kategorie.
 */
export const getCategorySchema = object({
    ...urlParams
})