import * as Yup from "yup";

export const medicalHistoryValidation = Yup.object({
  message: Yup.string().required("Message is required"),
});
