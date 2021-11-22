const { Router, request} = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const recipe = require('../controllers/recipes.controller');
const diet = require('../controllers/diets.controller')
const user = require('../controllers/users')

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/users', user.getUsers)
/*router.get('/users/:id', user.getUser)
router.post('/users', user.register)
*/

router.post('/recipes', recipe.addRecipe);
router.get('/recipes', recipe.getRecipes);
router.get('/recipes/:idReceta', recipe.getRecipesId);

router.post('/types', diet.createDiet)
router.get('/types', diet.getDiet)

module.exports = router;
