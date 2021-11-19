//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
require('dotenv').config();
const { API_KEY } = process.env
const server = require('./src/app.js');
const { conn, Diet, Recipe, Role } = require('./src/db.js');
const {default: axios} = require("axios");
const {getDietsData} = require('./dietsData.js');
const {response} = require("express");

// Syncing all the models at once.
conn.sync({ force: false }).then(() => {
    server.listen(3001, () => {
        console.log('%s listening at 3001'); // eslint-disable-line no-console

        //initialRoles();
        //initialTypeDiets();
        //initialRecipes();

    });

    function initialRoles() {
        Role.findOrCreate({
            where: {
                name: "user",
                description: "usuario normal"
            }
        });

        Role.findOrCreate({
            where: {
                name: "moderator",
                description: "usuario moderador"
            }
        });

        Role.findOrCreate({
            where: {
                name: "admin",
                description: "usuario administrador"
            }
        });
    }

    function initialTypeDiets(){
        let $saveData = [];
        getDietsData.map(dt => {
            let $data = Diet.findOrCreate({
                where: {
                    name: dt.name,
                    description: dt.description
                }
            })

            $saveData.push($data)
        })

        Promise.all($saveData)
            .then(res => {
                console.log("Tipo de diets pre cargadas");
            });
    }

    function initialRecipes(){

        let url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true`;
        const axios = require("axios").default;
        let options = {
            method: 'GET',
            url: url,
            params: {
                number: '100',
                instructionsRequired: true
            }
        };

        axios.request(options).then(function (resp) {
            //console.log(resp.data)
            if(resp.data.status !== 'failure'){

                let dietas = [];
                const diets = Diet.findAll({
                    order: [['id', 'DESC']]
                });

                diets.then(function(response){
                    response.map(td => {
                        dietas.push(
                            {id: td.id, name: td.name.toLowerCase()}
                        )
                    })

                    let $saveData = [];

                    resp.data.results.map(rc => {
                        let types = [];

                        dietas.filter( function (tag) {
                            if(rc.diets.includes(tag.name)){
                                types.push(tag.id)
                            }
                        });

                        setTimeout( function (){
                            let newRecipe = Recipe.create({
                                id: Date.now()+1,
                                name : rc.title,
                                image : rc.image,
                                summary: rc.summary,
                                spoonacularScore: rc.spoonacularScore,
                                healthScore: rc.healthScore,
                                instructions: rc.instructions,
                                origin: 'LOCAL',
                                dishTypes : rc.dishTypes,
                                readyInMinutes: rc.readyInMinutes,
                                servings: rc.servings
                            })

                            newRecipe.then(function (res){
                                res.addDiets(types);
                                $saveData.push(newRecipe)
                            })
                        }, 2)

                    })

                    Promise.all($saveData)
                        .then(res => {
                            console.log("recetas cargadas");
                        });
                })

            }

        }).catch(function (error) {
            console.error(error.message);
        });
    }

});
