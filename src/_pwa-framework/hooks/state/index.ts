import { useEffect, useReducer, useRef } from "react";
import { formReducer } from "./reducer";
import { IConnectionMode } from "@/_pwa-framework/genforms/types/forms.types";
import { IGenericControls } from "@/_pwa-framework/genforms/types/controls/controls.types";
import { initializeForm } from "./actions/form-data.actions";
import useFormDataSource from "../form/use-form-data-source";

export function useFormReducer(
  controls?: IGenericControls[],
  endpointPath?: string,
  idForEdit?: any,
  connectionMode?: IConnectionMode
) {
  const formReference = useRef<any>();
  const [, setDataSource] = useFormDataSource();
  const initForm = async (
    controls: IGenericControls[],
    endpointPath: string,
    idForEdit: any,
    connectionMode: IConnectionMode
  ): Promise<void> => {
    const { initialFormData, validationSchema, dataSource } =
      await initializeForm(controls, endpointPath, idForEdit, connectionMode);
    dispatchInitialFormData({ type: "set-initial-values", initialFormData });
    dispatchValidationSchema({
      type: "set-validation-schema",
      validationSchema,
    });
    setDataSource(dataSource);
  };
  const [validationSchema, dispatchValidationSchema] = useReducer(
    formReducer,
    null
  );
  const [initialFormData, dispatchInitialFormData] = useReducer(
    formReducer,
    null
  );

  useEffect(() => {
    if (!validationSchema && controls && endpointPath) {
      initForm(controls, endpointPath, idForEdit, connectionMode);
    }
  }, [validationSchema]);
  return {
    validationSchema,
    initialFormData,
    formReference,
    initForm,
  };
}
