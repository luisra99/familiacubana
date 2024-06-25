import { FormMiembrosAdults } from "@/app/user-interfaces/forms/forms.config";
import GenericForm from "@/_pwa-framework/genforms/components/form-components/form.generic";
import Meta from "@/_pwa-framework/components/Meta";
import useModalState from "@/_pwa-framework/hooks/form/use-form-manager";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  crear,
  modificar,
  obtenerDatosPorLlave,
} from "@/app/user-interfaces/forms/models/controllers";
import { useLiveQuery } from "dexie-react-hooks";
import { datico } from "@/app/user-interfaces/forms/models/model";
import { getHogar } from "@/app/hogarController/hogar.controller";
import { obtenerMiembrosSelect } from "@/app/user-interfaces/forms/models/controllers.miembrohogar";

function NoVinculado() {
  const { modalActions } = useModalState();
  const [id, setid] = useState<any>(null);

  const data = useLiveQuery(async () => {
    const prueba = await (datico as any)["dat_nvinculacionmiembro"].toArray();
    return prueba;
  });

  const miembros = obtenerMiembrosSelect();

  const navegar = useNavigate();

  const siguiente = () => navegar("/autonomia-necesidades");
  const anterior = () => navegar("/Ocupacion");

  return (
    <>
      <Meta title="Controles" />

      <GenericForm
        name="tesst"
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
          ...FormMiembrosAdults,
        ]}
        title="Miembros adultos no vinculados al trabajo remunerado"
        description=" "
        endpointPath="persona"
        showSpecificDescription={false}
        idForEdit={id}
        saveButton="Guardar"
        setIdFunction={setid}
        submitFunction={(values) => {
          if (id)
            modificar("dat_nvinculacionmiembro", "idnvinculacionmiembro", id, {
              ...values,
              idcodigohogar: getHogar(),
            });
          else
            crear("dat_nvinculacionmiembro", {
              ...values,
              idcodigohogar: getHogar(),
            });
        }}
        getByIdFunction={(id) =>
          obtenerDatosPorLlave(
            "dat_nvinculacionmiembro",
            "idnvinculacionmiembro",
            id
          )
        }
        nextButton={{ text: "Siguiente", action: siguiente }}
        prevButton={{ text: "Anterior", action: anterior }}
      />
    </>
  );
}

export default NoVinculado;
