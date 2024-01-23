const express = require("express");
const router = express.Router();
const appointmentsController = require("../controllers/appointmentsController");
// const verifyJWT = require("../middleware/verifyJWT");

// router.use(verifyJWT);

router
  .route("/")
  .get(appointmentsController.getAllAppointments)
  .post(appointmentsController.newAppointment)
  .patch(appointmentsController.updateAppointment)
  .delete(appointmentsController.deleteAppointment);

module.exports = router;
