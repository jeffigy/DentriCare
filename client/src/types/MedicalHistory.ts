export type MedicalHistory = {
  _id: string;
  id: string;
  patient: string;
  message: string;
  createdBy: string;
  updatedBy: string;
  createdAt: string;
  updatedAt: string;
  patientName: string;
};

export type MedicalHistoryFormValues = {
  message: string;
};
