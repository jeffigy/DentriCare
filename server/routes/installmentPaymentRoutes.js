const express = require("express");
const router = express.Router();
const installmentPaymentController = require("../controllers/installmentPaymentsController");
const verifyJWT = require("../middleware/verifyJWT");

router.use(verifyJWT);
router
  .route("/")
  .get(installmentPaymentController.getAllInstallmentPayments)
  .post(installmentPaymentController.newInstallmentPayment)
  .patch(installmentPaymentController.updateInstallmentPayment)
  .delete(installmentPaymentController.deleteInstallmentPayment);

router
  .route("/:paymentId")
  .get(installmentPaymentController.getInstallmentPaymentsByPaymentId);

module.exports = router;
