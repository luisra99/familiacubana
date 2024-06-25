import { Autocomplete, Grid, TextField } from "@mui/material";
import { useCallback, useEffect, useState } from "react";

import useFormDataSource from "@/_pwa-framework/hooks/form/use-form-data-source";
import { useFormikContext } from "formik";

export const BasicAutocompleteFields = ({
  id,
  gridValues,
  name,
  label,
  disabled,
  placeholder,
  sx,
  multiple,
  options,
  validations,
  initialValue,
  formValue,
}: any) => {
  const [dataSource] = useFormDataSource();

  const [items, setItems] = useState(dataSource?.[name] ?? options ?? []);
  const { setFieldValue, values } = useFormikContext();

  useEffect(() => {
    setFieldValue(name, initialValue, !!validations);
  }, [initialValue]);

  const handleChange = useCallback(
    (e: any, newValue: any, reason: any, details: any) => {
      if (multiple && !!details) {
        const cloned = structuredClone(formValue);
        const selectedOption = JSON.stringify(details.option);
        const index = cloned.findIndex(
          (option: any) => JSON.stringify(option) == selectedOption
        );
        if (index === -1) {
          cloned.push(details.option);
        } else {
          cloned.splice(index, 1);
        }
        setFieldValue(name, cloned, !!validations);
        return;
      }
      setFieldValue(name, newValue, !!validations);
    },
    []
  );

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
      <Autocomplete
        id={id ?? name}
        fullWidth
        options={items}
        multiple={!!multiple}
        autoComplete
        disabled={disabled?.(values)}
        onChange={handleChange}
        value={formValue}
        sx={sx}
        autoHighlight
        getOptionLabel={(option: any) => option?.label ?? ""}
        renderInput={(params: any) => (
          <TextField {...params} label={label} placeholder={placeholder} />
        )}
      />
    </Grid>
  );
};
