const { Videogame, Genres } = require("../db")
const URL = "https://api.rawg.io/api/games";
const axios = require("axios")
require("dotenv").config();
const { RAWG_API_KEY } = process.env;
const { v4: uuidv4 } = require('uuid');
const { Sequelize } = require("sequelize");

const crateGameDB = async (name, description, platforms, image, updated, rating, genres) => {

    const newGame = await Videogame.create({ name, description, platforms, image, updated, rating })

    const genresDB = await Genres.findAll({
        where: {name: genres}
    })

    await newGame.addGenres(genresDB)

    return newGame
}

const getGameById = async (id, source) => {
    if (source === "api") {
        const { data } = await axios.get(`${URL}/${id}?key=${RAWG_API_KEY}`);
        const platformNames = data.platforms.map(platform => platform.platform.name);
        const genresNames = data.genres.map(genre => genre.name);

        const game = {
            id: uuidv4(),
            name: data.name,
            description: data.description,
            platforms: platformNames,
            updated: data.updated,
            rating: data.rating,
            image: data.background_image,
            genres: genresNames,
            created: false
        };

        return game;
    } else {
        const game = await Videogame.findByPk(id, {
            include: [
                {model: Genres}
            ]
        });
        return game;
    }
}

const infoCleaner = (array) => {
    return array.results.map((game) => {
        const platformNames = game.platforms.map(platform => platform.platform.name);
        const genresNames = game.genres.map(genre => genre.name);
        return {
            id: game.id,
            name: game.name,
            description: game.description,
            platforms: platformNames,
            updated: game.updated,
            rating: game.rating,
            image: game.background_image,
            genres: genresNames,
            created: false
        }
    });
}


const getAllGames = async (page) => {
    const gamesDB = await Videogame.findAll({
        include: [
            {model: Genres}
        ]
    })
    
    const { data } = await axios.get(`${URL}?key=${RAWG_API_KEY}&page=${page}`)

    const gamesApi = infoCleaner(data)

    return [...gamesDB, ...gamesApi]
}

const getGameByName = async (name) => {
    const { data } = await axios.get(`${URL}?search=${name}&key=${RAWG_API_KEY}`)
    const gamesApi = infoCleaner(data);

    const gameDB = await Videogame.findAll({
        where: {
            name: {
                [Sequelize.Op.iLike]: `%${name}%`
            }
        }
    });

    return [...gameDB, ...gamesApi];
}




module.exports = {
    crateGameDB,
    getGameById,
    getAllGames,
    getGameByName
}