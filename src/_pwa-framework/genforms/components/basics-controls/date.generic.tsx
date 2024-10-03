import { FormControl, FormHelperText, Grid } from "@mui/material";
import { useCallback, useEffect } from "react";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { MobileDatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { useFormikContext } from "formik";

export const BasicDateFields = ({
  name,
  gridValues,
  label,
  disabled,
  gridSx,
  hidden,
  sx,
  validations,
  disabledOnEdit,
  editMode,
  initialValue,
}: any) => {
  const { setFieldValue, setFieldTouched, values, touched, errors } =
    useFormikContext();

  const error = (touched as any)[name] && (errors as any)[name];
  const value = (values as any)[name];

  const handleChange = useCallback((newValue: any) => {
    setFieldValue(name, newValue.format("DD/MM/YYYY"), true);
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
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <FormControl sx={{ ...sx, width: "100%" }}>
          <MobileDatePicker
            label={
              <label>
                {label}
                {validations?.required && <b style={{ color: "red" }}> * </b>}
              </label>
            }
            name={name}
            disabled={(editMode && disabledOnEdit) || disabled?.(values)}
            value={dayjs(value, "DD/MM/YYYY")}
            onChange={handleChange}
            format="DD/MM/YYYY"
          />
          <FormHelperText sx={{ color: "#d32f2f" }}>{error}</FormHelperText>
        </FormControl>
      </LocalizationProvider>
    </Grid>
  );
};
