const { createEmployerProfileService, getEmployerProfileService, findWorkerByIdService } = require("../services/employer.service");

const createEmployerProfile = async (req, res, next) => {
  try {
    const uid = req.user.uid;
    const { workType, workCity } = req.body;

    console.log("request got")

    if (!workType|| !workCity) {
      return res.status(400).json({ message: "All fields required" });
    }
    
    const employerId = "EMP-" + Math.random().toString(36).substring(2, 8).toUpperCase();  

    await createEmployerProfileService(uid, { workCity, workType, employerId });
    res.json({ success: true });
  } catch (e) {
    next(e);
  }
};


const searchWorkerById = async (req, res, next) => {
  try {
    const { workerId } = req.params;

    if (!workerId) {
      return res.status(400).json({
        success: false,
        message: "Worker ID is required",
      });
    }

    const worker = await findWorkerByIdService(workerId);

    if (!worker) {
      return res.status(404).json({
        success: false,
        message: "Worker not found",
      });
    }

    res.json({
      success: true,
      data: worker,
    });
  } catch (err) {
    next(err);
  }
};

const getEmployerProfile = async (req, res, next) => {
  try {
    const uid = req.user.uid;

    const profile = await getEmployerProfileService(uid);

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Profile not created yet",
      });
    }

    res.json({
      success: true,
      data: profile,
    });
  } catch (e) {
    next(e);
  }
};


module.exports = { 
  createEmployerProfile,
  getEmployerProfile,
  searchWorkerById,
  
};
