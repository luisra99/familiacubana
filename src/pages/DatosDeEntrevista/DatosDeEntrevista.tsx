import {
  crear,
  modificar,
  obtenerDatosPorLlave,
} from "@/app/user-interfaces/forms/models/controllers";

import GenericForm from "@/_pwa-framework/genforms/components/form-components/form.generic";
import { IGenericControls } from "@/_pwa-framework/genforms/types/controls/controls.types";
import Meta from "@/_pwa-framework/components/Meta";
import NotificationProvider from "@/_pwa-framework/sections/Notifications/provider";
import { SelectMiembros } from "@/utils/components/miembro";
import { Typography } from "@mui/material";
import { formulario6 } from "@/app/user-interfaces/forms/forms.config";
import { getHogar } from "@/app/hogarController/hogar.controller";
import useModalState from "@/_pwa-framework/hooks/form/use-form-manager";
import { useNavigate } from "react-router-dom";

function DatosDeEntrevista() {
  const { modalActions } = useModalState();
  const idhogar = getHogar() ?? 0;
  const notificar = NotificationProvider();
  const navegar = useNavigate();
  const obtenerObservaciones = async (id: any) => {
    const observ = await obtenerDatosPorLlave(
      "dat_hogar",
      "idcodigohogar",
      parseInt(id)
    );
    const datCarac = await obtenerDatosPorLlave(
      "dat_caracterizacion",
      "idcodigohogar",
      id
    );
    let result: any = {};
    if (datCarac.length) {
      result = datCarac[0];
      result.editMode = true;
    } else {
      result = {
        identrevistador: 1,
        hfin: "",
        hinicio: "",
        fechaentrev: "",
        observaciones: "",
        editMode: false,
      };
    }

    if (observ.length) {
      result = { ...result, ...observ[0] };
    }
    return result;
  };
  const siguiente = () => {
    modalActions.open("estadoEntrevista");
  };
  const miembros = SelectMiembros({
    label: "Miembro del hogar",
    name: "idmiembrohogar",
    gridValues: {
      xl: 3,
      lg: 3,
      md: 3,
      sm: 6,
      xs: 12,
    },
  });

  const anterior = () => navegar("/estrategia/otros");

  return (
    <>
      <Meta title="Controles" />
      {idhogar && miembros ? (
        <GenericForm
          name="test"
          controls={[miembros, ...formulario6]}
          title="Datos de la entrevista"
          description=""
          endpointPath="persona"
          showSpecificDescription={false}
          idForEdit={idhogar}
          saveButton="Guardar"
          prevButton={{ text: "Anterior", action: anterior }}
          nextButton={{ text: "Finalizar caracterización", action: siguiente }}
          applyButton={false}
          submitFunction={(values: any) => {
            if (values.editMode) {
              delete values.editMode;
              modificar("dat_caracterizacion", "idcodigohogar", idhogar, {
                ...values,
                tipo: 1,
                idcodigohogar: idhogar,
                fregistro: values.fechaentrev,
              });
              notificar({
                type: "success",
                title:
                  "Se han modificado los datos de la entrevista al hogar satisfactoriamente",
              });
            } else {
              delete values.editMode;
              crear("dat_caracterizacion", {
                ...values,
                tipo: 1,
                idcodigohogar: idhogar,
                fregistro: values.fechaentrev,
                identrevistador: 1,
              });
              notificar({
                type: "success",
                title:
                  "Se han adicionado los datos de la entrevista al hogar satisfactoriamente",
              });
            }
            if (idhogar) {
              modificar("dat_hogar", "idcodigohogar", parseInt(idhogar), {
                observaciones: values.observaciones,
              });
            }
          }}
          getByIdFunction={obtenerObservaciones}
        />
      ) : (
        <Typography mx={2} my={2}>
          <b>Debe haber un hogar seleccionado..</b>
        </Typography>
      )}
    </>
  );
}

export default DatosDeEntrevista;
