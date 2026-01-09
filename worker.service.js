const { db } = require("../config/firebase");

const createWorkerProfileService = async (uid, data) => {
  await db.collection("workers").doc(uid).set(data, { merge: true });
  /// data-> name, state, age, domicile_no, worktype, language...
  // 
};


const getWorkerProfileService = async (uid) => {
  const snap = await db.collection("workers").doc(uid).get();

  if (!snap.exists) {
    return null; // profile not created yet
  }

  return snap.data();
};


module.exports = {
  createWorkerProfileService,
  getWorkerProfileService,
};
