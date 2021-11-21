import { validatePassword } from "../service/user.service";
import { Request, Response } from 'express';
import { createAccessToken, createSession } from "../service/session.service";
import config from 'config';
import { sign } from '../utils/jwt.utils'

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