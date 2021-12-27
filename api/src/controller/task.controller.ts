import { Request, Response } from 'express';
import { get } from 'lodash';
import log from '../logger';
import { createTask, findTask, findTasks, updateTask, deleteTask } from '../service/task.service';
import { getUserId } from '../utils/request.utils';

/**
 * Akce sloužící pro vytvoření nového úkolu.
 * @param req objekt http requestu.
 * @param res objekt http odpovědi.
 */
export async function createTaskHandler(req: Request, res: Response) {
    // Vytvořím nový úkol.
    const task = await createTask({ ...req.body, owner: getUserId(req) });
    
    // Vrátím nově vytvořený úkol.
    return res.send(task)
}

/**
 * Akce sloužící pro editaci úkolu.
 * @param req objekt http requestu.
 * @param res objekt http odpovědi.
 */
export async function updateTaskHandler(req: Request, res: Response) {
    // Vytvořím identifikátor - tj. user id a id úkolu.
    const identifier = {
        _id: getTaskId(req),
        owner: getUserId(req)
    };

    // Zkusím získat úkol.
    const task = await findTask(identifier);

    // Pokud jsem nic nedohledal.
    if(!task)
        return res.sendStatus(404);

    // Updatuji úkol.
    const newTask = await updateTask(identifier, req.body);

    // A vracím updatovaný úkol.
    return res.send(newTask);
}

/**
 * Akce sloužící pro získání všech úkolů.
 * @param req objekt http requestu.
 * @param res objekt http odpovědi.
 */
export async function getTasksHandler(req: Request, res: Response) {
    // Stáhnu všechy úkoly aktuálně přihlášeného uživatele.
    const categories = await findTasks({ owner: getUserId(req) });

    // A vrátím je.
    return res.send(categories);
}

/**
 * Akce sloužící pro získání konkrétního úkolu.
 * @param req objekt http requestu.
 * @param res objekt http odpovědi.
 */
export async function getTaskHandler(req: Request, res: Response) {
    // Vytvořím identifikátor - tj. user id a id úkolu.
    const identifier = {
        _id: getTaskId(req),
        owner: getUserId(req)
    };

    log.info(identifier);

    // Zkusím získat úkol.
    const task = await findTask(identifier);

    // Pokud jsem nic nedohledal.
    if(!task)
        return res.sendStatus(404);

    // Vrátím úkol.
    return res.send(task);
}

/**
 * Akce sloužící pro smazání úkolu.
 * @param req objekt http requestu.
 * @param res objekt http odpovědi.
 */
export async function deleteTaskHandler(req: Request, res: Response) {
    // Vytvořím identifikátor - tj. user id a id úkolu.
    const identifier = {
        _id: getTaskId(req),
        owner: getUserId(req)
    };

    // Zkusím získat úkol.
    const category = await findTask(identifier);

    // Pokud jsem nic nedohledal.
    if(!category)
        return res.sendStatus(404);

    // Smažu kategorii.
    await deleteTask(identifier);

    // Proběhlo śpěšně.
    return res.sendStatus(200);
}

/**
 * Vrací id kategorie z url parametrů.
 */
 const getTaskId = (req: Request) => {
    return get(req, "params.taskId");
};