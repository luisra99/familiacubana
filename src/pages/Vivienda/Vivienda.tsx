import GenericForm from "@/_pwa-framework/genforms/components/form-components/form.generic";
import Meta from "@/_pwa-framework/components/Meta";
import { formulario5 } from "@/app/user-interfaces/forms/forms.config";

function Vivienda() {
  return (
    <>
      <Meta title="Vivienda" />
      <GenericForm
        name="5"
        controls={formulario5}
        title="Detalles de la vivienda"
        endpointPath="/persona"
        showSpecificDescription={false}
      />
    </>
  );
}

export default Vivienda;
