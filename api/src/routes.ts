import { Express, Request, Response } from 'express';
import { validateRequest, requiresUser } from './middleware';

import { craeteUserHandler } from './controller/user.controller';
import { createUserSessionHandler, invalidateUserSessionHandler, getUserSessionsHandler } from './controller/session.controller';
import { createCategoryHandler, updateCategoryHandler, deleteCategoryHandler, getCategoriesHandler, getCategoryHandler } from './controller/category.controller';
import { createTaskHandler, updateTaskHandler, deleteTaskHandler, getTasksHandler, getTaskHandler } from './controller/task.controller';

import { createUserSchema, createUserSessionSchema } from './schemas/user.schema';
import { createCategorySchema, updateCategorySchema, deleteCategorySchema, getCategorySchema } from './schemas/category.schema';
import { createTaskSchema, updateTaskSchema, deleteTaskSchema, getTaskSchema } from './schemas/task.schema';

export default function(app: Express){

    /**
     * Echo - test komunikace vůči serveru.
     * GET /echo
     */
    app.get('/echo', (req: Request, res: Response) => res.send('OK'));

    /**
     * Registrace akce pro registraci.
     * POST /api/users
     */
    app.post('/api/users', validateRequest(createUserSchema), craeteUserHandler);

    /**
     * Registrace akce pro přihlášení (vytvářím session).
     * POST /api/sessions
     */
    app.post('/api/sessions', validateRequest(createUserSessionSchema), createUserSessionHandler);

    /**
     * Registrace akce pro získání všech aktivních přihlášení.
     * GET /api/sessions
     */
    app.get('/api/sessions', requiresUser, getUserSessionsHandler)

    /**
     * Registrace akce pro odhlášení (mažu session).
     * DELETE /api/sessions
     */
    app.delete('/api/sessions', requiresUser, invalidateUserSessionHandler);

    /**
     * Registrace akce pro vytvoření kategorie.
     * POST /api/categories
     */
    app.post('/api/categories', [requiresUser, validateRequest(createCategorySchema)], createCategoryHandler);

    /**
     * Registrace akce pro upravní kategorie.
     * PUT /api/categories/:categoryId
     */
    app.put('/api/categories/:categoryId', [requiresUser, validateRequest(updateCategorySchema)], updateCategoryHandler);

     /**
      * Registrace akce pro získání všech kategorií.
      * GET /api/categories
      */
    app.get('/api/categories', requiresUser, getCategoriesHandler);

     /**
      * Registrace akce pro získání konkrétní kategorie.
      * GET /api/categories/:categoryId
      */
    app.get('/api/categories/:categoryId', [requiresUser, validateRequest(getCategorySchema)], getCategoryHandler);

      /**
       * Registrace akce pro smazání kategorie.
       * DELETE /api/categories/:categoryId
       */
    app.delete('/api/categories/:categoryId', [requiresUser, validateRequest(deleteCategorySchema)], deleteCategoryHandler);

    /**
     * Registrace akce pro vytvoření úkolu.
     * POST /api/tasks
     */
    app.post('/api/tasks', [requiresUser, validateRequest(createTaskSchema)], createTaskHandler);

    /**
     * Registrace akce pro upravní úkolu.
     * PUT /api/tasks/:taskId
     */
    app.put('/api/tasks/:taskId', [requiresUser, validateRequest(updateTaskSchema)], updateTaskHandler);
     
    /**
     * Registrace akce pro získání všech úkolů.
     * GET /api/tasks
     */
    app.get('/api/alltasks/:onlyDone', requiresUser, getTasksHandler);
     
    /**
     * Registrace akce pro získání konkrétního úkolu.
     * GET /api/tasks/:taskId
     */
    app.get('/api/tasks/:taskId', [requiresUser, validateRequest(getTaskSchema)], getTaskHandler);
     
    /**
     * Registrace akce pro smazání kategorie.
     * DELETE /api/tasks/:taskId
     */
    app.delete('/api/tasks/:taskId', [requiresUser, validateRequest(deleteTaskSchema)], deleteTaskHandler);
}