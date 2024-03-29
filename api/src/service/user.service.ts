import { omit } from 'lodash';
import { DocumentDefinition, FilterQuery } from 'mongoose';
import User, {UserDocument} from '../model/user.model';

/**
 * Vytvoří nového uživatele aplikace.
 * @param input model reprezerntující uživatele.
 */
export async function createUser(input: DocumentDefinition<UserDocument>) {
    try {
        return await User.create(input);
    }
    catch (error: any) {
        throw new Error(error);
    }
}

/**
 * Vyhledá uživatele v databázi.
 * @param query query, podle které se uživatel hledá.
 * @returns nalezeného uživatele.
 */
export async function findUser(query: FilterQuery<UserDocument>) {
    return User.findOne(query).lean();
}

/**
 * Vrací, zda-li se podařilo uživateli zadat správné heslo.
 * @param param0 objekt s emailem a heslem {email, password }.
 * @returns zda-li se heslo shoduje s uloženým.
 */
export async function validatePassword({
    email,
    password
}: {
    email: UserDocument["email"],
    password: string
}) {
    const user = await User.findOne({ email });

    // Pokud jsem uživatele nenašel - nepovedlo se mu ověřit.
    if(!user)
        return false;

    // Zkonrtoluji heslo.
    const isValid = await user.comparePassword(password);

    // Špadné heslo - nepovedlo se mu ověřit.
    if(!isValid)
        return false;

    // Přihlášení je OK - vracím objekt uživatele opět bez hesla.
    return omit(user.toJSON(), "password");
}