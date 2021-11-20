import { Express, Request, Response } from 'express';

export default function(app: Express){

    /**
     * Echo - test komunikace vůči serveru.
     */
    app.get('/echo', (req: Request, res: Response) => res.send('OK'));
}