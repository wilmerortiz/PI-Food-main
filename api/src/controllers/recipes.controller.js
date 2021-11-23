const {Recipe, Diet} = require("../db")
const { Op } = require("sequelize");
const {default: axios} = require("axios");
require('dotenv').config();
const { API_KEY } = process.env

async function getRecipes(request, response){
    const { nombre } = request.query

    let url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true`;
    let $data = [];
    try{
        const axios = require("axios").default;
        if(!nombre){

            let options = {
                method: 'GET',
                url: url,
                params: {
                    number: '100',
                    instructionsRequired: true
                }
            };

            const recipe = await Recipe.findAll({
                attributes: ['id', ['name', 'title'], 'image', 'summary', 'spoonacularScore', 'healthScore','instructions', 'origin', 'dishTypes', 'readyInMinutes', 'servings', 'createdAt'],
                order: [['id', 'DESC']],
                include: {
                    model: Diet,
                    attributes: ['id', 'name']
                }
            })

            if(recipe){
                recipe.map(rc => $data.push(rc))
            }

            /*
            axios.request(options).then(function (resp) {
                //console.log('respuesta', resp)
                if(resp.data.status !== 'failure'){
                    resp.data.results.map(rc => $data.push(rc))
                }
                response.send($data)

            }).catch(function (error) {
                response.send($data)
                //console.error(error);
            });
            */

        }else{

            let options = {
                method: 'GET',
                url: url,
                params: {
                    query: nombre,
                    number: '100',
                    instructionsRequired: true
                }
            };

            const recipe = await Recipe.findAll({
                attributes: ['id', ['name', 'title'], 'image', 'summary', 'spoonacularScore', 'healthScore','instructions', 'origin', 'dishTypes', 'readyInMinutes', 'servings', 'createdAt'],
                where: {
                    name: {
                        [Op.iLike] : `%${nombre}%`
                    }
                },
                include: Diet
            });

            if(recipe){
                recipe.map(rc => $data.push(rc))
            }

            /*
            axios.request(options).then(function (resp) {

                if(resp.data.status !== 'failure'){
                    resp.data.results.map(rc => $data.push(rc))
                }
                response.send($data)

            }).catch(function (error) {
                response.send($data)
                //console.error(error);
            });

        */
        }

        response.send($data)

    }catch (error){
        return response.status(500).send(error.message)
    }
}

async function getRecipesId(request, response){
    const {idReceta} = request.params
    const {origin} = request.query

    try{
        //if(origin === 'API'){
        if(idReceta.length < 10){
            let url = `https://api.spoonacular.com/recipes/${idReceta}/information?apiKey=${API_KEY}`
            let axios = require("axios").default;
            let options = {
                method: 'GET',
                url: url,
            };

            axios.request(options).then(function (resp) {
                //console.log(resp.data);
                response.json(resp.data)
            }).catch(function (error) {
                console.error(error.message);
            });
        }else{
            const recipe = await Recipe.findByPk(idReceta, {
                attributes: ['id', ['name', 'title'], 'image', 'summary', 'spoonacularScore', 'healthScore','instructions', 'origin', 'dishTypes', 'readyInMinutes', 'servings', 'createdAt'],
                include: Diet
            });

            if(!recipe) return response.sendStatus(404)
            response.json(recipe)
        }

    }catch (error){
        return response.status(500).send(error.message)
    }
}

async function addRecipe(request, response){
    //console.log(request.body);
    const {name, image, summary, spoonacularScore, healthScore, instructions, origin, dishTypes, readyInMinutes, servings, types} = request.body

    try {
        let newRecipe = await Recipe.create({
            id: Date.now(),
            name,
            image,
            summary,
            spoonacularScore,
            healthScore,
            instructions,
            origin,
            dishTypes,
            readyInMinutes,
            servings
        })

        await newRecipe.addDiets(types);

        if(newRecipe){
            response.json({
                message: 'Recipe successfully created',
                open: true,
                error: false
            })
        }else{
            response.json({
                message: 'Error, recipe could not be created',
                open: true,
                error: true
            })
        }
    } catch (error){
        response.status(500).json({
            message: `An internal error has occurred: ${error.message}`,
            open: true,
            error: true
        })
    }
}

module.exports = {
    getRecipes,
    getRecipesId,
    addRecipe
}