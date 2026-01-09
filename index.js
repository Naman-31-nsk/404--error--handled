const express = require("express");

const authRoutes = require("./auth.routes");
const workerRoutes = require("./worker.routes");
const employerRoutes = require("./employer.routes");

const router = express.Router();


router.use("/auth", authRoutes);
router.use("/worker", workerRoutes);
router.use("/employer", employerRoutes);
// router.use("/attestation", attestationRoutes);

module.exports = router;
