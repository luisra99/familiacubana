import { Box, Grid, Rating, Typography } from "@mui/material";
import { useCallback, useEffect, useState } from "react";

import { useFormikContext } from "formik";

export const BasicRatingFields = ({
  id,
  gridValues,
  name,
  label,
  disabled,
  sx,
  customIcons,
  max,
  color,
  validations,
  initialValue,
  formValue,
}: any) => {
  const { setFieldValue, values } = useFormikContext();
  const [iconProps, setIconProps] = useState<any>({});
  const [style, setStyle] = useState<any>(sx ?? {});
  const handleChange = useCallback(
    (event: Event, newValue: number | number[]) => {
      setFieldValue(name, newValue, !!validations);
    },
    []
  );
  useEffect(() => {
    setFieldValue(name, initialValue ?? 0, !!validations);
  }, [initialValue]);
  useEffect(() => {
    setStyle((style: any) => {
      style["& .MuiRating-iconFilled"] = { color };
      style["& .MuiRating-iconHover"] = { color };
      return style;
    });
  }, [color]);

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
      <Box
        sx={{
          "& > legend": { mt: 2 },
        }}
      >
        <Typography component="legend">{label}</Typography>
        <Rating
          value={formValue}
          name={name}
          id={id ?? name}
          onChange={handleChange}
          sx={style}
          max={max}
          precision={0.5}
          disabled={disabled?.(values)}
          {...iconProps}
        />
      </Box>
    </Grid>
  );
};
