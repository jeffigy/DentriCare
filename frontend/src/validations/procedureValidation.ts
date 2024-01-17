import * as Yup from "yup";

export const newProcedureValidation = Yup.object({
  name: Yup.string().required("Procedure name is required"),
  amount: Yup.number()
    .typeError("Amount must be a number")
    .required("Amount is required"),
  createdBy: Yup.string().nullable(),
});

export const editProcedureValidation = Yup.object({
  name: Yup.string().required("Procedure name is required"),
  amount: Yup.number()
    .typeError("Amount must be a number")
    .required("Amount is required"),
  updatedBy: Yup.string().nullable(),
});
