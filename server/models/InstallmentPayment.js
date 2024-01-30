const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const installmentPaymentSchema = new mongoose.Schema(
  {
    payment: {
      type: mongoose.Schema.Types.ObjectId,
      reuqire: true,
      ref: "Payment",
    },
    amount: {
      type: Number,
      required: true,
    },
    date: {
      type: Number,
      required: true,
    },
    remarks: {
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

installmentPaymentSchema.plugin(AutoIncrement, {
  inc_field: "installmentPayment",
  id: "InstallmentPaymentNums",
  start_seq: 1,
});

module.exports = mongoose.model("InstallmentPayment", installmentPaymentSchema);
