import { Express, Request, Response } from 'express';
import { craeteUserHandler } from './controller/user.controller';
import { createUserSessionHandler } from './controller/session.controller';
import validateRequest from './middleware/validateRequest';
import { createUserSchema, createUserSessionSchema } from './schemas/user.schema';

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

    /**
     * Registrace akce pro odhlášení (mažu session).
     * DELETE /api/sessions
     */
}