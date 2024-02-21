export type DentalNote = {
  _id: string;
  id: string;
  patient: string;
  teethType: string;
  teethNums: string[] | [];
  date: number;
  procedures: string[] | [];
  note: string;
  createdBy: string;
  updatedBy: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  procedureNames?: string[] | [];
};

export type DentalNoteFormValues = {
  date: number | Date;
  procedures: string[];
  note: string;
  teethType: string;
  teethNums: string[];
};
