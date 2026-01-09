var admin = require("firebase-admin");

var serviceAccount = require("../../error-404-bbd41-firebase-adminsdk-fbsvc-46909cadf7.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

console.log("Firebase Admin initialized");
console.log("Apps count:", admin.apps.length);

const db = admin.firestore();
const auth = admin.auth();

module.exports = {
  db,
  auth
};