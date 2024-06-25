import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { Formik, FormikProps } from "formik";
import { useCallback, useEffect, useRef, useState } from "react";

import { FormContainer } from "../auxiliar-components/form-container.auxiliar";
import { GForm } from "../auxiliar-components/control-item.auxiliar";
import { GridContainer } from "../auxiliar-components/grid-container.auxiliar";
import { IGForm } from "../../types/forms.types";
import Loading from "@/_pwa-framework/components/Loading";
import { initializeForm } from "@/_pwa-framework/hooks/state/actions/form-data.actions";
import { object } from "yup";
import { submitValues } from "../../functions/service.form";
import useModalState from "@/_pwa-framework/hooks/form/use-form-manager";

const GenericForm = ({
  title,
  name,
  endpointPath,
  controls,
  description,
  modalType,
  showSpecificDescription,
  descriptionOnCreate,
  descriptionOnEdit,
  idForEdit,
  connectionMode,
  hideButtons,
  setIdFunction,
  submitFunction,
  getByIdFunction,
  nextButton,
  prevButton,
  saveOnDirty,
  saveButton,
  updateButton,
  dataAction,
}: IGForm) => {
  const formReference = useRef<any>();
  const [initialFormData, setInitialFormData] = useState({});
  const [validationSchema, setValidationSchema] = useState(null);
  const [dataSource, setDataSource] = useState<any>({});
  const { modalActions } = useModalState();
  const submit = useCallback(
    (values: any) => {
      if (submitFunction) submitFunction(values, name, idForEdit);
      else submitValues(values, name, idForEdit, endpointPath);
    },
    [idForEdit]
  );
  useEffect(() => {
    initializeForm(
      controls,
      endpointPath,
      idForEdit,
      connectionMode,
      getByIdFunction
    ).then(({ initialFormData, validationSchema, dataSource }) => {
      // console.log(Date.now(), {
      //   initialFormData,
      //   validationSchema,
      //   dataSource,
      // });
      setInitialFormData(initialFormData);
      setValidationSchema(validationSchema);
      setDataSource(dataSource);
    });
  }, [idForEdit]);
  const handleClose = () => {
    modalActions.close;
    setIdFunction?.(null);
  };
  return initialFormData && validationSchema && formReference ? (
    <FormContainer
      modalType={modalType}
      name={name}
      setIdFunction={setIdFunction}
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContentText mx={3}>
        {showSpecificDescription
          ? idForEdit
            ? descriptionOnEdit ?? description
            : descriptionOnCreate ?? description
          : description}
      </DialogContentText>
      <Formik
        className={"formik-object"}
        validateOnChange
        initialValues={initialFormData}
        validationSchema={object().shape(validationSchema)}
        onSubmit={(values: any) => console.log(Date.now(), values)}
        innerRef={formReference}
      >
        {({ errors, values, isValid, dirty }: FormikProps<any>) => {
          // console.log(values);
          return (
            <>
              <DialogContent dividers={!!modalType}>
                <GridContainer>
                  <GForm
                    controlArray={controls}
                    dataSource={dataSource}
                    errors={errors}
                    values={values}
                    initialFormData={initialFormData}
                  />
                </GridContainer>
              </DialogContent>

              <Box sx={{ flexGrow: 1 }} />

              {/* <Button
                    onClick={() => {
                      formReference.current.resetForm();
                      formReference.current.setValues(initialFormData);
                    }}
                    color="info"
                  >
                    {idForEdit ? "Deshacer" : "Limpiar"}
                  </Button> */}

              {!hideButtons && (
                <DialogActions sx={{ justifyContent: " " }}>
                  {prevButton && (
                    <Button
                      onClick={() => {
                        prevButton?.action(values);
                      }}
                      color="primary"
                      variant="contained"
                    >
                      {prevButton?.text}
                    </Button>
                  )}
                  {modalType && (
                    <Button
                      onClick={() => {
                        modalActions.close(), setIdFunction?.(null);
                      }}
                      color="primary"
                      variant="contained"
                    >
                      Cancelar
                    </Button>
                  )}
                  {dataAction?.map((action: any) => (
                    <Button
                      onClick={() => {
                        action.action();
                      }}
                      color="primary"
                      variant="contained"
                    >
                      {action.label}
                    </Button>
                  ))}

                  {/* <Button
                    onClick={() => {
                      console.log(Date.now(), formReference?.current);
                      submit(formReference?.current.values);
                    }}
                    color={idForEdit ? "success" : "primary"}
                    variant="contained"
                    disabled={!isValid}
                  >
                    Crear hogar en la misma dirección
                  </Button>*/}
                  {/* <Button
                    onClick={() => {
                      console.log(Date.now(), formReference?.current);
                      submit(formReference?.current.values);
                    }}
                    color={idForEdit ? "success" : "primary"}
                    variant="contained"
                    disabled={!isValid}
                  >
                    Aplicar
                  </Button> */}

                  {nextButton && (
                    <Button
                      onClick={() => {
                        nextButton?.action(values);
                      }}
                      color="primary"
                      variant="contained"
                    >
                      {nextButton?.text}
                    </Button>
                  )}
                  <Button
                    onClick={() => {
                      // console.log(Date.now(), formReference?.current);
                      submit(formReference?.current.values);
                      modalActions.close();
                    }}
                    color={"primary"}
                    variant="contained"
                    disabled={!isValid || (!dirty && saveOnDirty)}
                  >
                    {idForEdit
                      ? updateButton ?? "Aceptar"
                      : saveButton ?? "Aceptar"}
                  </Button>
                </DialogActions>
              )}
            </>
          );
        }}
      </Formik>
    </FormContainer>
  ) : (
    <Loading />
  );
};
export default GenericForm;
