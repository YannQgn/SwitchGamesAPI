const firestore = require("../config/firebase-config");

const gameData = async (id) => {
    let gameSnapshot = await firestore
        .collection("games")
        .where("id", "==", id);
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
     F #swagger.parameters['obj'] = {
          in: 'body',
          description: 'A Game Object will be created.',
          schema: { $ref: "#/definitions/AddGame" }
     }
      #swagger.responses[200] = {
    description: 'Game added successfully',
    schema: {
      "message": "Game added successfully"
    }}
    #swagger.responses[400] = {
                description: 'Invalid or insufficient data',
                schema: {
    "message": "Invalid or insufficient data",
   }}
    #swagger.responses[401] = {
                description: 'Invalid token.',
                schema: {
    "message": "You do not have the rights.",
   }} 
   #swagger.responses[500] = {
                description: 'Internal server error',
                schema: {
    "message": "Internal server error",
   }}
        */
   const data = req.body;
    try {
        const docRef = await firestore.collection("games").add(data);
        await firestore
            .collection("games")
            .doc(docRef.id)
            .update({ id: docRef.id });

        return res.status(200).send({
            message: "Game created successfully !",
            gameId: docRef.id,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: "Server error." });
    }
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
       #swagger.parameters['id'] = { description: 'Game id' }
           #swagger.security = [{
             "bearerAuth": []
       }]
      */
    const id = req.params.id;
    console.log(id);
    const doc = await docExist("games", id);

    try {
        if (!doc) {
            return res.status(404).send({ error: "Game not found." });
        }
        return res.status(200).send(doc.data());
    } catch (error) {
        return res.status(500).send({ Error: "Whaaat?" });
    }
};

exports.deleteGame = async (req, res) => {
    /* #swagger.tags = ['Games']
        #swagger.description = 'Service to delete a game';
        #swagger.summary = "Service to delete a game ";
        #swagger.security = [{
         "bearerAuth": []
        }] 
       */

    const id = req.body.id;

    // V??rif input name
    if (!id) {
        return res.status(400).send({ error: "Invalid data." });
    }

    // V??rifie si le jeu existe bdd

    let gameInformation = await gameData(id);
    if (!gameInformation) {
        return res.status(403).json({ error: "Forbidden." });
    }
    // Suppression du jeu bdd
    try {
        await firestore.collection("games").doc(gameInformation.id).delete();
        return res.status(200).send({ message: "Game deleted successfully." });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ error: "Server error." });
    }
};

exports.updateGame = async (req, res) => {
    /* #swagger.tags = ['Games']
       #swagger.description = 'Service to update a game';
       #swagger.summary = "Service to update a game";
        #swagger.security = [{
        "bearerAuth": []
        
    }]
    #swagger.parameters['obj'] = {
          in: 'body',
          description: 'Object : Game, ID is required.',
          schema: { $ref: "#/definitions/UpdateGame" }
     }
      #swagger.responses[200] = {
    description: 'Game updated successfully',
    schema: {
      "message": "Game updated successfully"
    }}
    #swagger.responses[400] = {
                description: 'Invalid or insufficient data',
                schema: {
    "message": "Invalid or insufficient data",
   }}
    #swagger.responses[401] = {
                description: 'Invalid token.',
                schema: {
    "message": "You do not have the rights.",
   }
  } 
    #swagger.responses[404] = {
                description: 'Game not found.',
                schema: {
    "message": "Game not found.",
   }}
   #swagger.responses[500] = {
                description: 'Internal server error',
                schema: {
    "message": "Internal server error.",
   }}
    */
    const data = req.body;

    const game = docExist("games", data.id);

    if (!game) return res.status(404).send({ message: "Game not found." });

    const newGame = {
        ...game.data,
        ...data,
    };

    try {
        await firestore.collection("games").doc(data.id).update(newGame);
        return res.status(200).send({ success: "Game updated successfully !" });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ error: "Server error." });
    }
};

const docExist = async (collection, id) => {
    const doc = await firestore.collection(collection).doc(id).get();
    if (!doc.exists) return false;
    return doc;
}