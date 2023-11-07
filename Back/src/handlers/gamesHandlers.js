const { crateGameDB, getGameById, getAllGames, getGameByName} = require("../controllers/gamesController")

const getGamesHandler = async (req, res) => {
    const { name, page} = req.query
    try {
        if(name) {
            const gameByName = await getGameByName(name)
            res.status(200).json(gameByName)
        } else {
            const response = await getAllGames(page)
            res.status(200).json(response)
        }
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
}

const getDetailHandler = async (req, res) => {
    const { id } = req.params;

    const source = isNaN(id)
    ? "bdd" 
    : "api"
    
    try {
        const response = await getGameById(id, source)
        res.status(200).json(response)
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
}

const createGameHandler = async (req, res) => {
    const { name, description, platforms, image, updated, rating, genres } = req.body

    try {
        const response = await crateGameDB(name, description, platforms, image, updated, rating, genres)
        res.status(201).json(response)
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
}


module.exports = {
    getGamesHandler,
    getDetailHandler,
    createGameHandler
}