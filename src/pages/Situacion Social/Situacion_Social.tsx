import { Button } from "@mui/material";
import { FormularioIUSituacion } from "@/app/user-interfaces/forms/forms.config";
import GenericForm from "@/_pwa-framework/genforms/components/form-components/form.generic";
import Meta from "@/_pwa-framework/components/Meta";
import useModalState from "@/_pwa-framework/hooks/form/use-form-manager";
import { useState } from "react";

function Situacion_Social() {
  const { modalActions } = useModalState();
  const [id, setid] = useState<any>(null);
  return (
    <>
      <Meta title="Controles" />
      <Button onClick={() => modalActions.open("test")}>
        Situación Social
      </Button>{" "}
      <Button onClick={() => setid(1)}>Test editar</Button>
      <Button onClick={() => setid(null)}>Limpiar ID</Button>
      <GenericForm
        name="test"
        controls={FormularioIUSituacion}
        title="Situación Social"
        description=" "
        endpointPath="persona"
        showSpecificDescription={false}
        idForEdit={id}
        modalType="fullWith"
      />
    </>
  );
}

export default Situacion_Social;
