import { Checkbox, FormControlLabel, Grid } from "@mui/material";
import { useCallback, useEffect, useState } from "react";

import { useFormikContext } from "formik";

export const BasicCheckFields = ({
  id,
  gridValues,
  name,
  label,
  disabled,
  sx,
  labelPlacement,
  color,
  customIcons,
  initialValue,
  formValue,
}: any) => {
  const { setFieldValue, values } = useFormikContext();
  const [iconProps, setIconProps] = useState<any>({});
  const [style, setStyle] = useState<any>(sx ?? {});
  const handleChange = useCallback((event: any) => {
    setFieldValue(name, event?.target?.checked, false);
  }, []);

  useEffect(() => {
    setFieldValue(name, initialValue ?? false, false);
  }, [initialValue]);

  useEffect(() => {
    setStyle((style: any) => {
      style["&.Mui-checked"] = { color };
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
      <FormControlLabel
        id={id ?? name}
        name={name}
        control={<Checkbox sx={style} {...iconProps} />}
        label={label}
        checked={formValue}
        disabled={disabled?.(values)}
        onChange={handleChange}
        labelPlacement={labelPlacement}
      />
    </Grid>
  );
};
