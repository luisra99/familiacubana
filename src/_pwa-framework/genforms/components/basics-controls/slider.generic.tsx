import { Box, Grid, Slider, Stack, Typography } from "@mui/material";
import { useCallback, useEffect } from "react";

import { useFormikContext } from "formik";

export const BasicSliderFields = ({
  name,
  label,
  disabled,
  sx,
  startIcon,
  endIcon,
  min,
  max,
  validations,
  initialValue,
  gridValues,
  formValue,
}: any) => {
  const { setFieldValue, values } = useFormikContext();

  const handleSliderChange = useCallback(
    (event: Event, newValue: number | number[]) => {
      setFieldValue(name, newValue, !!validations);
    },
    []
  );
  useEffect(() => {
    setFieldValue(name, initialValue ?? 0, !!validations);
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
      <Box sx={{ width: "90%" }}>
        <Typography id="input-slider" gutterBottom>
          {label}
        </Typography>
        <Stack spacing={2} direction="row" sx={{ m: 1 }} alignItems="center">
          {startIcon}
          <Slider
            name={name}
            min={min}
            max={max}
            value={formValue ?? 0}
            onChange={handleSliderChange}
            valueLabelDisplay="auto"
            sx={sx}
            disabled={disabled?.(values)}
          />
          {endIcon}
        </Stack>
      </Box>
    </Grid>
  );
};
