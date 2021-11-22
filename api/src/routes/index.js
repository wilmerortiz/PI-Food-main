const { Router, request} = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const recipe = require('../controllers/recipes.controller');
const diet = require('../controllers/diets.controller')

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


router.post('/recipes', recipe.addRecipe);
router.get('/recipes', recipe.getRecipes);
router.get('/recipes/:idReceta', recipe.getRecipesId);

router.post('/types', diet.createDiet)
router.get('/types', diet.getDiet)

module.exports = router;
