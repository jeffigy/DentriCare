const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const paymentSchema = new mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Patient",
    },
    type: {
      type: String,
      required: true,
    },
    date: {
      type: Number,
      required: true,
    },
    notesAndProcedures: {
      type: [mongoose.Schema.Types.ObjectId],
      default: [],
      required: false,
      ref: "DentalNote",
    },
    total: {
      type: Number,
      required: true,
    },
    remarks: {
      type: String,
      required: false,
    },
    planName: {
      type: String,
      required: false,
    },
    initPayment: {
      type: Number,
      required: false,
    },
    initPaymentRemarks: {
      type: String,
      required: false,
    },
    createdBy: {
      type: String,
      required: false,
    },
    updatedBy: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

paymentSchema.plugin(AutoIncrement, {
  inc_field: "payment",
  id: "PaymentNums",
  start_seq: 1,
});

module.exports = mongoose.model("Payment", paymentSchema);
