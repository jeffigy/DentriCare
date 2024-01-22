import * as Yup from "yup";

export const dentalNoteValidation = Yup.object({
  date: Yup.number().required("Date is required"),
  procedures: Yup.array()
    .of(Yup.string())
    .min(1, "At least one procedure is required"),
  note: Yup.string().nullable().notRequired(),
  teethType: Yup.string().nullable().notRequired(),
  teethNums: Yup.array().of(Yup.string()).nullable().notRequired(),
});
