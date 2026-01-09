const { auth } = require("../config/firebase");

module.exports = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "No token" });
    // console.log(token);
    // console.log("AUTH HEADER:", req.headers.authorization);
    req.user = await auth.verifyIdToken(token);// if valid token then we get user info else throw error
    next();
  } catch (err){
    console.log("error verify",err.message)
    res.status(401).json({ message: "Invalid token" });
  }
};
