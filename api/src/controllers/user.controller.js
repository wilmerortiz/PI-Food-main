const { User, Recipe, Diet } = require("../db")
/*
exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
    res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Content.");
};

exports.moderatorBoard = (req, res) => {
    res.status(200).send("Moderator Content.");
};
*/
async function getUsers(request, response){
    try {
        const users = await User.findAll();
        response.json(users)
    }catch (error){
        console.log(error)
    }
}

async function getUser(request, response){
    const { id } = request.params
    try {
        const user = await User.findByPk(id);
        response.json(user)
    }catch (error){
        console.log(error)
    }
}

async function getFavorites(request, response){
    const { userId } = request.params
    try {
        const user = await User.findAll({
            where: {
                id: userId
            },
            include: [
                {
                    model: Recipe,
                    attributes: ['id', ['name', 'title'], 'image', 'summary', 'spoonacularScore', 'healthScore','instructions', 'origin', 'dishTypes', 'readyInMinutes', 'servings'],
                    include: Diet
                }
            ]
        });
        if(user){
            response.json(user[0].recipes)
        }else{
            response.json({
                message: "No se encontraron registros",
                error: true
            })
        }

    }catch (error){
        console.log(error)
    }
}

async function registerFavorites( request, response){
    const { userId, recipeId } = request.body
    try {
        const user = await User.findByPk(userId);
        user.addRecipe(recipeId);

        response.json({
            message: "Add in Favorites",
            error: false
        })
    }catch (error){
        console.log(error.message)
    }
}

module.exports = {
    getUsers,
    getFavorites,
    getUser,
    registerFavorites
}
