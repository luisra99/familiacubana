import GenericForm from "@/_pwa-framework/genforms/components/form-components/form.generic";
import Meta from "@/_pwa-framework/components/Meta";

import useModalState from "@/_pwa-framework/hooks/form/use-form-manager";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  obtenerMiembros,
  obtenerMiembrosSelect,
} from "@/app/user-interfaces/forms/models/controllers.miembrohogar";
import {
  crear,
  modificar,
  obtenerDatosPorLlave,
} from "@/app/user-interfaces/forms/models/controllers";
import { getHogar } from "@/app/hogarController/hogar.controller";
import { useLiveQuery } from "dexie-react-hooks";
import { datico } from "@/app/user-interfaces/forms/models/model";
import { Typography } from "@mui/material";
import NotificationProvider from "@/_pwa-framework/sections/Notifications/provider";

//import { Ingresos,Aditamientos } from "@/app/user-interfaces/controls/controls.config.eviel";

function Autonomía_y_Necesidades_Especiales() {
  const { modalActions } = useModalState();
  const [id, setid] = useState<any>(null);
  const idhogar = getHogar() ?? 0;
  const [idmiembrohogar, setIdMiembroHogar] = useState<any>(0);
  const [miembros, setMiembros] = useState<any>([]);
  const [respuestaMotivos, setConfiguracionRespuestaMotivos] = useState({});
  const navegar = useNavigate();

  async function unionNomenclador(arr: any) {
    console.log("array", arr);
    const join = await Promise.all(
      arr.map(async (obj: any) => {
        const ocupacion = await datico.nom_concepto.get(
          parseInt(obj?.idatendido[0])
        );

        return {
          ...obj,
          ocupacion: ocupacion?.denominacion,
        };
      })
    );

    return join;
  }

  async function obtenerDatos(idmiembro: any) {
    console.log("miembroid", idmiembro);
    const data = await datico.dat_miembroencuesta
      .where({ idmiembrohogar: idmiembro })
      .toArray();
    const result = await unionNomenclador(data);
    console.log("ObtenerDatos", result);
    return result;
  }

  async function onChangeMiembro(id: any) {
    const datos = await obtenerDatos(id);
    console.log("first", datos);
    if (datos) {
      //setOcupaciones(datos);
    }
  }

  useLiveQuery(async () => {
    const data = await obtenerMiembros();
    setMiembros(data);
  });

  const motivosNoAtencionMedica = useLiveQuery(async () => {
    const prueba = await (datico as any)["nom_concepto"]
      .where("idpadre")
      .equals("9433")
      .toArray();
    return prueba;
  });

  const respuestasTipoUsoServiciosDeSalud = useLiveQuery(async () => {
    const prueba = await (datico as any)["nom_concepto"]
      .where("idpadre")
      .equals("9831")
      .toArray();
    return prueba;
  });
  const notificar = NotificationProvider();
  const siguiente = () => navegar("/proteccion");
  const anterior = () => navegar("/autonomia/enfermedades");
  return (
    <>
      <Meta title="Controles" />

      <GenericForm
        name="4"
        controls={[
          {
            type: "component",
            component: () => (
              <Typography mt={"12px"}>
                ¿En los últimos 30 días algún miembro del hogar ha presentado
                algún problema de salud?
              </Typography>
            ),
            label: "",
            name: "",
            gridValues: { xs: 12, lg: 7, md: 6, sm: 6, xl: 6 },
            //disabled: (values) => values.atendido != "opt2",
          },
          {
            type: "select",
            label: "Seleccionar opción",
            name: "problemasalud",
            gridValues: { xs: 12, lg: 12, md: 6, sm: 12, xl: 6 },
            options: respuestasTipoUsoServiciosDeSalud,
            onChange: (value, ref) =>
              ref.setFieldValue("problemasalud", [], true),
          },
          {
            type: "select",
            name: "idmiembrohogar",
            label: "Miembro del hogar",
            gridValues: { xs: 6, lg: 6, md: 6, sm: 6, xl: 12 },
            options: miembros,
            onChange: (e: any, ref) => {
              setIdMiembroHogar(`${e.target.value}`);
              ref.setFieldValue("atendido", [], true);
              onChangeMiembro(`${e.target.value}`);
            },
            disabled: (values) =>
              values.problemasalud == "" ||
              values.problemasalud == "9833" ||
              values.problemasalud == "9834",
          },
          {
            type: "select",
            gridValues: { xs: 6, lg: 6, md: 6, sm: 6, xl: 6 },
            label: "¿Fue atendido?",
            name: "atendido",
            url: "9831",
            // onChange: (e, refs) => {
            //   onChangeMiembro(idmiembrohogar);
            // },
            disabled: (values) =>
              values.problemasalud == "" ||
              values.problemasalud == "9833" ||
              values.problemasalud == "9834",
          },
          {
            type: "component",
            component: () => (
              <Typography mt={"12px"}>
                <b>Especifique los motivos por lo que no fue atendido:</b>
              </Typography>
            ),
            label: "",
            name: "",
            gridValues: { xs: 12, lg: 7, md: 12, sm: 6, xl: 12 },
            disabled: (values) =>
              values.problemasalud == "" ||
              values.atendido == "" ||
              values.atendido == "9832" ||
              values.atendido == "9834" ||
              values.idmiembrohogar == "" ||
              values.problemasalud == "9833" ||
              values.problemasalud == "9834",
          },
          {
            type: "component",
            component: () =>
              motivosNoAtencionMedica?.map((motivo: any) => (
                <GenericForm
                  name="motivos"
                  controls={[
                    {
                      type: "component",
                      component: () => (
                        <Typography sx={{ mt: 0.5 }}>
                          {motivo.denominacion}
                        </Typography>
                      ),
                      label: "",
                      name: "",
                      gridValues: { xs: 5, lg: 5, md: 5, sm: 5, xl: 2 },
                    },

                    {
                      type: "select",
                      name: "idrespuesta",
                      label: "Seleccionar respuesta",

                      gridValues: { xs: 6, lg: 6, md: 6, sm: 6, xl: 4 },
                      onChange: (values) => {
                        //#region Raul
                        //Se actualiza una variable con la configuración de los alimentos
                        setConfiguracionRespuestaMotivos((prev: any) => {
                          prev[motivo.idconcepto] = {
                            ...prev[motivo.idconcepto],
                            idrespuesta: motivo.idconcepto,
                            idmiembrohogar: values.idmiembrohogar,
                          };
                          return prev;
                        });
                        //#endregion
                      },

                      options: respuestasTipoUsoServiciosDeSalud,
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
            disabled: (values) =>
              values.problemasalud == "" ||
              values.atendido == "" ||
              values.atendido == "9832" ||
              values.atendido == "9834" ||
              values.idmiembrohogar == "" ||
              values.problemasalud == "9833" ||
              values.problemasalud == "9834",
          },
        ]}
        title="Uso de servicios de salud"
        description=" "
        endpointPath="persona"
        showSpecificDescription={false}
        nextButton={{ text: "Siguiente", action: siguiente }}
        prevButton={{ text: "Anterior", action: anterior }}
        idForEdit={id}
        saveButton="Guardar"
        submitFunction={(values) => {
          if (id)
            modificar("dat_miembroencuesta", "idmiembroencuesta", id, {
              values,

              idcodigohogar: getHogar(),
            });
          else
            crear("dat_miembroencuesta", {
              ...values,
              idmiembrohogar: values.idmiembrohogar[0],
              idcodigohogar: getHogar(),
            }).then(() =>
              notificar({
                type: "success",
                title: "Adicionar",
                content:
                  "Se han adicionado los datos de servicio de salud a la persona satisfactoriamente",
              })
            );
          {
            values.atendido === "9833" &&
              Object.values(respuestaMotivos).forEach((respuesta: any) =>
                crear("dat_motivonoatencion", {
                  ...respuesta,
                }).then(() =>
                  notificar({
                    type: "success",
                    title: "Adicionar",
                    content:
                      "Se han adicionado los datos de servicio de salud a la persona satisfactoriamente",
                  })
                )
              );
          }
        }}
        getByIdFunction={(id) =>
          obtenerDatosPorLlave("dat_miembroencuesta", "idmiembroencuesta", id)
        }
      />
    </>
  );
}

export default Autonomía_y_Necesidades_Especiales;
