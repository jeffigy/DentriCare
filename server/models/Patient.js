const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const patientSchema = new mongoose.Schema(
  {
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    fname: {
      type: string,
      required: true,
    },
    mname: {
      type: string,
      required: true,
    },
    lname: {
      type: string,
      required: true,
    },
    bday: {
      type: number,
      required: true,
    },
    address: {
      type: string,
      required: true,
    },
    phoneNum: {
      type: number,
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
