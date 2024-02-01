export type Patient = {
  _id?: string;
  id: string;
  createdBy: string;
  fname: string;
  mname: string;
  lname: string;
  bday: number;
  address: string;
  phone: string;
  createdAt: string;
  updatedAt: string;
  updatedBy: string;
  patient: string;
  __v?: number;
};

export type PatientFormValues = {
  fname: string;
  mname: string;
  lname: string;
  bday: number | Date;
  address: string;
  phone: string;
};
