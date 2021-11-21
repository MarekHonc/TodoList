import { FlattenMaps, LeanDocument } from 'mongoose';
import config from 'config';
import Session, { SessionDocument } from '../model/session.model';
import { UserDocument } from '../model/user.model';
import { sign } from '../utils/jwt.utils'

/**
 * Vytvoří novou session (přihlášení) pro uživatele.
 * @param userId id uživatele, pro kterého se session vytváří.
 * @param userAgent user agent, ze kterého se uživatel přihlašuje.
 */
export async function createSession(userId: string, userAgent: string){
    // Vytvořím session.
    const session = await Session.create({ user: userId, userAgent });

    // A vrátím ji.
    return session.toJSON();
}

/**
 * Vytvoří nový přístupový token.
 * @param param0 objekt s uživatelem a sesseion pro které se token vytváří.
 * @returns Vytvoření accessToken.
 */
export function createAccessToken({
    user,
    session
} : {
    user:
        | Omit<UserDocument, 'password'>
        | FlattenMaps<LeanDocument<Omit<UserDocument, 'password'>>>;
    session:
        | Omit<SessionDocument, 'password'>
        | FlattenMaps<LeanDocument<Omit<SessionDocument, 'password'>>>;
}) {
    // Vytvořím a podepíšu token.
    const accessToken = sign(
        { ...user, session: session._id },
        { expiresIn: config.get("accessTokenTtl") }
    );

    // Vrátím ho.
    return accessToken;
}