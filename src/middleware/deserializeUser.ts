import { get } from 'lodash';
import { Request, Response, NextFunction } from 'express';
import { decode } from '../utils/jwt.utils';
import { findSession, reIssueAccesToken } from '../service/session.service';

/**
 * Pokusí se získat uživatele na zákaldně přihlašovacíh tokenů.
 * @param req objekt http requestu.
 * @param res objekt http odpovědi.
 * @param next další akce, která má být v rámci "pipelina" provedena.
 */
const deserializeUser = async (req: Request, res: Response, next: NextFunction) => {
    // Získám si acces token.
    const accessToken = get(req, "headers.authorization", "").replace(/^Bearer\s/, "");

    // Získám i refresh token.
    const refreshToken = get(req, "headers.x-refresh");

    // Pokud se nepodařil získat - vracím rovnou další akci.
    if(!accessToken)
        return next();

    // Dekóduji token.
    const { decoded, expired } = decode(accessToken);

    // Pokud se podařilo dekódovat.
    if(decoded) {
        // Získám ještě session
        const session = await findSession({ _id: get(decoded, "session") });

        // Nastavím do kontextu requestu uživatele - pouze pokud je session stále platná.
        if(session && session.valid) {
            // @ts-ignore
            req.user = decoded;
        }

        // Vracím další akci.
        return next();
    }

    // Refresh logika.
    // Pokud mám refresh token a acces token mi expiroval.
    if(expired && refreshToken) {
        // Vytvořím si nový access token.
        const newAccessToken = await reIssueAccesToken({ refreshToken });

        // Nový token je úspěšně vytvořen.
        if(newAccessToken) {
            // Přidám ho do headerů.
            res.setHeader("x-access-token", newAccessToken);

            // Nový token dekóduji a usera přidám opět do kontextu requestu.
            const { decoded } = decode(newAccessToken);
            // @ts-ignore
            req.user = decoded;
        }

        // Vracím další akci.
        return next();
    }


    // Vracím další akci.
    return next();
}

export default deserializeUser;