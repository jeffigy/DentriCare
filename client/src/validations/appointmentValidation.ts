import * as Yup from "yup";

export const appointmentValidation = Yup.object({
  patient: Yup.object({
    value: Yup.string().required("Patient is required"),
    label: Yup.string().required(),
  }),
  date: Yup.number().required("Date is required"),
  startTime: Yup.number().nullable().notRequired(),
  endTime: Yup.number().nullable().notRequired(),
  remarks: Yup.string().nullable().notRequired(),
});
