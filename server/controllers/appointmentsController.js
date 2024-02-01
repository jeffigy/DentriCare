const Appointment = require("../models/Appointment");
const Patient = require("../models/Patient");

//* get all appointments
const getAllAppointments = async (req, res) => {
  const appointments = await Appointment.find().lean();

  if (!appointments?.length) {
    return res.status(400).json({ message: "no appointments found" });
  }

  const appointmentsWithPatient = await Promise.all(
    appointments.map(async (appointment) => {
      const patient = await Patient.findById(appointment.patient).exec();

      // if (!patient) {
      //   console.error(`No patient found for appointment ${appointment._id}`);
      //   return appointment;
      // }

      return {
        ...appointment,
        patientName: patient.fname + " " + patient.mname + " " + patient.lname,
      };
    })
  );

  res.json(appointmentsWithPatient);
};

//* get all appointment by patient id
const getAllAppointmentsByPatientId = async (req, res) => {
  const { id } = req.params;
  const appointments = await Appointment.find({ patient: id }).lean();
  if (!appointments?.length) {
    return res.status(400).json({ message: "no patient appointments found" });
  }

  const appointmentsWithPatient = await Promise.all(
    appointments.map(async (appointment) => {
      const patient = await Patient.findById(appointment.patient).exec();

      return {
        ...appointment,
        patientName: patient.fname + " " + patient.mname + " " + patient.lname,
      };
    })
  );

  res.json(appointmentsWithPatient);
};

//* create new appointment
const newAppointment = async (req, res) => {
  const { patient, date, startTime, endTime, remarks, createdBy } = req.body;

  if (!date || !patient) {
    return res.status(400).json({ message: "Date and patient is required" });
  }

  const duplicate = await Appointment.findOne({ date, patient })
    .collation({
      locale: "en",
      strength: 2,
    })
    .lean()
    .exec();

  if (duplicate) {
    return res.status(409).json({ message: "Duplicate Appointment" });
  }

  const appointmentObj = {
    patient,
    date,
    startTime,
    endTime,
    createdBy,
  };

  if (remarks) appointmentObj.remarks = remarks;
  if (endTime) appointmentObj.endTime = endTime;
  if (startTime) appointmentObj.startTime = startTime;

  const appointment = await Appointment.create(appointmentObj);

  if (appointment) {
    return res.status(201).json({ message: "new appointment created" });
  } else {
    return res
      .status(400)
      .json({ message: "Invalid appointment data received" });
  }
};

//* update appointment
const updateAppointment = async (req, res) => {
  const { id, patient, date, startTime, endTime, remarks, updatedBy } =
    req.body;

  if (!date || !patient) {
    return res.status(400).json({ message: "Date and patient is required" });
  }
  const appointment = await Appointment.findById(id).exec();

  if (!appointment) {
    return res.status(400).json({ message: "Appointment not found" });
  }

  appointment.date = date;
  appointment.patient = patient;
  appointment.updatedBy = updatedBy;

  if (remarks) appointment.remarks = remarks;
  if (endTime) appointment.endTime = endTime;
  if (startTime) appointment.startTime = startTime;

  const updatedAppointment = await appointment.save();

  if (updatedAppointment) {
    return res.status(201).json({ message: "appointment updated" });
  } else {
    return res
      .status(400)
      .json({ message: "Invalid appointment data received" });
  }
};

//* delete appointment
const deleteAppointment = async (req, res) => {
  const { id } = req.body;
  if (!id) {
    return res.status(400).json({ message: "id is required" });
  }
  const appointment = await Appointment.findByIdAndDelete(id).exec();
  if (!appointment) {
    return res.status(400).json({ message: "Appointment not found" });
  }
  return res.status(201).json({ message: "appointment deleted" });
};

module.exports = {
  getAllAppointments,
  getAllAppointmentsByPatientId,
  newAppointment,
  updateAppointment,
  deleteAppointment,
};
