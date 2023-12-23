import * as yup from "yup";

const passwordSchema = yup
  .string()
  .min(8, "Password must be at least 8 characters")
  .max(12, "Password must be at most 12 characters")
  .matches(
    /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>0-9]).*$/,
    "Password must contain at least 1 uppercase letter, 1 special character, and 1 number"
  );

export const newUserValidation = yup.object({
  fname: yup.string().required("First Name is required"),
  lname: yup.string().required("Last Name is required"),
  email: yup.string().email("Email is invalid").required("Email is required"),
  password: yup.string().concat(passwordSchema),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords does not match")
    .required("Confirm Password is required"),
  roles: yup.array().min(1, "At least one role is required"),
});

export const editUserValidation = yup.object({
  fname: yup.string().required("First Name is required"),
  lname: yup.string().required("Last Name is required"),
  email: yup.string().email("Email is invalid").required("Email is required"),
  // TODO: Fix password validation to allow empty string but when there is a value, it should follow the passwordSchema
  password: yup.string().nullable(),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords does not match"),
  roles: yup.array().min(1, "At least one role is required"),
});
