const router = require("express").Router();
const verifyAuth = require("../middlewares/auth.middleware");
const authorize = require("../middlewares/role.middleware");
const worker = require("../controllers/worker.controller");

router.post("/profile", verifyAuth, authorize("WORKER"), worker.createWorkerProfile);
router.get("/profile", verifyAuth, authorize("WORKER"), worker.getWorkerProfile);

module.exports = router;
