import {
  Box,
  Checkbox,
  Chip,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useCallback, useEffect, useState } from "react";

import useFormDataSource from "@/_pwa-framework/hooks/form/use-form-data-source";
import { useFormikContext } from "formik";

export const BasicSelectFields = ({
  id,
  gridValues,
  name,
  label,
  disabled,
  sx,
  multiple,
  options,
  placeholder,
  group,
  formValue,
  validations,
  initialValue,
  error,
  hidden,
  onChange,
}: any) => {
  // console.log("hiden", hidden?.name == "hidden");
  const [dataSource] = useFormDataSource();
  const [items, setItems] = useState(options ?? dataSource?.[name]);
  const ref = useFormikContext();
  const { setFieldValue, values } = useFormikContext();
  useEffect(() => {
    setFieldValue(
      name,
      Array.isArray(initialValue) ? initialValue : [initialValue],
      !!validations
    );
  }, [initialValue]);

  // const handleChange = useCallback((event: SelectChangeEvent<string[]>) => {
  //   const {
  //     target: { value },
  //   } = event;
  //   onChange?.(event, values);
  //   setFieldValue(
  //     name,
  //     typeof value === "string" ? value.split(",") : value,
  //     !!validations
  //   );
  // }, []);
  const handleChange = useCallback((event: SelectChangeEvent<string[]>) => {
    const {
      target: { value },
    } = event;
    onChange?.(event, ref);
    // const values= typeof value === "string" ?  value.split(",") : value;
    // const flitrevalues =values.filter((option)=>{
    //   return items.some((item:any)=> item.idconcepto === option);
    // })
    setFieldValue(
      name,
      typeof value === "string" ? value.split(",") : value,
      !!validations
    );
  }, []);
  const handleClear = useCallback(() => {
    setFieldValue(name, multiple ? "" : [], !!validations);
  }, []);
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
      <FormControl fullWidth error={!!error}>
        <InputLabel id={`${id ?? name}-label`}>{label}</InputLabel>
        <Select
          id={id ?? name}
          name={name}
          label={label}
          value={
            formValue
              ? Array.isArray(formValue)
                ? formValue
                : [formValue]
              : []
          }
          onChange={handleChange}
          sx={sx}
          multiple={!!multiple}
          disabled={disabled?.(values)}
          hidden={hidden?.(values)}
          renderValue={(selected: any) =>
            multiple == "chips" ? (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {items
                  ?.filter(
                    ({ idconcepto }: any) =>
                      selected?.includes(`${idconcepto}` as never)
                  )
                  .map((item: any) => (
                    <Chip
                      key={`${item.idconcepto}`}
                      label={item.denominacion}
                    />
                  ))}
              </Box>
            ) : (
              items
                ?.filter(({ idconcepto }: any) =>
                  selected.includes(`${idconcepto}` as never)
                )
                .map(({ denominacion }: any) => denominacion)
                .join(", ")
            )
          }
        >
          {items?.map((option: any) => (
            <MenuItem
              value={`${option.idconcepto}`}
              key={`${option.idconcepto}`}
            >
              {multiple == "check" && (
                <Checkbox
                  checked={formValue.includes(`${option.idconcepto}`)}
                />
              )}
              <InputLabel>{option.denominacion}</InputLabel>
            </MenuItem>
          ))}
        </Select>
        <FormHelperText>{error}</FormHelperText>
      </FormControl>
    </Grid>
  );
};
