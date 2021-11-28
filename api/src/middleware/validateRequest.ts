import { AnySchema } from 'yup';
import { Request, Response, NextFunction } from 'express';
import log from '../logger';

/**
 * Middleware pro validaci requestů.
 * @param schema schéma, které se validuje.
 * @returns další akci, která má být v rámci "pipelina" provedena.
 */
const validate = (schema: AnySchema) => async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        await schema.validate({
            body: req.body,
            query: req.query,
            params: req.params
        });

        return next();
    }
    catch(error: any) {
        log.error(error);
        return res.status(409).send(error.errors);
    }
}

export default validate;