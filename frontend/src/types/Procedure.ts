export type Procedure = {
  [x: string]: string | number | boolean | undefined;
  _id?: string;
  id: string;
  name: string;
  amount: number;
  createdBy: string;
  updatedBy: string;
  createdAt: string;
  updatedAt: string;
  procedure: string;
  __v?: number;
};
