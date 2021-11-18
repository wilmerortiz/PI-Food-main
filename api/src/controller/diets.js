const {Recipe, Diet} = require("../db")

async function getDiet(request, response){
    try {
        const types = await Diet.findAll();
        response.json(types)
    }catch (error){
        console.log(error)
    }
}

async function createDiet(request, response){
    const {name, description} = request.body
    try {

        let newDiet = await Diet.findOrCreate({
            where: {
                name: name,
                description: description
            }
        })
        if(newDiet){
            response.json({
                message: 'type of diet successfully created',
                open: true,
                error: false
            })
        }else{
            response.json({
                message: 'Error, diet type could not be created',
                open: true,
                error: true
            })
        }
    } catch (error){
        response.status(500).json({
            message: `An internal error has occurred ${error.message}`,
            open: true,
            error: true
        })
    }
}

module.exports = {
    getDiet,
    createDiet
}