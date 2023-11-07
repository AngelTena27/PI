const { Router } = require("express")
const gamesRouter = require("./gamesRouter");
const genresRouter = require("./genresRouter");
const router = Router()

router.use("/videogames", gamesRouter);

router.use("/genres", genresRouter)



module.exports = router