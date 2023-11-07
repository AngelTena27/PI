const URL = "https://api.rawg.io/api/genres";
const axios = require("axios")
require("dotenv").config();
const { RAWG_API_KEY } = process.env;
const { Genres } = require("../db")

const infoCleaner = (array) => {
    return array.results.map((genres) => {
        return {
            name: genres.name,

        }
    })
}

const getAllGenres = async () => {
    try {
        // Obtener los géneros de la API
        const { data } = await axios.get(`${URL}?key=${RAWG_API_KEY}`);
        const genresApi = infoCleaner(data);

        // Consultar la base de datos para obtener los géneros existentes
        const genresDB = await Genres.findAll();

        // Filtrar los géneros de la API que no están en la base de datos
        const newGenres = genresApi.filter(apiGenres => {
            return !genresDB.some(dbGenres => dbGenres.name === apiGenres.name);
        });

        // Guardar los nuevos géneros en la base de datos
        for (const newGenre of newGenres) {
            await Genres.create({
                name: newGenre.name,
            });
        }

        const allGenres = await Genres.findAll();
        return allGenres.map(g => g.name);
    } catch (error) {
        console.error("Ocurrió un error:", error);
        throw error;
    }
}

module.exports = {
    getAllGenres
}