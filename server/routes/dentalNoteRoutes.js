const express = require("express");
const router = express.Router();
const dentalNotesController = require("../controllers/dentalNotesController");
// const verifyJWT = require("../middleware/verifyJWT");

// router.use(verifyJWT);

router
  .route("/")
  .get(dentalNotesController.getAllDentalNotes)
  .post(dentalNotesController.newDentalNote)
  .patch(dentalNotesController.updateDentalNote)
  .delete(dentalNotesController.deleteDentalNote);

router.route("/:id").get(dentalNotesController.getAllDentalNotesByPatientId);

module.exports = router;
