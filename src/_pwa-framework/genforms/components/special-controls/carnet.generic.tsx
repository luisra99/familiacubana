import { TextField } from "@mui/material";
import { useFormikContext } from "formik";
import { useState } from "react";
import validarCarnetIdentidad from "../../functions/checkCi.controls";

export const BasicCiFields = ({
  id,
  name,
  label,
  color,
  disabled,
  focused,
  placeholder,
  pattern,
  sx,
  onChange,
  validations,
}: any) => {
  const [value, setValue] = useState("");
  const { setFieldValue, values } = useFormikContext();
  const handleChange = (e: any) => {
    if (!validarCarnetIdentidad(e.target?.value)) {
      e.preventDefault();
    } else {
      onChange?.(e);
      setValue(e.target.value);
      console.log(Date.now(), name, e.target.value, !!validations);
      setFieldValue(name, e.target.value, !!validations);
    }
  };

  return (
    <TextField
      fullWidth
      id={id ?? name}
      name={name}
      label={label}
      color={color}
      focused={focused}
      placeholder={placeholder}
      disabled={disabled?.(values)}
      sx={sx}
      value={value}
      onChange={handleChange}
    />
  );
};
