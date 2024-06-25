import { forwardRef } from "react";
import { IMaskInput } from "react-imask";

export const MaskControl = forwardRef<HTMLInputElement, any>(
  function TextMaskCustom(props, ref) {
    const { onChange, ...other } = props;
    return (
      <IMaskInput
        {...other}
        definitions={{
          "#": /[1-9]/,
        }}
        inputRef={ref}
        onAccept={(value: any) => onChange({ name: props.name, value })}
        overwrite
      />
    );
  }
);
