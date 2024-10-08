import * as Colors from "@mui/material/colors";
import * as Icons from "@mui/icons-material";

import { SxProps } from "@mui/system/styleFunctionSx/styleFunctionSx";

export type IconNames = keyof typeof Icons;
export type IconColor = keyof typeof Colors;
export type IconProps = {
  iconName: IconNames;
};

export type ICommonProps = {
  name: string;
  label: string;
  id?: string;
  placeholder?: string;
  sx?: SxProps;
  gridValues?: IGridValues;
  gridSx?: SxProps;
  disabled?: IDisableFunction;
  hidden?: IDisableFunction;
  onChange?: IOnChangeFunction;
  options?: Object;
  disabledOnEdit?: boolean;
};

export type IOptionsProps = ICommonProps & {
  group?: boolean;
  options?: any[];
  defaultValue?: string | string[];
  url?: string;
};
export type IMultipleOptionsProps = {
  multiple: "native" | "check" | "chips";
};

export type IInputProps = ICommonProps & {
  color?: "primary" | "secondary" | "success" | "error" | "info" | "warning";
  fullWidth?: boolean;
  focused?: boolean;
  defaultValue?: string;
};

export type ITimeControls = ICommonProps & {
  disableFuture?: boolean;
  disablePast?: boolean;
  maxDate?: string;
  minDate?: string;
  defaultValue?: string;
  //localeText
};

export type IRadios = {
  denominacion: string;
  idconcepto: string;
};

export type IChecks = ICommonProps & {
  labelPlacement?: "top" | "start" | "bottom" | "end";
  color?: ColorValueHex | IconColor;
  defaultValue?: boolean;
};

export type ICustomIcons = {
  customIcons?: IAlternateIcons;
};

export type IDisableFunction = (args?: any) => boolean;
export type IOnChangeFunction = (event?: any, refs?: any) => void;

export type ControlDictionary = Record<EControls, (props: any) => any>;
export type ColorValueHex = `#${string}`;
export type EControls =
  | "scanner"
  | "text"
  | "number"
  | "select"
  | "multiselect"
  | "autocomplete"
  | "date"
  | "time"
  | "radio"
  | "check"
  | "switch"
  | "slider"
  | "rating"
  | "component";
export type EControlsForValidate =
  | "text"
  | "number"
  | "select"
  | "autocomplete"
  | "multiselect"
  | "date"
  | "time"
  | "radio"
  | "check"
  | "switch"
  | "slider"
  | "component"
  | "rating";

type IAlternateIcons = {
  outlinedIcon: IconNames;
  filledIcon: IconNames;
};
export type IGridValues = {
  xs?: IBreakPointsValues;
  sm?: IBreakPointsValues;
  md?: IBreakPointsValues;
  lg?: IBreakPointsValues;
  xl?: IBreakPointsValues;
};
type IBreakPointsValues = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
