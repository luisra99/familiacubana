import { MaskControl } from "../auxiliar-components/masked.auxiliar";
import { TextField } from "@mui/material";
import { useFormikContext } from "formik";
import { useState } from "react";

export const BasicMailFields = ({
  id,
  name,
  label,
  color,
  disabled,
  focused,
  placeholder,
  sx,
  decimalScale,
  prefix,
  format,
  avoidSeparator,
  fixDecimalSeparator,
  mask,
  validations,
}: any) => {
  const fieldProps = {
    InputProps: {
      inputComponent: MaskControl as any,
      inputProps: {
        mask: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
      },
    },
  };
  const [value, setValue] = useState("");
  const { setFieldValue, values } = useFormikContext();
  const handleChange = (e: any) => {
    setFieldValue(name, e.value, !!validations);
    setValue(e.value);
  };

  return (
    <TextField
      fullWidth
      id={id ?? name}
      name={name}
      label={label}
      color={color}
      disabled={disabled?.(values)}
      focused={focused}
      placeholder={placeholder}
      sx={sx}
      onChange={handleChange}
      value={value}
      {...fieldProps}
      variant="outlined"
    />
  );
};
