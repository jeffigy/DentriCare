import * as Yup from "yup";
export const installmentPaymentValidation = Yup.object({
  date: Yup.number().required("Date is required"),
  amount: Yup.number().required("Amount is required"),
  remarks: Yup.string().nullable().notRequired(),
});
