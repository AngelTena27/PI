require("dotenv").config();
const { Sequelize } = require("sequelize");
const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;
const GamesModel = require("./models/gamesModel")
const GenresModel = require("./models/GenresModel")

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/videogames`, {
    logging: false,
    native: false,
});

GamesModel(sequelize);
GenresModel(sequelize);

const { Videogame, Genres } = sequelize.models

Videogame.belongsToMany(Genres, {through: "Videogame_Genres", timestamps: false})
Genres.belongsToMany(Videogame, {through: "Videogame_Genres", timestamps: false})


module.exports = {
    ...sequelize.models,
    sequelize
}