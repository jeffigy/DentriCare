const Procedure = require("../models/Procedure");

//* get all procedures
const getAllProcedures = async (req, res) => {
  const procedures = await Procedure.find().lean();

  if (!procedures?.length) {
    return res.status(400).json({ message: "no procedures found" });
  }

  res.json(procedures);
};

//* create new procedure
const createNewProcedure = async (req, res) => {
  const { name, amount, createdBy } = req.body;

  if (!name || !amount || !createdBy) {
    return res.status(400).json({ message: "all fields are required" });
  }

  const duplicate = await Procedure.findOne({ name })
    .collation({
      locale: "en",
      strength: 2,
    })
    .lean()
    .exec();

  if (duplicate) {
    return res.status(409).json({ message: "Duplicate Procedure" });
  }

  const procedureObj = {
    name,
    amount,
    createdBy,
  };
  const procedure = await Procedure.create(procedureObj);

  if (procedure) {
    return res.status(201).json({ message: "new procedure created" });
  } else {
    return res.status(400).json({ message: "Invalid procedure data received" });
  }
};

//* update procedure
const updateProcedure = async (req, res) => {
  const { id, name, amount, updatedBy } = req.body;

  if (!id || !name || !amount || !updatedBy) {
    return res.status(400).json({ message: "all fields are required" });
  }

  const procedure = await Procedure.findById(id).exec();

  if (!procedure) {
    return res.status(400).json({ message: "Procedure not found" });
  }

  const duplicate = await Procedure.findOne({ name })
    .collation({
      locale: "en",
      strength: 2,
    })
    .lean()
    .exec();

  if (duplicate && duplicate._id.toString() !== id) {
    return res.status(409).json({ message: "Duplicate Procedure" });
  }

  procedure.name = name;
  procedure.amount = amount;
  procedure.updatedBy = updatedBy;

  const updatedProcedure = await procedure.save();
  res.json(`Procedure ${updatedProcedure.name} was updated successfully`);
};

//* delete procedure
const deleteProcedure = async (req, res) => {
  const { id } = req.body;
  if (!id) {
    return res.status(400).json({ message: "Procedure ID is required" });
  }

  const procedure = await Procedure.findById(id).exec();

  if (!procedure) {
    return res.status(400).json({ message: "Procedure not found" });
  }

  const result = await procedure.deleteOne();
  const reply = `Procedure ${result.name} was deleted successfully`;
  res.json(reply);
};

module.exports = {
  getAllProcedures,
  createNewProcedure,
  updateProcedure,
  deleteProcedure,
};
