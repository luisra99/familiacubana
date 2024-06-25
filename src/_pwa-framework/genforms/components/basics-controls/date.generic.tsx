import { useCallback, useEffect } from "react";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { MobileDatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { useFormikContext } from "formik";
import { Grid } from "@mui/material";

export const BasicDateFields = ({
  name,
  gridValues,
  label,
  disabled,
  sx,
  validations,
  formValue,
  initialValue,
}: any) => {
  const { setFieldValue, values } = useFormikContext();

  const handleChange = useCallback((newValue: any) => {
    setFieldValue(name, newValue.format("DD/MM/YYYY"), !!validations);
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
        <MobileDatePicker
          label={label}
          name={name}
          disabled={disabled?.(values)}
          value={dayjs(formValue, "DD/MM/YYYY")}
          sx={{ ...sx, width: "100%" }}
          onChange={handleChange}
        />
      </LocalizationProvider>
    </Grid>
  );
};
