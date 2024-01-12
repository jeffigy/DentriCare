const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const patientSchema = new mongoose.Schema(
  {
    createdBy: {
      type: String,
      required: true,
    },
    fname: {
      type: String,
      required: true,
    },
    mname: {
      type: String,
      required: true,
    },
    lname: {
      type: String,
      required: true,
    },
    bday: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

patientSchema.plugin(AutoIncrement, {
  inc_field: "patient",
  id: "PatientNums",
  start_seq: 1,
});

module.exports = mongoose.model("Patient", patientSchema);
