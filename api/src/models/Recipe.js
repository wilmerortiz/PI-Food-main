const { DataTypes, BIGINT} = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define('recipe', {
        id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true,
            unique: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        image:{
            type: DataTypes.STRING,
            allowNull: true
        },
        summary: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        spoonacularScore: {
            type: DataTypes.INTEGER
        },
        healthScore: {
            type: DataTypes.INTEGER
        },
        instructions: {
            type: DataTypes.TEXT
        },
        origin: {
            type: DataTypes.STRING,
            allowNull: false
        },
        dishTypes: {
            type: DataTypes.ARRAY(DataTypes.STRING)
        },
        readyInMinutes: {
            type: DataTypes.DECIMAL({length: 6, decimals: 2})
        },
        servings: {
            type: DataTypes.INTEGER
        }
    });
};
