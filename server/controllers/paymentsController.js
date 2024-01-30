const Payment = require("../models/Payment");
const DentalNote = require("../models/DentalNote");

//* get all payments
const getAllPayments = async (req, res) => {
  const payments = await Payment.find().lean();
  if (!payments?.length) {
    return res.status(400).json({ message: "no payments found" });
  }

  res.json(payments);

  //   const paymentsWithNotes = await Promise.all(
  //     payments.map(async (payment) => {
  //       const notes = await Promise.all(
  //         payment.notesAndProcedures.map(async (note) => {
  //           const noteObj = await DentalNote.findById(note).exec();
  //           return noteObj;
  //         })
  //       );

  //       return {
  //         ...payment,
  //         notes,
  //       };
  //     })
  //   );
};

//* create new payment
const newPayment = async (req, res) => {
  const {
    patient,
    type,
    date,
    notesAndProcedures,
    total,
    remarks,
    planName,
    // initPayment,
    // initPaymentRemarks,
    createdBy,
  } = req.body;

  if (!patient || !type || !date || !total || !createdBy) {
    return res.status(400).json({
      message: "patient, payment type, date, total, and createdBy are required",
    });
  }

  const paymentObj = {
    patient,
    type,
    date,
    total,
    createdBy,
  };
  if (notesAndProcedures) paymentObj.notesAndProcedures = notesAndProcedures;
  if (remarks) paymentObj.remarks = remarks;
  if (planName) paymentObj.planName = planName;
  // if (initPayment) paymentObj.initPayment = initPayment;
  // if (initPaymentRemarks) paymentObj.initPaymentRemarks = initPaymentRemarks;

  const payment = await Payment.create(paymentObj);

  if (payment) {
    return res.status(201).json({ message: "new payment created" });
  } else {
    return res.status(400).json({ message: "Invalid payment data received" });
  }
};

//* update payment
const updatePayment = async (req, res) => {
  const {
    id,
    patient,
    type,
    date,
    notesAndProcedures,
    total,
    remarks,
    planName,
    // initPayment,
    // initPaymentRemarks,
    updatedBy,
  } = req.body;

  if (!id || !patient || !type || !date || !total || !updatedBy) {
    return res.status(400).json({
      message:
        "id, patient, payment type, date, total, and updatedBy are required",
    });
  }

  const payment = await Payment.findById(id).exec();

  if (!payment) {
    return res.status(400).json({ message: "Payment not found" });
  }

  payment.patient = patient;
  payment.type = type;
  payment.date = date;
  payment.total = total;
  payment.updatedBy = updatedBy;

  payment.notesAndProcedures = notesAndProcedures;
  payment.remarks = remarks;
  payment.planName = planName;
  // payment.initPayment = initPayment;
  // payment.initPaymentRemarks = initPaymentRemarks;

  const updatedPayment = await payment.save();

  if (updatedPayment) {
    return res.status(200).json({ message: "Payment updated" });
  } else {
    return res.status(400).json({ message: "Invalid payment data received" });
  }
};

//* delete payment
const deletePayment = async (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ message: "id is required" });
  }

  const payment = await Payment.findByIdAndDelete(id).exec();

  if (!payment) {
    return res.status(400).json({ message: "Payment not found" });
  }

  return res.status(200).json({ message: "Payment deleted" });
};

module.exports = {
  getAllPayments,
  newPayment,
  updatePayment,
  deletePayment,
};
