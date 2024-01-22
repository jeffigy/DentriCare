const DentalNote = require("../models/DentalNote");
const Procedure = require("../models/Procedure");

//* get all dental notes
const getAllDentalNotes = async (req, res) => {
  const dentalNotes = await DentalNote.find().lean();

  if (!dentalNotes?.length) {
    return res.status(400).json({ message: "no dental notes found" });
  }

  const notesWithProcedure = await Promise.all(
    dentalNotes.map(async (note) => {
      const procedures = await Promise.all(
        note.procedures.map(async (procedure) => {
          const procedureObj = await Procedure.findById(procedure).exec();
          return procedureObj;
        })
      );

      return {
        ...note,
        procedureNames: procedures.map((procedure) => procedure.name),
      };
    })
  );

  res.json(notesWithProcedure);
};

//* create new dental note
const newDentalNote = async (req, res) => {
  const { teethType, teethNums, createdBy, date, procedures, note, patient } =
    req.body;

  if (!date || !procedures) {
    return res.status(400).json({ message: "date and procedure are required" });
  }

  const dentalNoteObj = {
    date,
    procedures,
    createdBy,
    patient,
  };

  if (teethType) dentalNoteObj.teethType = teethType;
  if (teethNums) dentalNoteObj.teethNums = teethNums;
  if (note) dentalNoteObj.note = note;

  const dentalNote = await DentalNote.create(dentalNoteObj);

  if (dentalNote) {
    return res.status(201).json({ message: "new dental note created" });
  } else {
    return res
      .status(400)
      .json({ message: "Invalid dental note data received" });
  }
};

//* update dental note
const updateDentalNote = async (req, res) => {
  const { id, teethType, teethNums, updatedBy, date, procedures, note } =
    req.body;

  if (!date || !procedures) {
    return res
      .status(400)
      .json({ message: "date and procedures are required" });
  }

  const dentalNote = await DentalNote.findById(id).exec();

  if (!dentalNote) {
    return res.status(400).json({ message: "Dental note not found" });
  }

  dentalNote.date = date;
  dentalNote.procedures = procedures;
  dentalNote.updatedBy = updatedBy;

  if (teethType) dentalNote.teethType = teethType;
  if (teethNums) dentalNote.teethNums = teethNums;
  if (note) dentalNote.note = note;

  const updatedDentalNote = await dentalNote.save();

  if (updatedDentalNote) {
    return res.status(200).json({ message: "Dental note updated" });
  } else {
    return res.status(400).json({ message: "Invalid dental note data" });
  }
};

//* delete dental note
const deleteDentalNote = async (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ message: "id is required" });
  }

  const dentalNote = await DentalNote.findByIdAndDelete(id).exec();

  if (!dentalNote) {
    return res.status(400).json({ message: "Dental note not found" });
  }

  return res.status(200).json({ message: "Dental note deleted" });
};

module.exports = {
  getAllDentalNotes,
  newDentalNote,
  updateDentalNote,
  deleteDentalNote,
};
