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
                }
            };

            const recipe = await Recipe.findAll({
                order: [['id', 'DESC']],
                include: {
                    model: Diet,
                    attributes: ['name']
                }
            })/*.then(recipes => {
                return recipes
            })*/

            if(recipe){
                recipe.map(rc => $data.push(rc))
            }

            axios.request(options).then(function (resp) {
                console.log('respuesta', resp)
                if(resp.data.status !== 'failure'){
                    resp.data.results.map(rc => $data.push(rc))
                }
                response.send($data)

            }).catch(function (error) {
                response.send($data)
                //console.error(error);
            });

        }else{

            let options = {
                method: 'GET',
                url: url,
                params: {
                    query: nombre,
                    number: '100',
                }
            };

            const recipe = await Recipe.findAll({
                where: {
                    title: {
                        [Op.iLike] : `%${nombre}%`
                    }
                },
                include: Diet
            });

            if(recipe){
                recipe.map(rc => $data.push(rc))
            }

            axios.request(options).then(function (resp) {

                if(resp.data.status !== 'failure' > 0){
                    resp.data.results.map(rc => $data.push(rc))
                }
                response.send($data)

            }).catch(function (error) {
                response.send($data)
                //console.error(error);
            });
        }



        //response.send($data)

    }catch (error){
        console.log(error)
    }
}

async function getRecipesName(request, response){
    const { nombre } = request.query
    let url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true`;
    try{
        let $data = [];
        const recipe = await Recipe.findAll({
            where: {
                title: {
                    [Op.iLike] : `%${nombre}%`
                }
            },
            include: Diet
        });

        if(recipe){
            recipe.map(rc => $data.push(rc))
        }

        const axios = require("axios").default;

        let options = {
            method: 'GET',
            url: url,
            params: {
                query: nombre,
                number: '100',
            }
        };

        axios.request(options).then(function (resp) {

            if(resp.data.results.length > 0){

                resp.data.results.map(rc => $data.push(rc))
            }

            response.send($data)
        }).catch(function (error) {
            console.error(error);
        });

    }catch (error){
        console.log(error)
    }
}

async function getRecipesId(request, response){
    const {idReceta} = request.params
    const {origin} = request.query
    let url = `https://api.spoonacular.com/recipes/${idReceta}/information?apiKey=${API_KEY}&includeNutrition=false`
    try{
        if(origin === 'API'){
            let axios = require("axios").default;
            let options = {
                method: 'GET',
                url: url,
            };

            axios.request(options).then(function (resp) {
                console.log(resp.data);
                response.json(resp.data)
            }).catch(function (error) {
                console.error(error);
            });
        }else{
            const recipe = await Recipe.findByPk(idReceta, {
                include: Diet
            });

            if(!recipe) return response.sendStatus(404)
            response.json(recipe)
        }

    }catch (error){
        console.log(error)
    }
}

async function addRecipe(request, response){
    console.log(request.body);
    const {title, image, summary, spoonacularScore, healthScore, instructions, origin, dishTypes, types} = request.body

    try {
        let newRecipe = await Recipe.create({
            title,
            image,
            summary,
            spoonacularScore,
            healthScore,
            instructions,
            origin,
            dishTypes
        },{
            fields: ['title', 'image', 'summary', 'spoonacularScore', 'healthScore', 'instructions', 'origin', 'dishTypes']
        })

        await newRecipe.addDiets(types);

        if(newRecipe){
            response.json({
                message: 'Receta creado satisfactoriamente',
                data: newRecipe
            })
        }
    } catch (error){
        response.status(500).json({
            message: 'A ocurrido un error interno ',
            data: error
        })
    }

}

module.exports = {
    getRecipes,
    getRecipesName,
    getRecipesId,
    addRecipe
}