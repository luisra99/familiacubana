import { FormularioEviel } from "@/app/user-interfaces/forms/forms.config";
import GenericForm from "@/_pwa-framework/genforms/components/form-components/form.generic";
import Meta from "@/_pwa-framework/components/Meta";

function Salud() {
  return (
    <>
      <Meta title="Salud" />

      <GenericForm
        name="6"
        controls={FormularioEviel}
        title="Grado de Autonomía y situación de discapacidad"
        endpointPath="/persona"
        showSpecificDescription={false}
      />
    </>
  );
}

export default Salud;
