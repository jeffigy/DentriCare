export type PaymentFormValues = {
  patient: string;
  type: string;
  date: number;
  notesAndProcedures: string[];
  total: number;
  remarks: string;
  planName: string;
  // initPayment: number | undefined | null;
  // initPaymentRemarks: string;
};
