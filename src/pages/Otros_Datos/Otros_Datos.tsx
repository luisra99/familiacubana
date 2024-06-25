import GenericForm from "@/_pwa-framework/genforms/components/form-components/form.generic";
import Meta from "@/_pwa-framework/components/Meta";
import { OtrosDatos } from "@/app/user-interfaces/forms/forms.config";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import { datico } from "@/app/user-interfaces/forms/models/model";
import {
  crear,
  modificar,
  obtenerDatosPorLlave,
} from "@/app/user-interfaces/forms/models/controllers";
import { obtenerMiembrosSelect } from "@/app/user-interfaces/forms/models/controllers.miembrohogar";
import TableView from "@/_pwa-framework/user-solicitudes/view";
import Typography from "@mui/material/Typography";
import { Divider } from "@mui/material";
import { getHogar } from "@/app/hogarController/hogar.controller";

function Otros_Datos() {
  const [id, setid] = useState<any>(null);

  const navegar = useNavigate();

  const miembros = obtenerMiembrosSelect();

  const data = useLiveQuery(async () => {
    const prueba = await (datico as any)["nom_concepto"]
      .where("idpadre")
      .equals("9556")
      .toArray();
    return prueba;
  });
  console.log("data", data);
  const siguiente = () => navegar("/DATOS_DE_LA_ENTREVISTA");
  const anterior = () => navegar("/seguridad-estrategia");
  return (
    <>
      <Meta title="Controles" />
      <GenericForm
        name="test"
        controls={[
          {
            type: "select",
            name: "idmiembro",
            label: "Miembro del hogar",

            gridValues: { xs: 4, lg: 4, md: 4, sm: 4, xl: 4 },

            //   onChange: (event, ref) => {
            //     if (event.target.value) {
            //         // Realiza acciones si hay datos en el valor
            //         console.log("Hay datos:", event.target.value);
            //         setid(event.target.value);
            //     } else {
            //        ref.resetForm();
            //         // No hacer nada si no hay datos
            //     }
            // },

            //  onChange: (event: any, ref) => {
            //  setid(event.target.value);
            // if(ref.dirty) ref.resetForm();
            //  },
            options: miembros,
          },

          {
            type: "component",
            component: () => (
              <Typography marginTop={2}>
                Marca la(s) estrategias que utiliza para darle solución de
                problemas que afectan al hogar
              </Typography>
            ),
            label: "",
            name: "",
            disabled: (values) => values.idmiembro == "",
            gridValues: { xs: 12, lg: 12, md: 12, sm: 12, xl: 12 },
          },
          {
            type: "component",
            component: () => (
              <Typography>
                <b>Nota aclaratoria:</b>Se pregunta si en los últimos 6 meses,
                se vió en la necesidad de hacer alguna de estas activiadades
                debido a que no había suficiente dinero para comprar alimentos o
                satisfacer otras necesidades básicas.
              </Typography>
            ),
            label: "",
            name: "",
            disabled: (values) => values.idmiembro == "",
            gridValues: { xs: 12, lg: 12, md: 12, sm: 12, xl: 12 },
          },
          {
            type: "component",
            component: () => (
              <TableView
                values={data}
                headers={[{ name: "denominacion", label: "Estrategias" }]}
                idKey="denominacion"
                title=""
                multiSelect={true}
                /*rowActions={[
                    {
                      label: "Exportar fila",
                      action: (values: any) => console.log(values),
                      },
                      ]}*/
              />
            ),
            label: "",
            name: "",
            disabled: (values) => values.idmiembro == "",
            gridValues: { xs: 12, lg: 12, md: 12, sm: 12, xl: 12 },
          },
          {
            type: "component",
            component: () => (
              <Typography mt={3}>Redes de apoyo del hogar</Typography>
            ),
            label: "",
            name: "",
            disabled: (values) => values.idmiembro == "",
            gridValues: { xs: 12, lg: 12, md: 12, sm: 12, xl: 12 },
          },
          {
            type: "component",
            component: () => <Divider sx={{ mt: 0, mb: 1 }} />,
            label: "",
            name: "",
            disabled: (values) => values.idmiembro == "",
            gridValues: { xs: 12, lg: 12, md: 12, sm: 12, xl: 12 },
          },
          {
            type: "component",
            component: () => (
              <Typography>
                Tiene a quien pedir ayuda ( a un familiar y/o amigo fuera del
                hogar)
              </Typography>
            ),
            label: "",
            name: "",
            disabled: (values) => values.idmiembro == "",
            gridValues: { xs: 12, lg: 12, md: 12, sm: 12, xl: 12 },
          },
          ...OtrosDatos,
        ]}
        title="Otros Datos"
        description=" "
        endpointPath="persona"
        showSpecificDescription={false}
        nextButton={{ text: "Siguiente", action: siguiente }}
        prevButton={{ text: "Anterior", action: anterior }}
        idForEdit={id}
        saveButton="Guardar"
        setIdFunction={setid}
        submitFunction={(values) => {
          if (id)
            modificar(
              "dat_miembrosituacionsocial",
              "idiembrosituacionsocial",
              id,
              { ...values, idcodigohogar: getHogar() }
            );
          else
            crear("dat_miembrosituacionsocial", {
              ...values,
              idcodigohogar: getHogar(),
            });
        }}
        getByIdFunction={(id) =>
          obtenerDatosPorLlave(
            "dat_miembrosituacionsocial",
            "idiembrosituacionsocial",
            id
          )
        }
      />
    </>
  );
}

export default Otros_Datos;
