const { authenticateToken } = require('../middleware/jwt');

module.exports = app => {
    const game = require('./game-controller');
    const router = require('express').Router();

    router.post("/add-game", authenticateToken, game.addGame);

    router.put("/update-game", authenticateToken, game.updateGame);

    router.get("/get-all-games", authenticateToken, game.getAllGames);
    // router.get("/get-a-game", authenticateToken, game.getAGame);

    router.delete("/delete-game", authenticateToken, game.deleteGame);

    // -- To declare the prefix path of your API service
    app.use("/switchgames/api/v1", router);
}