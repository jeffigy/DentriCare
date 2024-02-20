const Patient = require("../models/Patient");
const Appointment = require("../models/Appointment");
const DentalNote = require("../models/DentalNote");
const MedicalHistory = require("../models/MedicalHistory");
const Payment = require("../models/Payment");

//* get all patients
const getAllPatients = async (req, res) => {
  const patients = await Patient.find().lean();

  if (!patients?.length) {
    return res.status(400).json({ message: "no patients found" });
  }

  res.json(patients);
};

//* create new patient
const createNewPatient = async (req, res) => {
  const { createdBy, fname, mname, lname, bday, address, phone } = req.body;

  if (
    !createdBy ||
    !fname ||
    !mname ||
    !lname ||
    typeof bday !== "number" ||
    !address ||
    !phone
  ) {
    return res.status(400).json({ message: "all fields are required" });
  }

  const duplicate = await Patient.findOne({ fname, mname, lname })
    .collation({
      locale: "en",
      strength: 2,
    })
    .lean()
    .exec();

  if (duplicate) {
    return res.status(409).json({ message: "Duplicate Patient" });
  }

  const patientObj = {
    createdBy,
    fname,
    mname,
    lname,
    bday,
    address,
    phone: String(phone),
  };
  const patient = await Patient.create(patientObj);

  if (patient) {
    return res.status(201).json({ message: "new patient created" });
  } else {
    return res.status(400).json({ message: "Invalid patient data received" });
  }
};

//* update patient
const updatePatient = async (req, res) => {
  const { id, fname, mname, lname, bday, address, phone, updatedBy } = req.body;

  if (!id || !fname || !mname || !lname || !bday || !address || !phone) {
    return res.status(400).json({ message: "all fields are required" });
  }

  const patient = await Patient.findById(id).exec();

  if (!patient) {
    return res.status(400).json({ message: "Patient not found" });
  }

  const duplicate = await Patient.findOne({ fname, mname, lname })
    .collation({
      locale: "en",
      strength: 2,
    })
    .lean()
    .exec();

  if (duplicate && duplicate?._id.toString() !== id) {
    return res.status(409).json({ message: "Duplicate patient complete name" });
  }

  patient.fname = fname;
  patient.mname = mname;
  patient.lname = lname;
  patient.bday = bday;
  patient.phone = phone;
  patient.address = address;
  patient.updatedBy = updatedBy;

  const updatedPatient = await patient.save();
  res.json(
    `Patient ${updatedPatient.fname} ${updatedPatient.mname} ${updatedPatient.lname} was updated`
  );
};

//* delete patient
const deletePatient = async (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ message: "Patient ID required" });
  }

  const patientHasAppointments = await Appointment.findOne({
    patient: id,
  }).exec();

  const patientHasDentalNotes = await DentalNote.findOne({
    patient: id,
  }).exec();

  const patientHasMedicalHistory = await MedicalHistory.findOne({
    patient: id,
  }).exec();

  const patientHasPayments = await Payment.findOne({
    patient: id,
  }).exec();

  if (
    patientHasAppointments ||
    patientHasDentalNotes ||
    patientHasMedicalHistory ||
    patientHasPayments
  ) {
    return res
      .status(400)
      .json({ message: "Patient has related records, cannot be deleted" });
  }

  const patient = await Patient.findById(id).exec();

  if (!patient) {
    return res.status(400).json({ message: "Patient not found" });
  }

  const result = await patient.deleteOne();
  const reply = `Patient ${result.fname} ${result.mname} ${result.lname} has been deleted`;
  res.json(reply);
};

module.exports = {
  getAllPatients,
  createNewPatient,
  updatePatient,
  deletePatient,
};
