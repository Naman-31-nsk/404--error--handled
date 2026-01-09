const {
  createWorkerProfileService,
  getWorkerProfileService,
} = require("../services/worker.service");

const createWorkerProfile = async (req, res, next) => {
  try {
    const uid = req.user.uid;
    const { name, originState, currentCity, workType, age, DomicileRefNumber, language} = req.body;
    var verified= false;//default 
    if (!name || !originState || !currentCity || !workType || !age || !DomicileRefNumber || !language) {
      return res.status(400).json({ message: "All fields required" });
    }

   const workerId = "WKR-" + Math.random().toString(36).substring(2, 8).toUpperCase();  

  /// data-> name, state, age, domicile_no, worktype, language...
    await createWorkerProfileService(uid, {
      workerId,
      name,
      age,
      originState,
      currentCity,
      DomicileRefNumber,
      workType,
      // contactInfo,//realtime identity verification 
      language,
      verified,
    });

    res.json({ success: true });
  } catch (e) {
    next(e);
  }
};



const getWorkerProfile = async (req, res, next) => {
  try {
    const uid = req.user.uid;

    const profile = await getWorkerProfileService(uid);

    console.log(profile)

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
  createWorkerProfile,
  getWorkerProfile,
};
