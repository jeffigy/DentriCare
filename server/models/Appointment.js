const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const appointmentSchema = new mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Patient",
    },
    date: {
      type: Number,
      required: true,
    },
    startTime: {
      type: Number,
      required: false,
    },
    endTime: {
      type: Number,
      required: false,
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

appointmentSchema.plugin(AutoIncrement, {
  inc_field: "appointment",
  id: "AppointmentNums",
  start_seq: 1,
});

module.exports = mongoose.model("Appointment", appointmentSchema);
