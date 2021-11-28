import { DocumentDefinition, FilterQuery, UpdateQuery } from "mongoose";
import Task, { TaskDocument } from "../model/task.model";

/**
 * Vytvoří nový úkol.
 * @param input model s novým úkolem.
 */
export async function createTask(input: DocumentDefinition<TaskDocument>) {
    try {
        return await Task.create(input);
    }
    catch(error: any){
        throw new Error(error);
    }
}

/**
 * Updatuje již vytvořený úkol.
 * @param query query, podle které vyhledá úkol k upravení.
 * @param update query, která úkol upravuje.
 */
export async function updateTask(query: FilterQuery<TaskDocument>, update: UpdateQuery<TaskDocument>) {
    return Task.findOneAndUpdate(query, update, { new: true });
}

/**
 * Vyhledá úkol v databázi.
 * @param query query, podle které se úkol hledá.
 */
export async function findTask(query: FilterQuery<TaskDocument>) {
    return Task.findOne(query).lean();
}

/**
 * Stáhne všechny úkoly podle předané query.
 * @param query podle které se data stahují.
 */
export async function findTasks(query: FilterQuery<TaskDocument>) {
    return Task.find(query).lean();
}

/**
 * Smaže úkol podle předané query.
 * @param query podle které se konktrétní úkol smaže.
 */
export function deleteTask(query: FilterQuery<TaskDocument>) {
    return Task.deleteOne(query);
}

/**
 * Smaže úkoly podle předané query.
 * @param query podle které se úkoly smažou.
 */
 export function deleteTasks(query: FilterQuery<TaskDocument>) {
    return Task.deleteMany(query);
}