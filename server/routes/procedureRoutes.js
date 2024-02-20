const express = require("express");
const router = express.Router();
const proceduresController = require("../controllers/proceduresController");
const verifyJWT = require("../middleware/verifyJWT");

router.use(verifyJWT);

router
  .route("/")
  .get(proceduresController.getAllProcedures)
  .post(proceduresController.createNewProcedure)
  .patch(proceduresController.updateProcedure)
  .delete(proceduresController.deleteProcedure);

module.exports = router;
