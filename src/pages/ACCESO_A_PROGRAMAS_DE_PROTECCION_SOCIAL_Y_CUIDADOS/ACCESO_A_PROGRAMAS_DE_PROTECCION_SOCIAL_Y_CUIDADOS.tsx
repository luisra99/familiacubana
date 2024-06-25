import GenericForm from "@/_pwa-framework/genforms/components/form-components/form.generic";
import Meta from "@/_pwa-framework/components/Meta";

import { Grid, Typography } from "@mui/material";

import useModalState from "@/_pwa-framework/hooks/form/use-form-manager";
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

//import {  } from "@/app/user-interfaces/controls/controls.config.eviel";

function ACCESO_A_PROGRAMAS_DE_PROTECCION_SOCIAL_Y_CUIDADOS() {
  const { modalActions } = useModalState();
  const [id, setid] = useState<any>(null);
  const [configuracionBeneficios, setConfiguracionBeneficios] = useState({});
  const [configuracionEstado, setConfiguracionEstado] = useState({});

  const beneficios = useLiveQuery(async () => {
    const prueba = await (datico as any)["nom_concepto"]
      .where("idpadre")
      .equals("9442")
      .toArray();
    return prueba;
  });

  const navegar = useNavigate();

  const miembros = obtenerMiembrosSelect();

  const siguiente = () => navegar("/adolecentes");
  const anterior = () => navegar("/autonomia/servicios");

  return (
    <>
      <Meta title="Controles" />
      {miembros && (
        <GenericForm
          name="test"
          controls={[
            {
              type: "select",
              name: "idmiembrohogar",
              label: "Miembro del hogar",
              gridValues: { xs: 6, lg: 6, md: 6, sm: 6, xl: 6 },
              options: miembros,
            },
            {
              type: "component",
              component: () => (
                <Typography mt={"12px"}>
                  <b>Nota aclaratoria:</b>con frecuencia las personas no conocen
                  que beneficios existen y pudieran acceder, por ello lee y
                  explica con detenimiento las opciones a la persona
                  entrevistada
                </Typography>
              ),
              label: "",
              name: "",
              gridValues: { xs: 12, lg: 12, md: 12, sm: 12, xl: 12 },
              disabled: (values) => values.idmiembrohogar == "",
            },

            {
              type: "component",
              component: () =>
                beneficios?.map((beneficio: any) => (
                  <GenericForm
                    name="beneficios"
                    controls={[
                      {
                        type: "component",
                        component: () => (
                          <Typography sx={{ mt: 2 }}>
                            {beneficio.denominacion}
                          </Typography>
                        ),
                        label: "",
                        name: "",
                        gridValues: { xs: 5, lg: 5, md: 5, sm: 5, xl: 2 },
                      },

                      {
                        type: "select",
                        name: "accede",
                        label: "Acceso a beneficios",

                        gridValues: { xs: 6, lg: 6, md: 6, sm: 6, xl: 4 },
                        onChange: (event, values) => {
                          //#region Raul
                          //Se actualiza una variable con la configuración de los alimentos
                          setConfiguracionBeneficios((prev: any) => {
                            prev[beneficio.idconcepto] = {
                              ...prev[beneficio.idconcepto],
                              idbeneficio: beneficio.idconcepto,
                              accede: event.target.value,
                              idmiembrohogar: values.idmiembrohogar,
                            };
                            return prev;
                          });
                          //#endregion
                        },

                        options: [
                          { idconcepto: "1", denominacion: "Si" },
                          { idconcepto: "2", denominacion: "No" },
                          {
                            idconcepto: "3",
                            denominacion: "No accede pero los necesita",
                          },
                        ],
                      },

                      {
                        type: "check",
                        label: "Conoce que existe",
                        name: "conocequeexiste",
                        gridValues: { xl: 2, lg: 2, md: 2, sm: 2, xs: 2 },
                        onChange: (event) => {
                          //se parametriza cualquier informacion para ejecutar la funcion de guardar
                          // funcionQueActualizaLaBaseDeDatos(
                          //   beneficio.idConcepto,
                          //   "campo o concepto de le gusta",
                          //   event.target.value
                          // );
                        },
                        disabled: (values) => values.accede != "3",
                      },
                      {
                        type: "check",
                        label: "En trámites para obtenerlos",
                        name: "entramites",
                        gridValues: { xl: 2, lg: 2, md: 2, sm: 2, xs: 2 },
                        onChange: (event) => {
                          //se parametriza cualquier informacion para ejecutar la funcion de guardar
                          // funcionQueActualizaLaBaseDeDatos(
                          //   beneficio.idConcepto,
                          //   "campo o concepto de le gusta",
                          //   event.target.value
                          // );
                        },
                        disabled: (values) => values.accede != "3",
                      },
                      {
                        type: "check",
                        label: "Necesitan ayuda para acceder",
                        name: "ayudaparaacceder",
                        gridValues: { xl: 2, lg: 2, md: 2, sm: 2, xs: 2 },
                        onChange: (event) => {
                          //se parametriza cualquier informacion para ejecutar la funcion de guardar
                          // funcionQueActualizaLaBaseDeDatos(
                          //   beneficio.idConcepto,
                          //   "campo o concepto de le gusta",
                          //   event.target.value
                          // );
                        },
                        disabled: (values) => values.accede != "3",
                      },
                    ]}
                    endpointPath="/"
                    title=""
                    hideButtons={true}
                  />
                )),
              gridValues: { lg: 12, md: 12, sm: 12, xl: 12, xs: 12 },
              name: "",
              label: "",
              disabled: (values) => values.idmiembrohogar == "",
            },
          ]}
          title="Acceso a programas de protección social y cuidados"
          description=""
          endpointPath="persona"
          showSpecificDescription={false}
          nextButton={{ text: "Siguiente", action: siguiente }}
          prevButton={{ text: "Anterior", action: anterior }}
          idForEdit={id}
          saveButton="Guardar"
          setIdFunction={setid}
          submitFunction={async (values) => {
            //#region Raul
            //Crea el registro de los alimentos
            Object.values(configuracionBeneficios).forEach(
              (configBeneficio: any) =>
                crear("dat_polprogsoc", {
                  ...configBeneficio,
                })
            );
            const idpolprogsoc = await crear("dat_polprogsoc", values);
            if (values.accede === 3) {
              crear("dat_estadonoacceso", {
                values,
                idpolprogsoc,
                idcausa: values,
              });
            }
          }}
          getByIdFunction={(id) =>
            obtenerDatosPorLlave("dat_miembropogramas", "idmiembroprograma", id)
          }
        />
      )}
    </>
  );
}

export default ACCESO_A_PROGRAMAS_DE_PROTECCION_SOCIAL_Y_CUIDADOS;
