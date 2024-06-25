import {
  defaultValueMap,
  typeValidationMap,
  validationFunctions,
} from "./maped-values";

import { IConnectionMode } from "@/_pwa-framework/genforms/types/forms.types";
import { IGenericControls } from "@/_pwa-framework/genforms/types/controls/controls.types";
import { getItems } from "@/_pwa-framework/genforms/functions/service.controls";
import { getRecordForEdit } from "@/_pwa-framework/genforms/functions/service.form";

export const initializeForm = async (
  controls: IGenericControls[],
  endpointPath: string,
  idForEdit: any,
  connectionMode: IConnectionMode,
  getByIdFunction?: Function,
  args?: any
): Promise<{
  initialFormData: any;
  validationSchema: any;
  dataSource: any;
}> => {
  let initialFormData: any = {};
  const validationSchema: any = {};
  const dataSource: any = {};
  await Promise.all(
    controls.map(
      async ({ name, type, defaultValue, validations, url, options }: any) => {
        initialFormData[name] = defaultValue ?? defaultValueMap[type as never];
        if (optionsComponents.includes(type) && url) {
          if (options)
            console.log(
              Date.now(),
              `El control ${name} tiene url y opciones, los datos que mostrará vendrán del servicio correspondiente`
            );
          dataSource[name] = await getItems({ name, url });
        }
        if (validations) {
          validationSchema[name] = typeValidationMap[type as never];
          Object.keys(validations).forEach((validatorKey) => {
            const validator = validationFunctions[validatorKey];
            if (validator) {
              validationSchema[name] = validator(
                validationSchema[name],
                validations[validatorKey]
              );
            }
          });
        }
      }
    )
  );
  if (idForEdit) {
    const editValues =
      typeof getByIdFunction === "function"
        ? await getByIdFunction(idForEdit)
        : await getRecordForEdit(idForEdit, endpointPath, args);
    initialFormData =
      typeof getByIdFunction === "function" ? editValues[0] : editValues;
  }
  // console.log("initialFormData", initialFormData[0]);
  return {
    initialFormData,
    validationSchema,
    dataSource,
  };
};
const optionsComponents = ["select", "autocomplete", "radio"];
