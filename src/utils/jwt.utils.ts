import jwt from 'jsonwebtoken';
import config from 'config';

/**
 * Privátní klíč pro tokeny.
 */
const privateKey = config.get('privateKey') as string;

/**
 * Podepíše jwt token.
 * @param object objekt, který se do tokenu vkládá.
 * @param options nastavení tokenu (např. expirace).
 * @returns podepsaný jwt token.
 */
export function sign(object: Object, options?: jwt.SignOptions | undefined) {
    return jwt.sign(object, privateKey, options);
}