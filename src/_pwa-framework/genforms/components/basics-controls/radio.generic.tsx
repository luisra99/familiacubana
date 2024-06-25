import { Grid, FormControl, FormLabel, RadioGroup } from "@mui/material";
import { useCallback, useEffect, useState } from "react";

import { Radios } from "../auxiliar-components/radios-items.auxiliar";
import useFormDataSource from "@/_pwa-framework/hooks/form/use-form-data-source";
import { useFormikContext } from "formik";

export const BasicRadioFields = ({
  id,
  gridValues,
  name,
  label,
  disabled,
  sx,
  radios,
  direction,
  labelPlacement,
  validations,
  formValue,
  initialValue,
  onChangeCallback,
}: any) => {
  const [dataSource] = useFormDataSource();
  const [items, setItems] = useState(dataSource?.[name] ?? radios);
  const { setFieldValue, values } = useFormikContext();

  const handleChange = useCallback((event: any) => {
    onChangeCallback?.(event);
    setFieldValue(name, event.target.value, !!validations);
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
      <FormControl id={id ?? name} disabled={disabled?.(values)}>
        <FormLabel>{label}</FormLabel>
        <RadioGroup
          name={name}
          row={direction === "row"}
          value={formValue}
          onChange={handleChange}
          sx={sx}
        >
          <Radios items={items} labelPlacement={labelPlacement} />
        </RadioGroup>
      </FormControl>
    </Grid>
  );
};
