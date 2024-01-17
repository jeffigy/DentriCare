const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const procedureSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
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

procedureSchema.plugin(AutoIncrement, {
  inc_field: "procedure",
  id: "ProcedureNums",
  start_seq: 1,
});

module.exports = mongoose.model("Procedure", procedureSchema);
