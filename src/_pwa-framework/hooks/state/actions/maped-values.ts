import {
  IValidationFunctions,
  IValidationMap,
} from "@/_pwa-framework/genforms/types/validation.types";
import { array, boolean, date, mixed, number, string } from "yup";

import { EControls } from "@/_pwa-framework/genforms/types/common.types";

export const defaultValueMap: Record<
  EControls,
  string | number | string[] | boolean | null
> = {
  autocomplete: [],
  check: false,
  date: "",
  number: "",
  radio: false,
  rating: 0,
  select: [],
  slider: 0,
  switch: false,
  text: "",
  time: "",
  component: false,
};
export const typeValidationMap: IValidationMap = {
  text: string(),
  select: string(),
  date: date(),
  number: number(),
  autocomplete: array(),
  check: boolean(),
  radio: boolean(),
  rating: number(),
  slider: number(),
  switch: boolean(),
  time: date(),
  component: mixed(),
};
export const validationFunctions: IValidationFunctions = {
  required: (schema: any, { message }: any) => schema.required(message),
  length: (schema: any, { message, value }: any) =>
    schema.length(value, `${message} ${value}`),
  min: (schema: any, { message, value }: any) =>
    schema.min(value, `${message} ${value}`),
  max: (schema: any, { message, value }: any) =>
    schema.max(value, `${message} ${value}`),
  moreThan: (schema: any, { message, value }: any) =>
    schema.moreThan(value, message),
  lessThan: (schema: any, { message, value }: any) =>
    schema.lessThan(value, message),
  integer: (schema: any, { message }: any) => schema.integer(message),
  positive: (schema: any, { message }: any) => schema.positive(message),
  negative: (schema: any, { message }: any) => schema.negative(message),
  regular_expression: (schema: any, { message, value }: any) =>
    schema.matches(value, message),
  email: (schema: any, { message }: any) => schema.email(message),
  url: (schema: any, { message }: any) => schema.url(message),
  oneOf: (schema: any, { message, value }: any) => schema.oneOf(value, message),
};
