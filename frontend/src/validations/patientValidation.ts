import * as Yup from "yup";

const phoneRegExp = /^09\d{9}$/;

export const newPatientValidation = Yup.object({
  fname: Yup.string().required("First name is required"),
  mname: Yup.string().required("Middle name is required"),
  lname: Yup.string().required("Last name is required"),
  bday: Yup.number().required("Birthday is required"),
  phone: Yup.string().matches(phoneRegExp, "Phone number is not valid"),
  address: Yup.string().required("Address is required"),
  createdBy: Yup.string().required("Required"),
});
