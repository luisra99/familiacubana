import { Dispatch } from "react";

export type Update =
  | { type: "set-initial-values"; initialFormData: any }
  | { type: "set-validation-schema"; validationSchema: any }
  | { type: "set-data-source"; dataSource: any };

export type CustomDispatch = Dispatch<Update>;
