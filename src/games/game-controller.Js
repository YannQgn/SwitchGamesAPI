const firestore = require("../config/firebase-config");

const jsonConfig = require("../../ressources/json/config.json");

const gameData = async (gameId) => {
    let gameSnapshot = await firestore
        .collection("games")
        .where("gameId", "==", gameId);
    let gameData = (await gameSnapshot.get()).docs[0];
    console.log(gameData);
    if (gameData) {
        return gameData;
    } else {
        return false;
    }
};

exports.addGame = async (req, res) => {
    /* #swagger.tags = ['Games']
        #swagger.description = 'Service to create a new game';
        #swagger.summary = "Service to create a new game ";
         #swagger.security = [{
         "bearerAuth": []
      }] 
        */
    const {
        gameId,
        gameName,
        publisher,
        players,
        languages,
        categories,
        releaseDate,
        ageRating,
        compatibleControllers,
    } = req.body;

    firestore
        .collection("games")
        .add({
            gameId: gameId,
            gameName: gameName,
            publisher: publisher,
            players: players,
            languages: languages,
            categories: categories,
            releaseDate: releaseDate,
            ageRating: ageRating,
            compatibleControllers: compatibleControllers,
        })
        .then(function (docRef) {
            let messageToReturn = "Game added successfully !";

            firestore.collection("games").doc(docRef.id).update({
                uid: docRef.id,
            });

            console.log(messageToReturn);

            return res.status(201).send({
                uid: docRef.id,
            });
        })
        .catch(function (error) {
            return res.status(500).send({ error: "Something went wrong :(" });
        });
};

exports.getAllGames = async (req, res) => {
    /* #swagger.tags = ['Games']
     #swagger.description = 'Service to get all games';
     #swagger.summary = "Service to get all games";
     #swagger.security = [{
              "bearerAuth": []
      }]
    */
    try {
        const gamesList = await firestore.collection("games").get();
        return res.status(200).json(gamesList.docs.map((doc) => doc.data()));
    } catch (error) {
        console.error(error);
        return res.status(500).send({
            error: {
                message: "Server error.",
            },
        });
    }
};

exports.getAGame = async (req, res) => {
    /* #swagger.tags = ['Games']
       #swagger.description = 'Service to get a game';
       #swagger.summary = "Service to get a game";
           #swagger.security = [{
             "bearerAuth": []
       }]
       #swagger.parameters['gameId'] = {
      in: 'path',
      description: 'ID of game',
      required: true,
      type: 'string'
    }
      */
    console.log(req.body);
    if (!req.params.gameId)
        return res.status(401).send({ error: "Unauthorized." });

    const doc = await docExist("games", req.params.gameId);

    if (!doc) {
        return res.status(404).send({ error: "Game not found." });
    }

    return res.status(200).send(doc.data());
};

exports.deleteGame = async (req, res) => {
    /* #swagger.tags = ['Games']
        #swagger.description = 'Service to delete a game';
        #swagger.summary = "Service to delete a game ";
        #swagger.security = [{
         "bearerAuth": []
        }] 
       */

    const gameId = req.body.gameId;

    // Vérif input name
    if (!gameId) {
        return res.status(400).send({ error: "Invalid data." });
    }

    // Vérifie si le jeu existe bdd

    let gameInformation = await gameData(gameId);
    if (!gameInformation) {
        return res.status(403).json({ error: "Forbidden." });
    }
    // Suppression du jeu bdd
    try {
        await firestore.collection("games").doc(gameInformation.id).delete();
        return res.status(200).send({ message: "Game deleted successfully." });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ error: "Server error." });
    }
};

exports.updateGame = async (req, res) => {
    /* #swagger.tags = ['Games']
       #swagger.description = 'Service to update a game';
       #swagger.summary = "Service to update a game";
        #swagger.security = [{
        "bearerAuth": []
    }]*/
    const data = req.body;

    connexionFunction = async (collection, uid) => {
        const game = await firestore.collection(collection).doc(uid).get();
        if (!game.exists) return false;
        return game;
    };

    const game = connexionFunction("games", data.uid);
    console.log(game);
    if (!game) return res.status(404).send({ message: "Game not found." });

    const newGame = {
        ...game.data,
        ...data,
    };

    try {
        await firestore.collection("games").doc(data.uid).update(newGame);
        return res.status(200).send({ success: "Game updated successfully" });
    } catch (error) {
        console.log(err);
        return res.status(500).send({ error: "Server error." });
    }
};

const docExist = async (collection, id) => {
    const doc = await firestore.collection(collection).doc(id).get();
    if (!doc.exists) return false;
    return doc;
};