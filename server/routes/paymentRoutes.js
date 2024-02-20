const express = require("express");
const router = express.Router();
const paymentsController = require("../controllers/paymentsController");
const verifyJWT = require("../middleware/verifyJWT");

router.use(verifyJWT);

router
  .route("/")
  .get(paymentsController.getAllPayments)
  .post(paymentsController.newPayment)
  .patch(paymentsController.updatePayment)
  .delete(paymentsController.deletePayment);

router.route("/:id").get(paymentsController.getAllPaymentByPatientId);

module.exports = router;
