var admin = require("firebase-admin");
var serviceAccount = require("./petfriend-77a67-firebase-adminsdk-g1cfk-f6500a3d67.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();
module.exports = db;