import {
  IValidationFunctions,
  IValidationMap,
} from "../types/validation.types";
import { array, boolean, date, mixed, number, string } from "yup";

import { EControls } from "../types/common.types";
import { IConnectionMode } from "../types/forms.types";
import { IGenericControls } from "../types/controls/controls.types";
import axios from "axios";

const typeValidationMap: IValidationMap = {
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
const validationFunctions: IValidationFunctions = {
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

export const initForm = (
  controls: IGenericControls[],
  endpointPath: string,
  idForEdit: any,
  connectionMode: IConnectionMode
) => {
  const initialFormData: any = {};
  const validationSchema: any = {};
  let dataSet: any = {};
  controls.forEach(
    ({ name, type, defaultValue, validations, url, options }: any) => {
      initialFormData[name] = defaultValue ?? defaultValueMap[type as never];
      if (optionsComponents.includes(type) && url) {
        if (options)
          console.log(
            Date.now(),
            `El control ${name} tiene url y opciones, los datos que mostrará vendrán del servicio correspondiente`
          );
        dataSet[name] = url;
      }
      if (validations) {
        validationSchema[name] = typeValidationMap[type as never];
        Object.keys(validations).forEach((validatorKey) => {
          const validator = validationFunctions[validatorKey];
          if (validator) {
            validationSchema[name] = validator(validationSchema[name], {
              ...validations[validatorKey],
              type,
            });
          }
        });
      }
      // dataset = fillDataset(dataset, connectionMode);
    }
  );
  return { initialFormData, validationSchema, dataSet };
};
const optionsComponents = ["select", "autocomplete", "radio"];
const defaultValueMap: Record<EControls, string | number | string[] | boolean> =
  {
    autocomplete: "",
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
const fillDataset = (dataset: any, connectionMode: IConnectionMode) => {
  Object.keys(dataset).map((key) => {
    axios.get(dataset[key]).then(({ data }: any) => (dataset[key] = data));
  });
  return dataset;
};
