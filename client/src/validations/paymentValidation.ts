import * as Yup from "yup";

export const paymentValidation = Yup.object({
  patient: Yup.string().required("Patient is required"),
  type: Yup.string().required("Type is required"),
  date: Yup.number().required("Date is required"),
  notesAndProcedures: Yup.array().of(Yup.string()).nullable().notRequired(),
  total: Yup.number().required("Total is required"),
  remarks: Yup.string().nullable().notRequired(),
  planName: Yup.string().nullable().notRequired(),
});
