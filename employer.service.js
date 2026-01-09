const { db } = require("../config/firebase");

const createEmployerProfileService = async (uid, data) => {
  await db.collection("employers").doc(uid).set(data, { merge: true });
};

const getEmployerProfileService = async (uid) => {
  const snap = await db.collection("employers").doc(uid).get();

  if (!snap.exists) {
    return null; // profile not created yet
  }

  return snap.data();
};

const findWorkerByIdService = async (workerId) => {
  const snap = await db
    .collection("workers")
    .where("workerId", "==", workerId)
    .limit(1)
    .get();

  if (snap.empty) {
    return null;
  }

  const worker = snap.docs[0].data();

  // 🔒 Return only safe, public fields
  return worker ;
};


module.exports = { 
  createEmployerProfileService,
  getEmployerProfileService,
  findWorkerByIdService,
 };
