import { Request, Response } from "express";
import { omit } from 'lodash';
import { createUser } from "../service/user.service";
import log from '../logger'

/**
 * Akce sloužící pro obstarání vytvoření uživatele.
 * @param req objekt http requestu.
 * @param res objekt http odpovědi.
 */
export async function craeteUserHandler(req: Request, res: Response) {
    try {
        const user = await createUser(req.body);

        // Vracím objekt uživatele, ale bez hesla.
        return res.send(omit(user.toJSON(), "password"));
    }
    catch(e: any) {
        log.error(e);
        return res.status(409).send(e.message);
    }
}