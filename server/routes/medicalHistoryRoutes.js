const express = require("express");
const router = express.Router();
const medicalHistoryController = require("../controllers/medicalHistoryController");
const verifyJWT = require("../middleware/verifyJWT");

router.use(verifyJWT);

router
  .route("/")
  .get(medicalHistoryController.getallMedicalHistory)
  .post(medicalHistoryController.newMedicalHistory)
  .patch(medicalHistoryController.updateMedicalHistory)
  .delete(medicalHistoryController.deleteMedicalHistory);

router
  .route("/:id")
  .get(medicalHistoryController.getallMedicalHistoryByPatientid);

module.exports = router;
