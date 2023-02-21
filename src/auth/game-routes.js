module.exports = app => {
    const game = require('./game-controller');
    const router = require('express').Router();

    router.post("/add-game", game.addGame);

    // -- To declare the prefix path of your API service
    app.use("/switchgames/api/v1", router);
}