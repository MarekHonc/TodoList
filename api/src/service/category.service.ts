import { DocumentDefinition, FilterQuery, UpdateQuery } from "mongoose";
import Category, { CategoryDocument } from "../model/category.model";

/**
 * Vytvoří novou kategorii úkolů.
 * @param input model s novou kategorií.
 */
export async function createCategory(input: DocumentDefinition<CategoryDocument>) {
    try {
        return await Category.create(input);
    }
    catch(error: any){
        throw new Error(error);
    }
}

/**
 * Updatuje již vytvořenou kategorii.
 * @param query query, podle které vyhledá kategorie k upravení.
 * @param update query, která kategorii upravuje.
 */
export async function updateCategory(query: FilterQuery<CategoryDocument>, update: UpdateQuery<CategoryDocument>) {
    return Category.findOneAndUpdate(query, update, { new: true });
}

/**
 * Vyhledá kategorii v databázi.
 * @param query query, podle které se kategorie hledá.
 */
export async function findCategory(query: FilterQuery<CategoryDocument>) {
    return Category.findOne(query).lean();
}

/**
 * Stáhne všechny kategorie podle předané query.
 * @param query podle které se data stahují.
 */
export async function findCategories(query: FilterQuery<CategoryDocument>) {
    return Category.find(query).lean();
}

/**
 * Smaže kategorii podle předané query.
 * @param query podle které se konktrétní kategorie smaže.
 */
export function deleteCategory(query: FilterQuery<CategoryDocument>) {
    return Category.deleteOne(query);
}