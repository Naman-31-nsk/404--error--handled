const router = require("express").Router();
const verifyAuth = require("../middlewares/auth.middleware");
const { login } = require("../controllers/auth.controller");

router.post("/login", verifyAuth, login);
module.exports = router;
