const express = require("express");
const router = express.Router();
const patientsController = require("../controllers/patientsController");

router
  .route("/")
  .get(patientsController.getAllPatients)
  .post(patientsController.createNewPatient)
  .patch(patientsController.updatePatient)
  .delete(patientsController.deletePatient);

module.exports = router;
