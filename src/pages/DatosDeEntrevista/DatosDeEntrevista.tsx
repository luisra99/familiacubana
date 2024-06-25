import GenericForm from "@/_pwa-framework/genforms/components/form-components/form.generic";
import Meta from "@/_pwa-framework/components/Meta";
import { formulario6 } from "@/app/user-interfaces/forms/forms.config";
import useModalState from "@/_pwa-framework/hooks/form/use-form-manager";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  crear,
  modificar,
  obtenerDatosPorLlave,
} from "@/app/user-interfaces/forms/models/controllers";

function DatosDeEntrevista() {
  const { modalActions } = useModalState();
  const [id, setid] = useState<any>(null);
  const navegar = useNavigate();

  const siguiente = () => {
    modalActions.open("estadoEntrevista");
  };
  const anterior = () => navegar("/otros");
  return (
    <>
      <Meta title="Controles" />
      <GenericForm
        name="test"
        controls={formulario6}
        title="Datos de la entrevista"
        description=""
        endpointPath="persona"
        showSpecificDescription={false}
        idForEdit={id}
        saveButton="Guardar"
        setIdFunction={setid}
        submitFunction={(values) => {
          if (id)
            modificar("dat_caracterizacion", "idcaracterizacion", id, values);
          else crear("dat_caracterizacion", values);
        }}
        getByIdFunction={(id) =>
          obtenerDatosPorLlave("dat_caracterizacion", "idcaracterizacion", id)
        }
        prevButton={{ text: "Anterior", action: anterior }}
        nextButton={{ text: "Finalizar caracterización", action: siguiente }}
      />
    </>
  );
}

export default DatosDeEntrevista;
