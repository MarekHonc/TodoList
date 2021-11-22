import { FilterQuery, FlattenMaps, LeanDocument, UpdateQuery } from 'mongoose';
import config from 'config';
import { get } from 'lodash';
import Session, { SessionDocument } from '../model/session.model';
import { UserDocument } from '../model/user.model';
import { sign, decode } from '../utils/jwt.utils';
import { findUser } from '../service/user.service';

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
 * Updatuje již vytvořenou session.
 * @param query query, podle které vyhledá session k upravení.
 * @param update query, která session upravuje.
 */
export async function updateSession(query: FilterQuery<SessionDocument>, update: UpdateQuery<SessionDocument>) {
    return Session.updateOne(query, update);
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

/**
 * Fukce, která obnoví platnost tokenu.
 * @param param0 objekt s refresh tokenem.
 */
export async function reIssueAccesToken({
    refreshToken
} : {
    refreshToken: string
}) {
    // Dekóduji refresh token.
    const { decoded } = decode(refreshToken);

    // Pokud se nepodařilo refresh token dekódovat nebo na sobě nená _id, vracím false.
    if(!decoded || !get(decoded, "_id"))
        return false;

    // Získám si session.
    const session = await Session.findById(get(decoded, "_id"));

    // Zkontroluji platnost session.
    if(!session || !session?.valid)
        return false;

    // Získám uživatele.
    const user = await findUser({ _id: session.user });

    // Uživatel nebyl dohledán.
    if(!user)
        return false;

    // Vytvořím nový access token.
    const accessToken = createAccessToken({ user, session });

    // A vrátím ho.
    return accessToken;
}

/**
 * Vyhledá všechny sessions odpovídající dotazu.
 * @param query vyhledáváací query.
 * @returns sessions nalezeně podle query.
 */
export async function findSessions(query: FilterQuery<SessionDocument>) {
    return Session.find(query).lean();
}

/**
 * Vyhledá session v databázi.
 * @param query query, podle které se session hledá.
 * @returns nalezenou session.
 */
 export async function findSession(query: FilterQuery<SessionDocument>) {
    return Session.findOne(query).lean();
}