import { Box, Grid } from "@mui/material";
import { useFormikContext } from "formik";

export const BasicCustomComponent = ({
  id,
  gridValues,
  name,
  label,
  disabled,
  sx,
  initialValue,
  component,
  validations,
  formValue,
  error,
}: any) => {
  const { setFieldValue, values } = useFormikContext();

  return (
    <Grid
      item
      display={disabled?.(values) ? "none" : "unset"}
      xs={gridValues?.xs}
      sm={gridValues?.sm}
      md={gridValues?.md}
      lg={gridValues?.lg}
      xl={gridValues?.xl}
    >
      {component({
        id,
        name,
        label,
        disabled,
        sx,
        initialValue,
        validations,
        formValue,
        error,
        setFieldValue,
      })}
    </Grid>
  );
};
