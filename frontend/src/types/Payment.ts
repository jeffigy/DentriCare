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
  initPayment?: number;
  initPaymentRemarks?: string;
  createdBy: string;
  updatedBy: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};
