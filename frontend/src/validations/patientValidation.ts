import * as Yup from "yup";
//TODO: redo this validation later on
export const newPatientValidation = Yup.object({
  fname: Yup.string().required("Required"),
  mname: Yup.string().required("Required"),
  lname: Yup.string().required("Required"),
  bday: Yup.number().required("Required"),
  address: Yup.string().required("Required"),
  phone: Yup.number().required("Required"),
  createdBy: Yup.string().required("Required"),
});
