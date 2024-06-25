import { FormularioAdicionarServicios } from "@/app/user-interfaces/forms/forms.config";
import GenericForm from "@/_pwa-framework/genforms/components/form-components/form.generic";
import Meta from "@/_pwa-framework/components/Meta";

function Servicios() {
  return (
    <>
      <Meta title="Servicios" />
      <GenericForm
        name="11"
        controls={FormularioAdicionarServicios}
        title="Adicionar Servicios y equipamientos del Hogar"
        description=""
        endpointPath="/persona"
        showSpecificDescription={false}
      />
    </>
  );
}

export default Servicios;
