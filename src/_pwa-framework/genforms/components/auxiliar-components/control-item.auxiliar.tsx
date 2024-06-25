import { getControl } from "../../functions/render.controls";
import { IGenericControls } from "../../types/controls/controls.types";

export const GForm = ({
  controlArray,
  errors,
  initialFormData,
  values,
  dataSource,
}: {
  controlArray: IGenericControls[];
  errors: any;
  initialFormData: any;
  dataSource: any;
  values: any;
}) =>
  controlArray.map((control: IGenericControls) => {
    const Component = getControl(control.type);
    return (
      <Component
        {...control}
        key={control.name}
        initialValue={initialFormData[control.name]}
        formValue={values[control.name]}
        error={errors[control.name]}
        options={control.options ?? dataSource[control.name]}
      />
    );
  });
