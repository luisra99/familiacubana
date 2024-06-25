import {
  FormularioAdicionarServicios,
  adicionarModificarvehiculos,
  formulario5,
  localesDeLaVivienda,
} from "@/app/user-interfaces/forms/forms.config";

import { Button } from "@mui/material";
import GenericForm from "@/_pwa-framework/genforms/components/form-components/form.generic";
import Meta from "@/_pwa-framework/components/Meta";
import useModalState from "@/_pwa-framework/hooks/form/use-form-manager";
import { useState } from "react";

function Condicion_de_vivienda() {
  const { modalActions } = useModalState();
  const [id, setid] = useState<any>(null);
  return (
    <>
      <Meta title="Controles" />
      <Button onClick={() => modalActions.open("test")}>
        Materiales predominates de la vivienda
      </Button>{" "}
      <Button onClick={() => modalActions.open("1")}>
        Locales de la vivienda
      </Button>{" "}
      <Button onClick={() => modalActions.open("2")}>
        Servicio de la vivienda
      </Button>{" "}
      <Button onClick={() => modalActions.open("3")}>
        Adicionar vehiculos y equipos
      </Button>{" "}
      <Button onClick={() => modalActions.open("4")}>
        Modificar vehiculos y equipos
      </Button>{" "}
      <Button onClick={() => setid(1)}>Test editar</Button>
      <Button onClick={() => setid(null)}>Limpiar ID</Button>
      <GenericForm
        name="test"
        controls={formulario5}
        title="Materiales predominates de la vivienda"
        description=""
        endpointPath="persona"
        showSpecificDescription={false}
        idForEdit={id}
        modalType="fullWith"
      />
      <GenericForm
        name="1"
        controls={localesDeLaVivienda}
        title="Locales de la vivienda"
        description=""
        endpointPath="persona"
        showSpecificDescription={false}
        idForEdit={id}
        modalType="fullWith"
      />
      <GenericForm
        name="2"
        controls={FormularioAdicionarServicios}
        title="Servicios de la vivienda"
        description=""
        endpointPath="persona"
        showSpecificDescription={false}
        idForEdit={id}
        modalType="fullWith"
      />
      <GenericForm
        name="3"
        controls={adicionarModificarvehiculos}
        title="Servicios de la vivienda"
        description=""
        endpointPath="persona"
        showSpecificDescription={false}
        idForEdit={id}
        modalType="fullWith"
      />
      <GenericForm
        name="4"
        controls={adicionarModificarvehiculos}
        title="Servicios de la vivienda"
        description=""
        endpointPath="persona"
        showSpecificDescription={false}
        idForEdit={id}
        modalType="fullWith"
      />
    </>
  );
}

export default Condicion_de_vivienda;
