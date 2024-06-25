import { useCallback, useEffect } from "react";

import { Grid, TextField } from "@mui/material";
import { useFormikContext } from "formik";
import { useLanguage } from "@/_pwa-framework/hooks/use-language";

export const BasicTextFields = ({
  id,
  gridValues,
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
  error,
  formValue,
  initialValue,
  multiline,
}: any) => {
  const { t } = useLanguage();
  const { setFieldValue, values } = useFormikContext();
  const handleChange = useCallback((e: any) => {
    onChange?.(e);
    setFieldValue(name, e.target.value, !!validations);
  }, []);

  useEffect(() => {
    setFieldValue(name, initialValue ?? "", !!validations);
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
      {/* {!!validations?.required&& <p style={{color:"red",marginLeft:"98%",marginTop:0,marginBottom:0, }}>*</p>} */}

      <TextField
        fullWidth
        id={id ?? name}
        name={name}
        multiline={!!multiline}
        minRows={multiline?.minRows}
        maxRows={multiline?.maxRows}
        label={t(label)}
        color={color}
        focused={focused}
        placeholder={placeholder}
        disabled={disabled?.(values)}
        sx={sx}
        value={formValue ?? ""}
        error={!!error}
        helperText={error}
        onKeyDown={(event: any) => {
          if (pattern && !pattern.test(event.key) && event.keyCode != 8) {
            event.preventDefault();
          }
        }}
        onChange={handleChange}
      />
    </Grid>
  );
};
