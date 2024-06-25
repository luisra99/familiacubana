import { IGenericControls } from "./controls/controls.types";

export type IGForm = {
  name: string;
  title: string;
  endpointPath: string;
  controls: IGenericControls[];
  showSpecificDescription?: boolean;
  idForEdit?: string | number;
  modalType?: "xs" | "sm" | "md" | "lg" | "xl" | "fullWith";
  description?: string;
  descriptionOnCreate?: string;
  descriptionOnEdit?: string;
  applyButton?: boolean;
  connectionMode?: IConnectionMode;
  setIdFunction?: (idForEdit: any) => void;
  submitFunction?: (values: any, name: string, idForEdit: any) => void;
  getByIdFunction?: (idForEdit: any) => any;
  hideButtons?: boolean;
  nextButton?: { text: string; action: (values?: any) => void };
  prevButton?: { text: string; action: (values?: any) => void };
  saveOnDirty?: boolean;
  saveButton?: string;
  updateButton?: string;
  dataAction?: { label: string; action: (values: any) => void }[];
};
export type IConnectionMode =
  | "multiple"
  | "unified"
  | "grouped"
  | "onDemand"
  | undefined;
