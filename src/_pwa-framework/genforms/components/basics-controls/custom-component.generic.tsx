import { Grid, SxProps } from "@mui/material";

import { useEffect } from "react";
import { useFormikContext } from "formik";

export const BasicCustomComponent = ({
  id,
  gridSx,
  initialValue,
  gridValues,
  name,
  label,
  disabled,
  hidden,
  sx,
  component,
  validations,
}: {
  id: any;
  gridSx: SxProps;
  initialValue: any;
  gridValues: any;
  name: any;
  label: any;
  disabled: any;
  hidden: any;
  sx: any;
  component: any;
  validations: any;
}) => {
  const { setFieldValue, setFieldTouched, values, touched, errors } =
    useFormikContext();

  const error = (touched as any)[name] && (errors as any)[name];
  const value = (values as any)[name];

  useEffect(() => {
    setFieldValue(name, initialValue ?? "", false);
  }, [initialValue]);

  return (
    <Grid
      item
      display={hidden?.(values) ? "none" : "unset"}
      xs={gridValues?.xs}
      sm={gridValues?.sm}
      md={gridValues?.md}
      lg={gridValues?.lg}
      xl={gridValues?.xl}
      sx={gridSx}
    >
      {component({
        id,
        name,
        label,
        disabled,
        hidden,
        sx,
        initialValue,
        validations,
        formValue: value,
        error,
        setFieldValue,
        setFieldTouched,
        values,
      })}
    </Grid>
  );
};
