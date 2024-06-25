import { useCallback, useEffect, useMemo } from "react";

import { NumericControl } from "../auxiliar-components/numeric.auxiliar";
import { Grid, TextField } from "@mui/material";
import { useFormikContext } from "formik";

export const BasicNumberFields = ({
  id,
  gridValues,
  name,
  label,
  color,
  disabled,
  focused,
  placeholder,
  sx,
  decimalScale,
  prefix,
  format,
  avoidSeparator,
  fixDecimalSeparator,
  initialValue,
  mask,
  validations,
  formValue,
  onChange,
  error,
}: any) => {
  const fieldProps = useMemo(() => {
    return {
      InputProps: {
        inputComponent: NumericControl as any,
        inputProps: {
          decimalScale,
          prefix,
          format,
          avoidseparator: avoidSeparator,
          fixdecimalseparator: fixDecimalSeparator,
        },
      },
    };
  }, [decimalScale, prefix, format, avoidSeparator, fixDecimalSeparator]);
  const { setFieldValue, values } = useFormikContext();
  const handleChange = useCallback((e: any) => {
    onChange?.(e);
    setFieldValue(name, e.value, !!validations);
  }, []);
  useEffect(() => {
    setFieldValue(name, initialValue ?? "", !!validations);
  }, [initialValue]);

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
      <TextField
        fullWidth
        id={id ?? name}
        name={name}
        label={label}
        color={color}
        disabled={disabled?.(values)}
        focused={focused}
        placeholder={placeholder}
        sx={sx}
        error={!!error}
        helperText={error}
        onChange={handleChange}
        value={formValue ?? ""}
        {...fieldProps}
        variant="outlined"
      />
    </Grid>
  );
};
