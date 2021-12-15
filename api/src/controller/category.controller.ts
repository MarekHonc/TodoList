import { Request, Response } from 'express';
import { get } from 'lodash';
import { createCategory, findCategory, findCategories, updateCategory, deleteCategory } from '../service/category.service';
import { deleteTasks } from '../service/task.service';
import { getUserId } from '../utils/request.utils';

/**
 * Akce sloužící pro vytvoření nové kategorie úkolů.
 * @param req objekt http requestu.
 * @param res objekt http odpovědi.
 */
export async function createCategoryHandler(req: Request, res: Response) {
    // Vytvořím novou kategorii.
    const category = await createCategory({ ...req.body, owner: getUserId(req) });
    
    // Vrátím nově vytvořenou kategorii.
    return res.send(category)
}

/**
 * Akce sloužící pro editaci kategorie úkolů.
 * @param req objekt http requestu.
 * @param res objekt http odpovědi.
 */
export async function updateCategoryHandler(req: Request, res: Response) {
    // Vytvořím identifikátor - tj. user id a id kategorie
    const identifier = {
        _id: getCategoryId(req),
        owner: getUserId(req)
    };

    // Zkusím získat kategorii.
    const category = await findCategory(identifier);

    // Pokud jsem nic nedohledal.
    if(!category)
        return res.sendStatus(404);

    // Updatuji kategorii.
    const newCategory = await updateCategory(identifier, req.body);

    // A vracím updatovanou kategorii.
    return res.send(newCategory);
}

/**
 * Akce sloužící pro získání všech kategorií.
 * @param req objekt http requestu.
 * @param res objekt http odpovědi.
 */
export async function getCategoriesHandler(req: Request, res: Response) {
    // Stáhnu všechy kategorie aktuálně přihlášeného uživatele.
    const categories = await findCategories({ owner: getUserId(req) });

    // A vrátím je.
    return res.send(categories);
}

/**
 * Akce sloužící pro získání konkrétní kategorie.
 * @param req objekt http requestu.
 * @param res objekt http odpovědi.
 */
export async function getCategoryHandler(req: Request, res: Response) {
    // Vytvořím identifikátor - tj. user id a id kategorie
    const identifier = {
        _id: getCategoryId(req),
        owner: getUserId(req)
    };

    // Zkusím získat kategorii.
    const category = await findCategory(identifier);

    // Pokud jsem nic nedohledal.
    if(!category)
        return res.sendStatus(404);

    // Vrátím kategorii.
    return res.send(category);
}

/**
 * Akce sloužící pro smazání kategorie úkolů.
 * @param req objekt http requestu.
 * @param res objekt http odpovědi.
 */
export async function deleteCategoryHandler(req: Request, res: Response) {
    // Vytvořím identifikátor - tj. user id a id kategorie
    const identifier = {
        _id: getCategoryId(req),
        owner: getUserId(req)
    };

    // Zkusím získat kategorii.
    const category = await findCategory(identifier);

    // Pokud jsem nic nedohledal.
    if(!category)
        return res.sendStatus(404);

    // Smažu všechny úkoly z dané kategorie.
    await deleteTasks({ category: category._id });

    // Smažu kategorii.
    await deleteCategory(identifier);

    // Proběhlo śpěšně.
    return res.sendStatus(200);
}

/**
 * Vrací id kategorie z url parametrů.
 */
function getCategoryId(req: Request) {
    return get(req, "params.categoryId");
};