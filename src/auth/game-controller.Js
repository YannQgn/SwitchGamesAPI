const firestore = require('../config/firebase-config');

const bcrypt = require('bcrypt');
const saltRounds = 10;

const jwt = require('jsonwebtoken');

const jsonConfig = require('../../ressources/json/config.json');

const JWT_SECRET = jsonConfig.jwtSecret;

const jwtMiddleware = require('./jwt-middleware');

exports.addGame = async (req, res) => {
    // #swagger.tags = ['Auth']
    // #swagger.description = 'Service to register new user into carsapi'
    // #swagger.summary = 'Service to register new user'
    const {
        name, publisher, players, languages, categories, releaseDate, ageRating, compatibleControllers
    } = req.body;

    let gameExists = await gameAlreadyExists(name);

    if (userHasAlreadyAccount == true) {
        return res.status(403).json({ "error": "Game already exists !" });
    }

    bcrypt.hash(password, saltRounds, function (err, hash) {
        firestore.collection("games").add({
            "email": email,
            "password": hash,
            "firstName": firstName,
            "lastName": lastName,
            "phoneNumber": phoneNumber,
            "address": address
        }).then(function (docRef) {
            let messageToReturn = "Game added successfully !";

            firestore.collection("games").doc(docRef.id).update({
                "uid": docRef.id
            });

            console.log(messageToReturn);

            let jwtToken = createJwtToken(docRef.id, email, firstName, lastName);

            return res.status(201).send({
                "uid": docRef.id,
                "accessToken": jwtToken,
            });
        }).catch(function (error) {
            return res.status(500).send({ "error": "Something went wrong :(" });
        });
    });
}

const gameAlreadyExists = async (name) => {
    let gameSnapshot = await firestore.collection("games").where("name", "==", name);
    let gameData = (await gameSnapshot.get()).docs[0];
    if (gameData) {
        return true;
    } else {
        return false;
    }
}

const createJwtToken = (uid, email, firstName, lastName) => {
    const token = jwt.sign({
        uid: uid,
        username: email,
        firstName: firstName,
        lastName: lastName
    }, JWT_SECRET, { expiresIn: '2 hours' });

    return 'Bearer ' + token;
}