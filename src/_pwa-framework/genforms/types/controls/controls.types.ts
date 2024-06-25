import {
  IChecks,
  ICommonProps,
  ICustomIcons,
  IInputProps,
  IOptionsProps,
  IRadios,
  ITimeControls,
  IconColor,
  IconNames,
} from "../common.types";
import {
  IDateValidation,
  INumberValidation,
  IRadioValidations,
  IRatingValidations,
  ISelectValidation,
  ISliderValidations,
  ITextValidation,
} from "../validation.types";

import { ICustomCOmponent } from "../controls.types";

export type IGenericControls =
  | ITextField
  | ISelect
  | INumberField
  | IAutocomplete
  | IDatePicker
  | ITimePicker
  | IRadio
  | ICheck
  | ISwitch
  | ISlider
  | IRating
  | ICustomCOmponent;

export type ITextField = {
  /**
   * Tipo de control que desea crear.
   */
  type: "text";
  pattern?: RegExp;
  validations?: ITextValidation;
  hidden?:any;
  multiline?: multiline;
} & IInputProps;
type multiline =
  | {
      minRows?: number;
      maxRows?: number;
    }
  | boolean;
  
  
export type IPhoneOrEmail = {
  /**
   * Tipo de control que desea crear.
   */
  type: "phoneOrEmail";
  validations?: IPhoneOrEmail;
} & IInputProps;

export type INumberField = {
  /**
   * Tipo de control que desea crear.
   */
  type: "number";
  format: "units" | "finance" | "other";
  mask?: string;
  decimalScale?: number;
  fixDecimalSeparator?: boolean;
  avoidSeparator?: boolean;
  prefix?: string;
  validations?: INumberValidation;
} & IInputProps;

export type ISelect = {
  /**
   * Tipo de control que desea crear.
   */
  type: "select";
  validations?: ISelectValidation;
} & IOptionsProps;

export type IAutocomplete = {
  /**
   * Tipo de control que desea crear.
   */
  type: "autocomplete";
  validations?: ISelectValidation;
  loadingText?: string;
} & IOptionsProps;

export type IDatePicker = {
  /**
   * Tipo de control que desea crear.
   */
  type: "date";
  validations?: IDateValidation;
} & ITimeControls;

export type ITimePicker = {
  /**
   * Tipo de control que desea crear.
   */
  validations?: IDateValidation;
  type: "time";
} & ITimeControls;

export type IRadio = {
  /**
   * Tipo de control que desea crear.
   */
  type: "radio";
  direction?: "row" | "col";
  labelPlacement?: "top" | "start" | "bottom" | "end";
  radios?: IRadios[];
  validations?: IRadioValidations;
  url?: string;
  defaultValue?: string;
} & ICommonProps;

export type ICheck = {
  /**
   * Tipo de control que desea crear.
   */
  type: "check";
} & IChecks &
  ICustomIcons;

export type ISwitch = {
  /**
   * Tipo de control que desea crear.
   */
  type: "switch";
} & IChecks;

export type IRating = {
  /**
   * Tipo de control que desea crear.
   */
  type: "rating";
  precision?: boolean;
  max?: number;
  color?: IconColor;
  defaultValue?: number;
  validations?: IRatingValidations;
} & ICommonProps &
  ICustomIcons;

export type ISlider = {
  /**
   * Tipo de control que desea crear.
   */
  type: "slider";
  startIcon?: IconNames;
  endIcon?: IconNames;
  step?: number;
  mark?: boolean;
  min: number;
  defaultValue?: number;
  max: number;
  validations?: ISliderValidations;
  valueLabelDisplay?: "auto" | "on" | "off";
} & ICommonProps;
