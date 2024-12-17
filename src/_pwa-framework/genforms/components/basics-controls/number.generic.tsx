import { Grid, TextField } from "@mui/material";
import { useCallback, useEffect, useMemo } from "react";

import { NumericControl } from "../auxiliar-components/numeric.auxiliar";
import { useFormikContext } from "formik";

export const BasicNumberFields = ({
  id,
  gridSx,
  initialValue,
  gridValues,
  name,
  label,
  color,
  disabled,
  hidden,
  focused,
  placeholder,
  sx,
  decimalScale,
  prefix,
  format,
  avoidSeparator,
  fixDecimalSeparator,
  mask,
  validations,
  onChange,
  negativeValues,
  disabledOnEdit,
  editMode,
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
          allowNegative: negativeValues,
          fixdecimalseparator: fixDecimalSeparator,
        },
      },
    };
  }, [
    decimalScale,
    prefix,
    format,
    avoidSeparator,
    fixDecimalSeparator,
    negativeValues,
  ]);

  const { setFieldValue, setFieldTouched, values, touched, errors } =
    useFormikContext();

  const error = (touched as any)[name] && (errors as any)[name];
  const value = (values as any)[name];

  const handleChange = useCallback((e: any) => {
    onChange?.(e);
    setFieldValue(name, e.value, true);
    setFieldTouched(name);
  }, []);

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
      <TextField
        fullWidth
        id={id ?? name}
        name={name}
        label={
          <label>
            {label}
            {validations?.required && <b style={{ color: "red" }}> * </b>}
          </label>
        }
        color={color}
        disabled={(editMode && disabledOnEdit) || disabled?.(values)}
        focused={focused}
        placeholder={placeholder}
        sx={sx}
        value={value ?? ""}
        helperText={error}
        // error={error}
        onChange={handleChange}
        {...fieldProps}
        variant="outlined"
      />
    </Grid>
  );
};
