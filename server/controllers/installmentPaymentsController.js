const InstallmentPayment = require("../models/InstallmentPayment");

//* get all installment payments
const getAllInstallmentPayments = async (req, res) => {
  const installmentPayments = await InstallmentPayment.find().lean();
  if (!installmentPayments?.length) {
    return res.status(400).json({ message: "No installment payments found" });
  }

  res.json(installmentPayments);
};

// //* get all installment by payment id
const getInstallmentPaymentsByPaymentId = async (req, res) => {
  const { paymentId } = req.params;

  const installmentPayments = await InstallmentPayment.find({
    payment: paymentId,
  }).lean();

  if (!installmentPayments?.length) {
    return res.status(400).json({
      message: "No installment payments found",
    });
  }

  res.json(installmentPayments);
};

//* create new installment payment
const newInstallmentPayment = async (req, res) => {
  const { payment, amount, date, remarks, createdBy } = req.body;

  if (!amount || !date) {
    return res.status(400).json({ message: "amount, and date are required" });
  }

  const installmentPaymentObj = {
    payment,
    amount,
    date,
    createdBy,
  };

  if (remarks) installmentPaymentObj.remarks = remarks;

  const installmentPayment = InstallmentPayment.create(installmentPaymentObj);

  if (installmentPayment) {
    return res.status(201).json({ message: "New installment payment created" });
  } else {
    return res
      .status(400)
      .json({ message: "invalid installment date received" });
  }
};

//* update installment payment
const updateInstallmentPayment = async (req, res) => {
  const { id, amount, date, remarks, updatedBy } = req.body;

  if (!id || !amount || !date) {
    return res.status(400).json({
      message: "amount, and date are required",
    });
  }

  const installmentPayment = await InstallmentPayment.findByIdAndUpdate(
    id
  ).exec();

  if (!installmentPayment) {
    return res.status(400).json({ message: "Install payment not found" });
  }

  installmentPayment.amount = amount;
  installmentPayment.date = date;
  installmentPayment.remarks = remarks;
  installmentPayment.updatedBy = updatedBy;

  const updatedInstallmentPayment = await installmentPayment.save();

  if (updatedInstallmentPayment) {
    return res.status(200).json(updatedInstallmentPayment);
  } else {
    return res
      .status(400)
      .json({ message: "failed to update installment payment" });
  }
};

//* delete installment payment
const deleteInstallmentPayment = async (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ message: "id is required" });
  }

  const installmentPayment = await InstallmentPayment.findByIdAndDelete(id);

  if (!installmentPayment) {
    return res.status(400).json({ message: "Installment payment not found" });
  }

  return res.status(200).json({ message: "Installment payment deleted" });
};

module.exports = {
  getAllInstallmentPayments,
  newInstallmentPayment,
  updateInstallmentPayment,
  deleteInstallmentPayment,
  getInstallmentPaymentsByPaymentId,
};
