export type InstallmentPayment = {
  _id: string;
  id: string;
  payment: string;
  date: number;
  amount: number;
  remarks?: string;
  createdBy: string;
  updatedBy: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type InstallmentPaymentFormValues = {
  date: number;
  amount: number;
  remarks?: string;
};
