const { Router, request} = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const Recipe = require('./recipes');
const Diet = require('./diets')

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.post('/recipes', Recipe.addRecipe);
router.get('/recipes', Recipe.getRecipes);
router.get('/recipe/:idReceta', Recipe.getRecipesId);
//router.get('/recipe', Recipe.getRecipesName);

router.post('/types', Diet.createDiet)
router.get('/types', Diet.getDiet)

module.exports = router;
