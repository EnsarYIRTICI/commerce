import { IStatic } from "./IStatic";

export interface IUser {
  id: number;
  name: string;
  lastname: string;
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string | null;
  lastPasswordChange: string | null;
  role: IRole;
  status: IStatus;
}

export interface IRole extends IStatic {}
export interface IStatus extends IStatic {}
