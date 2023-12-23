export type User = {
  [x: string]: string | boolean | string[] | undefined;
  _id?: string;
  id: string;
  fname: string;
  lname: string;
  email: string;
  password: string;
  roles: string[];
  active?: boolean;
};
