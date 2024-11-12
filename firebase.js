var admin = require("firebase-admin");
const SERVICE_ACCOUNT = process.env.SERVICE_ACCOUNT
var serviceAccount = require(`${SERVICE_ACCOUNT}`);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();
module.exports = db;