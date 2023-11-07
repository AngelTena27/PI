const { Router } = require("express")
const gamesRouter = Router()
const { getGamesHandler, getDetailHandler, createGameHandler} = require("../handlers/gamesHandlers")

gamesRouter.get("/", getGamesHandler);

gamesRouter.get("/:id", getDetailHandler);

gamesRouter.post("/", createGameHandler)

module.exports = gamesRouter