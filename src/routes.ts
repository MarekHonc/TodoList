import { Express, Request, Response } from 'express';
import { craeteUserHandler } from './controller/user.controller';
import validateRequest from './middleware/validateRequest';
import { createUserSchema } from './schemas/user.schema';

export default function(app: Express){

    /**
     * Echo - test komunikace vůči serveru.
     * GET /echo
     */
    app.get('/echo', (req: Request, res: Response) => res.send('OK'));

    /**
     * Registrace akce pro registraci.
     * POST /api/user
     */
    app.post('/api/users', validateRequest(createUserSchema), craeteUserHandler);

    /**
     * Registrace akce pro přihlášení (vytvářím session).
     * POST /api/session
     */

    /**
     * Registrace akce pro získání všech aktivních přihlášení.
     * GET /api/sessions
     */

    /**
     * Registrace akce pro odhlášení (mažu session).
     * DELETE /api/sessions
     */
}