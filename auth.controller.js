const { db } = require("../config/firebase");

const login = async (req, res) => {
  const uid = req.user.uid;
  const ref = db.collection("users").doc(uid);
  const snap = await ref.get();

  let isNewUser = false;

  if (!snap.exists) {
    if (!["WORKER", "EMPLOYER"].includes(req.body.intendedRole)) {
      return res.status(400).json({
        success: false,
        message: "Invalid role selection",
      });
    }

    let role = req.body.intendedRole;

    await ref.set({
      role,
      createdAt: new Date(),
    });
    isNewUser = true;
  }

  const role = (await ref.get()).data().role;

  res.json({ success: true, isNewUser, role });
};

module.exports = { login };
