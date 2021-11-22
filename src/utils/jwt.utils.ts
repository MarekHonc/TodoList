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

/**
 * Vrací dekódovaný token z předaného stringu.
 * @param token token, které se dokóduje.
 * @returns objekt s platností tokenu.
 */
export function decode(token: string) {
    try {
        // Ověřím platnost.
        const decoded = jwt.verify(token, privateKey);

        // A vrátím že token je platný, pokud by byl neplatný, byla by vyvolána výjimka.
        return { valid: true, expired: false, decoded };
    }
    catch(error: any) {
        // Token je neplatný a expirovat pouze pokud je kód chyby "jwt expired".
        return { valid: false, expired: error.message === "jwt expired", decoded: null };
    }
}