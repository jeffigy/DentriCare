const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const dentalNoteSchema = new mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Patient",
    },
    teethType: {
      type: String,
      required: false,
    },
    teethNums: {
      type: [Number],
      default: [],
      required: false,
    },
    date: {
      type: Number,
      required: true,
    },
    procedures: {
      type: [mongoose.Schema.Types.ObjectId],
      default: [],
      required: true,
      ref: "Procedure",
    },
    note: {
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

dentalNoteSchema.plugin(AutoIncrement, {
  inc_field: "dentalNote",
  id: "DentalNoteNums",
  start_seq: 1,
});

module.exports = mongoose.model("DentalNote", dentalNoteSchema);
