import { Request } from "express";
import { get } from "lodash";

/**
 * Vrací id uživatele, který je aktuálně přihlášen.
 */
export function getUserId(req: Request) {
    return get(req.body, "user._id") || get(req, "user._id");;
}