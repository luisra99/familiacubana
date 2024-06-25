import { Dispatch } from "react";

export type Update =
  | { type: "log-in"; username: string; password: string }
  | { type: "is-log-in"; code: string }
  | { type: "log-out" }
  | { type: "sign-up"; userInfo: Record<string, any> }
  | { type: "restore-password"; email: string };

export type IUserInfo = {
  user: string;
  image?: string;
  email?: string;
  phone?: string;
  identification?: IPersonIdentification;
  role: string;
  menu?: Record<string, IMenuItem>;
  accessProfile?: Record<string, any>;
  structure?: IStructure;
  metadata?: Record<string, any>;
  ISUser?: true;
};
type IStructure = {
  id: string | number;
  denomination?: string;
  level?: string | number;
  levelDenomination?: string;
  pad?: string | number;
  dependencies?: string;
  subordination?: string;
};

type IMenuItem = {
  title: string;
  image: any;
};
type IPersonIdentification = {
  id?: string;
  name?: string;
  familyName?: string;
  lastName?: string;
  address?: string;
  volume?: string;
  folio?: string;
  sex?: string;
};
export type CustomDispatch = Dispatch<Update>;
