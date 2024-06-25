import { FormControlLabel, Grid, Switch } from "@mui/material";
import { useCallback, useEffect } from "react";

import { useFormikContext } from "formik";

export const BasicSwitchFields = (props: any) => {
  const {
    id,
    name,
    label,
    disabled,
    sx,
    labelPlacement,
    color,
    defaultValue,
    initialValue,
    gridValues,
    formValue,
  } = props;

  const style: any = {
    ...sx,
    "& .MuiSwitch-switchBase.Mui-checked": {
      color,
    },
    "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
      backgroundColor: color,
    },
  };
  const { setFieldValue, values } = useFormikContext();

  const handleChange = useCallback((event: any) => {
    setFieldValue(name, event?.target?.checked, false);
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
      <FormControlLabel
        name={name}
        id={id ?? name}
        control={<Switch sx={style} />}
        label={label}
        checked={formValue}
        disabled={disabled?.(values)}
        onChange={handleChange}
        labelPlacement={labelPlacement}
      />
    </Grid>
  );
};
