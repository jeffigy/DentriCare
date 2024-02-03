const MedicalHistory = require("../models/MedicalHistory");
const Patient = require("../models/Patient");

//* get all medical history
const getallMedicalHistory = async (req, res) => {
  const medicalHistories = await MedicalHistory.find().lean();

  if (!medicalHistories.length) {
    return res.status(400).json({ message: "No medical history found" });
  }

  const medicalHistoryWithPatient = await Promise.all(
    medicalHistories.map(async (medicalHistory) => {
      const patient = await Patient.findById(medicalHistory.patient).exec();

      return {
        ...medicalHistory,
        patientName: `${patient.fname} ${patient.mname} ${patient.lname}`,
      };
    })
  );

  res.json(medicalHistoryWithPatient);
};

//* get all medical history by patient id
const getallMedicalHistoryByPatientid = async (req, res) => {
  const { id } = req.params;
  const medicalHistories = await MedicalHistory.find({ patient: id }).lean();

  if (!medicalHistories.length) {
    return res.status(400).json({ message: "No medical history found" });
  }

  const medicalHistoryWithPatient = await Promise.all(
    medicalHistories.map(async (medicalHistory) => {
      const patient = await Patient.findById(medicalHistory.patient).exec();

      return {
        ...medicalHistory,
        patientName: `${patient.fname} ${patient.mname} ${patient.lname}`,
      };
    })
  );

  res.json(medicalHistoryWithPatient);
};

//* create new medical history

const newMedicalHistory = async (req, res) => {
  const { patient, message, createdBy } = req.body;

  if (!message) {
    return res.status(400).json({ message: "Message is required" });
  }

  const medicalHistoryObj = {
    patient,
    message,
    createdBy,
  };
  const medicalHistory = await MedicalHistory.create(medicalHistoryObj);

  if (medicalHistory) {
    return res
      .status(201)
      .json({ message: "New medical history successfully created" });
  } else {
    return res
      .status(400)
      .json({ message: "Invalid medical history data received" });
  }
};

//* update medical history
const updateMedicalHistory = async (req, res) => {
  const { id, message, updatedBy } = req.body;

  if (!message) {
    return res.status(400).json({ message: "Message is required" });
  }

  const medicalHistory = await MedicalHistory.findById(id).exec();

  if (!medicalHistory) {
    return res.status(400).json({ message: "Medical History not found" });
  }

  medicalHistory.message = message;
  medicalHistory.updatedBy = updatedBy;

  const updatedMedicalHistory = await medicalHistory.save();

  if (updateMedicalHistory) {
    return res.status(201).json({ message: "Medical history updated" });
  } else {
    return res
      .status(400)
      .json({ message: "Invalid medical history data received" });
  }
};

//* delete medical history
const deleteMedicalHistory = async (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ message: "Id is required" });
  }

  const medicalHistory = await MedicalHistory.findByIdAndDelete(id).exec();

  if (!medicalHistory) {
    return res.status(404).json({ message: "Medical history not found" });
  }
  return res.status(200).json({ message: "Medical history deleted" });
};

module.exports = {
  getallMedicalHistory,
  getallMedicalHistoryByPatientid,
  newMedicalHistory,
  updateMedicalHistory,
  deleteMedicalHistory,
};
