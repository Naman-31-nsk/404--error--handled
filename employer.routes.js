const router = require("express").Router();
const verifyAuth = require("../middlewares/auth.middleware");
const authorize = require("../middlewares/role.middleware");
const { createEmployerProfile, getEmployerProfile, searchWorkerById } = require("../controllers/employer.controller");

router.post("/profile", verifyAuth, authorize("EMPLOYER"), createEmployerProfile);
router.get("/profile", verifyAuth, authorize("EMPLOYER"), getEmployerProfile);
router.get("/search/:workerId", verifyAuth, authorize("EMPLOYER"), searchWorkerById);
module.exports = router;
