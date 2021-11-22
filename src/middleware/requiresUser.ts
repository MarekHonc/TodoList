import { get } from 'lodash';
import { Request, Response, NextFunction } from 'express';

/**
 * Middleware zajišťující načteného usera v aplikaci.
 * @param req objekt http requestu.
 * @param res objekt http odpovědi.
 * @param next další akce v "pipeline".
 * @returns status 403 pokud uživatel není dostupný, jinak další akci v "pipeline".
 */
const requiresUser = async(
    req: Request,
    res: Response,
    next: NextFunction
) => {
    // Získám uživatele.
    const user = get(req, "user");

    // Pokud jsem uživatele nenašel - vracím 403.
    if(!user)
        return res.sendStatus(403);

    // Uživatel je dostupný a v pořádku - vracím další akci.
    return next();
};

export default requiresUser;