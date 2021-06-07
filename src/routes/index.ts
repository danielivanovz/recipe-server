import { Router } from 'express';
import getUniqueIngredients from './getUniqueIngredients.c';
import getRecipeWithIngredient from './getRecipeWithIngredient.c';
import introController from './slash.controller';
import getRecipeWithID from './getRecipeWithID.c';

const router = Router();

router.get('/', introController);
router.get('/ingredients', getUniqueIngredients);
router.get('/recipe', getRecipeWithIngredient);
router.get('/id', getRecipeWithID);

export default router;
