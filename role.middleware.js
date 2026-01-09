const { db } = require("../config/firebase");

module.exports = (role) => async (req, res, next) => {
  const snap = await db.collection("users").doc(req.user.uid).get();
  if (!snap.exists || snap.data().role !== role) {
    return res.status(403).json({ message: "Access denied" });
  }
  next();
};
