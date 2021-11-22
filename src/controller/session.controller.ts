import { validatePassword } from "../service/user.service";
import { Request, Response } from 'express';
import { createAccessToken, createSession, updateSession, findSessions } from "../service/session.service";
import config from 'config';
import { get } from 'lodash';
import { sign } from '../utils/jwt.utils';

/**
 * Akce sloužící pro přihlášení uživatele (vytvoří session).
 * @param req objekt http requestu.
 * @param res objekt http odpovědi.
 */
 export async function createUserSessionHandler(req: Request, res: Response) {
    // Validace přihlášení.
    const user = await validatePassword(req.body);

    // Pokud se nezdařila (metoda vrátila false).
    if(!user){
        // Vracím 401 - unauhthorized.
        return res.status(401).send('Invalid username or password');
    }

    // Vytvořím session (přihlášení).
    const session = await createSession(String(user._id), req.get("user-agent") || "");

    // Vytvořím access token.
    const accessToken = createAccessToken({ user, session });

    // Vytvořím i refresh token.
    const refreshToken = sign(session, { expiresIn: config.get('refreshTokenTtl') });

    // A vrátím vytvořené tokeny.
    return res.send({ accessToken, refreshToken });
}

/**
 * Akce sloužící pro odhlášení uživatele (zneplatní session).
 * @param req objekt http requestu.
 * @param res objekt http odpovědi.
 */
export async function invalidateUserSessionHandler(req: Request, res: Response) {
    // Získám id session z requestu.
    const sessionId = get(req, "user.session");

    // Updatuji session.
    await updateSession({ _id: sessionId }, { valid: false });

    // Vše proběhlo ok.
    return res.sendStatus(200);
}

/**
 * Akce sloužící pro získání všech aktivních přihlášení uživatele.
 * @param req objekt http requestu.
 * @param res objekt http odpovědi.
 */
export async function getUserSessionsHandler(req: Request, res: Response) {
    // Získám is uživatele z requestu.
    const userId = get(req, "user._id");

    // Najdu všechny jeho přihlášení.
    const sessions = await findSessions({ user: userId, valid: true });

    // A vrátím je.
    return res.send(sessions);
}