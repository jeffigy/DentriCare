export type Patient = {
  [x: string]: string | number | undefined;
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
  patient: string;
  __v?: number;
};
