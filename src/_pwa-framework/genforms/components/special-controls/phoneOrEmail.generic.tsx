import { MaskControl } from "../auxiliar-components/masked.auxiliar";
import { TextField } from "@mui/material";
import { useFormikContext } from "formik";

export const BasicPhoneOrEmailFields = ({
  id,
  gridSx,
  initialValue,
  name,
  label,
  color,
  disabled,
  hidden,
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
        mask: [
          { mask: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/ },
          { mask: "+53 ########" },
        ],
      },
    },
  };
  const { setFieldValue, setFieldTouched, values, touched, errors } =
    useFormikContext();

  const error = (touched as any)[name] && (errors as any)[name];
  const value = (values as any)[name];
  const handleChange = (e: any) => {
    setFieldValue(name, e.value, false);
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

// ^\+53 \d{8}$|^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$
