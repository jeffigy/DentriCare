const express = require("express");
const router = express.Router();
const patientsController = require("../controllers/patientsController");
const verifyJWT = require("../middleware/verifyJWT");
const upload = require("../middleware/multer");
// router.use(verifyJWT);

router
  .route("/")
  .get(patientsController.getAllPatients)
  .post(patientsController.createNewPatient)
  .patch(upload.single("avatar"), patientsController.updatePatient)
  .delete(patientsController.deletePatient);

module.exports = router;
