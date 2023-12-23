export type UserFormValues = {
  fname: string;
  lname: string;
  email: string;
  password: string;
  confirmPassword: string;
  roles: string[];
  active?: boolean;
};
