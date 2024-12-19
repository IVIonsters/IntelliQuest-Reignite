const admin = require("firebase-admin");

// Initialize Firebase Admin SDK
const serviceAccount = require("../path-to-your-service-account-key.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

module.exports = db;
