var admin = require("firebase-admin");

var serviceAccount = require("../../ressources/private-key/switchgamesapi-firebase-adminsdk-6qu78-aa24b23800.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const firestore = admin.firestore();

module.exports = firestore;