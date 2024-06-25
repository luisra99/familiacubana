import { useCallback, useEffect } from "react";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { MobileTimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { useFormikContext } from "formik";
import { Grid } from "@mui/material";

export const BasicTimeFields = (props: any) => {
  const {
    name,
    label,
    disabled,
    sx,
    validations,
    initialValue,
    formValue,
    gridValues,
  } = props;
  const { setFieldValue, values } = useFormikContext();
  const handleChange = useCallback((newValue: any) => {
    setFieldValue(name, newValue.format("HH:mm:ss"), !!validations);
  }, []);

  useEffect(() => {
    setFieldValue(name, initialValue ?? false, false);
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
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <MobileTimePicker
          label={label}
          name={name}
          value={dayjs(formValue, "HH:mm:ss")}
          disabled={disabled?.(values)}
          sx={{ ...sx, width: "100%" }}
          onChange={handleChange}
        />
      </LocalizationProvider>
    </Grid>
  );
};
