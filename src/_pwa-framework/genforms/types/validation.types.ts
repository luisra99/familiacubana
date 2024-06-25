import { Schema } from "yup";
import { EControls } from "./common.types";

export type ITextValidation = {
  required?: IRequiredValidation;
  regex?: IRegexValidation;
  email?: IEmailValidation;
  url?: IUrlValidation;
  lowercase?: ILowerCaseValidation;
  uppercase?: IUppercaseValidation;
  trim?: ITrimValidation;
  length?: ILimitsProps;
} & ILimitsValidation;

export type IPhoneOrEmail = {
  required?: IRequiredValidation;
  regex?: IRegexValidation;
  email?: IEmailValidation;
} & ILimitsValidation;

export type INumberValidation = {
  required?: IRequiredValidation;
  length?: ILimitsProps;
  positive?: IPositiveValidation;
  negative?: INegativeValidation;
  integer?: IIntegerValidation;
} & IComparativeValidations &
  ILimitsValidation;

export type IDateValidation = {} & ILimitsValidation;

export type IRadioValidations = {
  required?: IRequiredValidation;
};

export type ISelectValidation = {
  length?: IArrayLengthValidation;
} & ILimitsValidation;

export type IRatingValidations = ILimitsValidation & IComparativeValidations;
export type ISliderValidations = IRatingValidations;

type IRequiredValidation = ICommonValidationsProps;
type IEmailValidation = ICommonValidationsProps;
type IUrlValidation = ICommonValidationsProps;
type ILowerCaseValidation = ICommonValidationsProps;
type IUppercaseValidation = ICommonValidationsProps;
type ITrimValidation = ICommonValidationsProps;
type INegativeValidation = ICommonValidationsProps;
type IPositiveValidation = ICommonValidationsProps;
type IIntegerValidation = ICommonValidationsProps;

type IRegexValidation = {
  value: RegExp;
} & ICommonValidationsProps;

type IArrayLengthValidation = {
  value: number;
} & ICommonValidationsProps;

type ICommonValidationsProps = {
  message: string;
};

type ILimitsProps = {
  value: number;
} & ICommonValidationsProps;

type ILessThanValidations = {
  value: number;
} & ICommonValidationsProps;

type IMoreThanValidations = {
  value: number;
} & ICommonValidationsProps;

type ILimitsValidation = {
  min?: ILimitsProps;
  max?: ILimitsProps;
};

type IComparativeValidations = {
  lessThan?: ILessThanValidations;
  moreThan?: IMoreThanValidations;
};
export type IValidationMap = Record<EControls, Schema>;
export type IValidationSchemaMap = {
  required: IRequiredSchema;
  length: ILengthSchema;
  min: IMinSchema;
  max: IMaxSchema;
  moreThan: IMoreThanSchema;
  lessThan: ILessThanSchema;
  integer: IIntegerSchema;
  positive: IPositiveSchema;
  negative: INegativeSchema;
  regular_expression: IRegExpSchema;
  email: IEmailSchema;
  url: IUrlSchema;
  oneOf: IOneOfSchema;
};

export type EValidations =
  | "required"
  | "length"
  | "email"
  | "url"
  | "regular_expression"
  | "min"
  | "max"
  | "integer"
  | "moreThan"
  | "lessThan"
  | "positive"
  | "negative"
  | "oneOf";
export type IValidationFunctions = Record<
  string,
  (schema: any, params: any) => any
>;
export type IRequiredSchema = {
  required: (schema: any, { message }: any) => any;
};
export type ILengthSchema = {
  length: (schema: any, { message, value }: any) => any;
};
export type IMinSchema = { min: (schema: any, { message, value }: any) => any };
export type IMaxSchema = { max: (schema: any, { message, value }: any) => any };
export type IMoreThanSchema = {
  moreThan: (schema: any, { message, value }: any) => any;
};
export type ILessThanSchema = {
  lessThan: (schema: any, { message, value }: any) => any;
};
export type IIntegerSchema = {
  integer: (schema: any, { message }: any) => any;
};
export type IPositiveSchema = {
  positive: (schema: any, { message }: any) => any;
};
export type INegativeSchema = {
  negative: (schema: any, { message }: any) => any;
};
export type IRegExpSchema = {
  regular_expression: (schema: any, { message, value }: any) => any;
};
export type IEmailSchema = { email: (schema: any, { message }: any) => any };
export type IUrlSchema = { url: (schema: any, { message }: any) => any };
export type IOneOfSchema = {
  oneOf: (schema: any, { message, value }: any) => any;
};
