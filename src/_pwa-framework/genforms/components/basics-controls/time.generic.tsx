import { FormControl, FormHelperText, Grid } from "@mui/material";
import { useCallback, useEffect } from "react";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { MobileTimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { useFormikContext } from "formik";

export const BasicTimeFields = (props: any) => {
  const {
    name,
    gridSx,
    label,
    disabled,
    hidden,
    sx,
    validations,
    gridValues,
    disabledOnEdit,
    editMode,
    initialValue,
  } = props;
  const { setFieldValue, setFieldTouched, values, touched, errors } =
    useFormikContext();

  const error = (touched as any)[name] && (errors as any)[name];
  const value = (values as any)[name];
  const handleChange = useCallback((newValue: any) => {
    setFieldValue(name, newValue.format("HH:mm:ss"), false);
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
      <FormControl sx={{ ...sx, width: "100%" }}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <MobileTimePicker
            label={
              <label>
                {label}
                {validations?.required && <b style={{ color: "red" }}> * </b>}
              </label>
            }
            name={name}
            value={dayjs(value, "HH:mm:ss")}
            disabled={(editMode && disabledOnEdit) || disabled?.(values)}
            onChange={handleChange}
          />
        </LocalizationProvider>{" "}
        <FormHelperText sx={{ color: "#d32f2f" }}>{error}</FormHelperText>
      </FormControl>
    </Grid>
  );
};
