export type Payment = {
  _id: string;
  id: string;
  patient: string;
  type: string;
  date: number;
  notesAndProcedures?: string[];
  total: number;
  remarks?: string;
  planName?: string;
  createdBy: string;
  updatedBy: string;
  createdAt: string;
  updatedAt: string;
  balance: number;
  status: string;
  __v: number;
};
