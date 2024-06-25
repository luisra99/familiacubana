import { Button } from "@mui/material";
import GenericForm from "@/_pwa-framework/genforms/components/form-components/form.generic";
import Meta from "@/_pwa-framework/components/Meta";
import { formulario7 } from "@/app/user-interfaces/forms/forms.config";
import useModalState from "@/_pwa-framework/hooks/form/use-form-manager";
import { useState } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import { datico } from "@/app/user-interfaces/forms/models/model";
import {
  crear,
  modificar,
  obtenerDatosPorLlave,
} from "@/app/user-interfaces/forms/models/controllers";
import { getHogar } from "@/app/hogarController/hogar.controller";
import { obtenerMiembrosSelect } from "@/app/user-interfaces/forms/models/controllers.miembrohogar";

const data = useLiveQuery(async () => {
  const prueba = await (datico as any)["dat_miembroencuesta"].toArray();
  return prueba;
});

function Servicio_Salud() {
  const { modalActions } = useModalState();
  const [id, setid] = useState<any>(null);
  const miembros = obtenerMiembrosSelect();
  return (
    <>
      <Meta title="Controles" />
      <Button onClick={() => modalActions.open("test")}>
        Servicio Salud
      </Button>{" "}
      <Button onClick={() => setid(1)}>Test editar</Button>
      <Button onClick={() => setid(null)}>Limpiar ID</Button>
      <GenericForm
        name="test"
        controls={[
          {
            type: "select",
            name: "idmiembro",
            label: "Miembro del hogar",

            gridValues: { xs: 6, lg: 6, md: 6, sm: 6, xl: 6 },
            //  onChange: { action: (values: any) => {
            //   setid(values.idcodigohogar);
            //  }
            // },
            options: miembros,
          },
          ...formulario7,
        ]}
        title="IU Encuesta sobre servicios de salud"
        description=" "
        endpointPath="persona"
        showSpecificDescription={false}
        idForEdit={id}
        setIdFunction={setid}
        modalType="fullWith"
        submitFunction={(values) => {
          if (id)
            modificar("dat_miembroencuesta", "idmiembroencuesta", id, {
              ...values,
              idcodigohogar: getHogar(),
            });
          else
            crear("dat_miembroencuesta", {
              ...values,
              idcodigohogar: getHogar(),
            });
        }}
        getByIdFunction={(id) =>
          obtenerDatosPorLlave("dat_miembroencuesta", "idmiembroencuesta", id)
        }
      />
    </>
  );
}

export default Servicio_Salud;
