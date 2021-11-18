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

        initial()

        //console.log(API_KEY)

        /*Pre cargamos las dietas*/
        /*
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
                console.log("diets precargadas");
            });

        */

        /*Cargamos las recetas*/
        /*
        let dietas = [];
        try {
            const types = Diet.findAll({
                order: [['id', 'DESC']]
            });
            types.then(function(response){
                let array =  ['paleo', 'primal', 'vegan']
                let types = [];
                response.map(td => {
                    dietas.push(
                        {id: td.id, name: td.name.toLowerCase()}
                    )
                })

                dietas.filter( function (tag) {
                    if(array.includes(tag.name)){
                        types.push(tag.id)
                    }
                });

            })
        }catch (error){
            console.log(error)
        }

         */

        /*
        let url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true`;
        const axios = require("axios").default;
        let options = {
            method: 'GET',
            url: url,
            params: {
                number: '100',
                instructionsRequired: true,
                maxReadyTime: true
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
                        //console.log(types);
                       let newRecipe = Recipe.create({
                            name : rc.title,
                            image : rc.image,
                            summary: rc.summary,
                            spoonacularScore: rc.spoonacularScore,
                            healthScore: rc.healthScore,
                            instructions: rc.instructions,
                            origin: 'LOCAL',
                            dishTypes : rc.dishTypes
                       })

                        newRecipe.then(function (res){
                            res.addDiets(types);
                            $saveData.push(newRecipe)
                        })
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

        */
    });

    function initial() {
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
});
