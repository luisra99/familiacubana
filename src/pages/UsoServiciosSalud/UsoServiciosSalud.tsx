import {
  crear,
  deleteRowsIfExist,
  eliminar,
  modificar,
  obtenerDatosPorLlave,
} from "@/app/user-interfaces/forms/models/controllers";
import { obtenerMiembroPorEncuesta, obtenerMotivoNoAtencion } from "./helpers";
import { useEffect, useState } from "react";

import GenericForm from "@/_pwa-framework/genforms/components/form-components/form.generic";
import Meta from "@/_pwa-framework/components/Meta";
import NotificationProvider from "@/_pwa-framework/sections/Notifications/provider";
import { Typography } from "@mui/material";
import { datico } from "@/app/user-interfaces/forms/models/model";
import { getHogar } from "@/app/hogarController/hogar.controller";
import { obtenerMiembros } from "@/app/user-interfaces/forms/models/controllers.miembrohogar";
import { useLiveQuery } from "dexie-react-hooks";
import { useNavigate } from "react-router-dom";

//import { Ingresos,Aditamentos } fom "@/app/user-interfaces/controls/controls.config.eviel";

function Autonomía_y_Necesidades_Especiales() {
  const [id, setid] = useState<any>(null);
  const idhogar = getHogar() ?? 0;
  const [miembros, setMiembros] = useState<any>([]);
  const [respuestaMotivos, setConfiguracionRespuestaMotivos] = useState({});
  const [checkUso, checkSetUso] = useState<any>([]);
  const notificar = NotificationProvider();
  const navegar = useNavigate();
  const siguiente = () => navegar("/proteccion");
  const anterior = () => navegar("/autonomia/enfermedades");
  useEffect(() => {
    obtenerDatosPorLlave(
      "dat_hogar",
      "idcodigohogar",
      parseInt(getHogar() ?? "")
    ).then((datosHogar) => {
      if (datosHogar.length) {
        if (
          JSON.stringify(datosHogar[0].problemasalud) ===
          JSON.stringify(["9832"])
        ) {
          obtenerDatosPorLlave(
            "dat_miembroencuesta",
            "idcodigohogar",
            getHogar()
          ).then((registrosUsuarios) => {
            if (registrosUsuarios.length) {
              setid(registrosUsuarios[0].idmiembrohogar);
            }
          });
        }
      }
    });
  }, []);

  async function tieneUso(arr: any) {
    const result = await Promise.all(
      arr.map(async (obj: any) => {
        const uso = await datico.dat_miembroencuesta
          .where({ idmiembrohogar: obj.idconcepto.toString() })
          .count();
        if (uso > 0) {
          return obj.idconcepto;
        } else {
          return 0;
        }
      })
    );
    const _result = result.filter((item) => item != 0);
    return _result.toString();
  }
  const submitUsoServiciosSalud = async (values: any) => {
    delete values.editMode;
    const hogar = getHogar();
    if (hogar) {
      await modificar("dat_hogar", "idcodigohogar", parseInt(hogar), {
        problemasalud: values.problemasalud,
      });
    }
    const existemiembroencuesta = await datico.dat_miembroencuesta
      .where({ idmiembrohogar: values.idmiembrohogar[0] })
      .toArray();

    if (existemiembroencuesta?.length) {
      if (values.atendido[0] == "9832") {
        const motivos = await datico.dat_motivonoatencion
          .where({
            idmiembrohogar: values.idmiembrohogar[0],
          })
          .toArray();

        if (motivos?.length) {
          eliminar(
            "dat_motivonoatencion",
            "idmiembrohogar",
            values.idmiembrohogar[0]
          );
          notificar({
            type: "success",
            title:
              "Se han eliminado los datos de servicio de salud a la persona satisfactoriamente",
            content: "",
          });
        }
      }
      modificar("dat_miembroencuesta", "idmiembrohogar", id, {
        ...values,
        idmiembrohogar: values.idmiembrohogar[0],
        idcodigohogar: getHogar(),
      });

      if (values.atendido[0] == "9833") {
        let modify = false;
        Object.values(respuestaMotivos).forEach(async (motivo: any) => {
          const existeMotivos = await datico.dat_motivonoatencion
            .where({
              idmiembrohogar: values.idmiembrohogar[0],
            })
            .toArray();
          if (
            existeMotivos?.length &&
            existeMotivos[0].idmotivo == motivo.idmotivo
          ) {
            modificar("dat_motivonoatencion", "idmotivo", motivo.idmotivo, {
              ...motivo,
              idmiembrohogar: values.idmiembrohogar[0],
              idcodigohogar: getHogar(),
            });
            modify = true;
          }
          if (existeMotivos?.length > 1) {
            existeMotivos.map((motivoQexiste: any) => {
              if (motivoQexiste.idmotivo == motivo.idmotivo) {
                modificar("dat_motivonoatencion", "idmotivo", motivo.idmotivo, {
                  ...motivo,
                  idmiembrohogar: values.idmiembrohogar[0],
                  idcodigohogar: getHogar(),
                });
                modify = true;
              }
            });
          } else {
            crear("dat_motivonoatencion", {
              ...motivo,
              idmiembrohogar: values.idmiembrohogar[0],
              idcodigohogar: getHogar(),
            });
          }
        });

        if (modify) {
          notificar({
            type: "success",
            title:
              "Se han modificado los datos de servicio de salud a la persona satisfactoriamente",
            content: "",
          });
        } else {
          notificar({
            type: "success",
            title:
              "Se han adicionado los datos de servicio de salud a la persona satisfactoriamente",
            content: "",
          });
        }
      }
    } else {
      crear("dat_miembroencuesta", {
        idmiembrohogar: values.idmiembrohogar[0],
        atendido: values.atendido,
        idcodigohogar: getHogar(),
      }).then(() => {
        modificar("dat_hogar", "idcodigohogar", parseInt(getHogar() ?? ""), {
          problemasalud: values.problemasalud,
        });
      });
      if (values.atendido == "9833") {
        Object.values(respuestaMotivos).forEach((respuesta: any) =>
          crear("dat_motivonoatencion", {
            ...respuesta,
            idmiembrohogar: values.idmiembrohogar[0],
            idcodigohogar: getHogar(),
          })
        );
      }
      if (values.atendido == "9832") {
        deleteRowsIfExist(
          "dat_motivonoatencion",
          {
            idmiembrohogar: values.idmiembrohogar[0],
            idcodigohogar: getHogar(),
          },
          "idmotivonoatencion"
        );
      }
      notificar({
        type: "success",
        title:
          "Se han adicionado los datos de servicio de salud a la persona satisfactoriamente",
        content: "",
      });
    }
  };

  useLiveQuery(async () => {
    const data = await obtenerMiembros();
    setMiembros(data);
    const usito = await tieneUso(data);
    checkSetUso(usito);
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

  return (
    <>
      <Meta title="Controles" />
      {idhogar && respuestasTipoUsoServiciosDeSalud && miembros.length ? (
        <>
          <GenericForm
            name="4"
            applyButton={false}
            controls={[
              {
                type: "component",
                component: () => (
                  <Typography mt={"12px"}>
                    ¿En los últimos 30 días algún miembro del hogar ha
                    presentado algún problema de salud?
                  </Typography>
                ),
                label: "",
                name: "",
                gridValues: { xs: 6, lg: 7, md: 6, sm: 6, xl: 6 },
                //hidden: (values:any) => values.atendido != "opt2",
              },
              {
                type: "select",
                label: "Seleccionar opción",
                name: "problemasalud",
                validations: {
                  required: {
                    message: "Este campo es obligatorio",
                  },
                },
                gridValues: { xs: 6, lg: 6, md: 6, sm: 6, xl: 6 },
                options: respuestasTipoUsoServiciosDeSalud,
                onChange: (value, ref) =>
                  ref.setFieldValue("problemasalud", [], true),
              },
              {
                type: "select",
                name: "idmiembrohogar",
                label: "Miembro del hogar",
                validations: {
                  required: {
                    message: "Este campo es obligatorio",
                    when: {
                      name: "problemasalud",
                      expression: (value) =>
                        JSON.stringify(value) === JSON.stringify(["9832"]),
                    },
                  },
                },
                gridValues: { xs: 6, lg: 6, md: 6, sm: 6, xl: 6 },
                options: miembros,
                checkValues: checkUso,
                onChange: (e: any, ref) => {
                  //onChangeMiembro(`${e.target.value}`);
                  setid(e.target.value);
                },
                hidden: (values: any) =>
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
                validations: {
                  required: { message: "Este campo es obligatorio"},
                },
                onChange: (event) => {
                  event.target.value == "9832" &&
                    setConfiguracionRespuestaMotivos({});
                },
                hidden: (values: any) =>
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
                gridValues: { xs: 12, lg: 12, md: 12, sm: 12, xl: 12 },
                hidden: (values: any) =>
                  values.atendido == "9832" ||
                  values.atendido == "9834" ||
                  values.atendido == "" ||
                  values.problemasalud == "" ||
                  values.problemasalud == "9833" ||
                  values.problemasalud == "9834",
              },
              {
                type: "component",
                component: () =>
                  motivosNoAtencionMedica?.map((motivo: any) => {
                    return (
                      <GenericForm
                        name="idmotivo"
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

                          motivo.idconcepto == 9441
                            ? {
                                type: "text",
                                name: "idrespuesta",
                                label: "Especifique",
                                gridValues: {
                                  xs: 6,
                                  lg: 6,
                                  md: 6,
                                  sm: 6,
                                  xl: 4,
                                },
                                onChange: (e: any) => {
                                  if (e.target.value) {
                                    setConfiguracionRespuestaMotivos(
                                      (prev: any) => {
                                        prev[motivo.idconcepto] = {
                                          ...prev[motivo.idconcepto],

                                          idmotivo: motivo.idconcepto,
                                          idrespuesta: `${e.target.value}`,
                                        };
                                        return prev;
                                      }
                                    );
                                  } else {
                                    setConfiguracionRespuestaMotivos(
                                      (prev: any) => {
                                        delete prev[motivo.idconcepto];
                                        return prev;
                                      }
                                    );
                                  }
                                },
                              }
                            : {
                                type: "select",
                                name: "idrespuesta",
                                label: "Seleccionar respuesta",
                                gridValues: {
                                  xs: 6,
                                  lg: 6,
                                  md: 6,
                                  sm: 6,
                                  xl: 4,
                                },
                                onChange: (e: any) => {
                                  //#region Raul
                                  //Se actualiza una variable con la configuración de los alimentos
                                  if (e.target.value) {
                                    setConfiguracionRespuestaMotivos(
                                      (prev: any) => {
                                        prev[motivo.idconcepto] = {
                                          ...prev[motivo.idconcepto],

                                          idmotivo: motivo.idconcepto,
                                          idrespuesta: `${e.target.value}`,
                                        };
                                        return prev;
                                      }
                                    );
                                  } else {
                                    setConfiguracionRespuestaMotivos(
                                      (prev: any) => {
                                        delete prev[motivo.idconcepto];
                                        return prev;
                                      }
                                    );
                                  }

                                  //#endregion
                                },

                                options: respuestasTipoUsoServiciosDeSalud,
                              },
                        ]}
                        endpointPath="/"
                        hideButtons={true}
                        idForEdit={id}
                        setIdFunction={setid}
                        getByIdFunction={() =>
                          obtenerMotivoNoAtencion(
                            id,
                            motivo,
                            respuestaMotivos,
                            setConfiguracionRespuestaMotivos
                          )
                        }
                      />
                    );
                  }),
                gridValues: { lg: 12, md: 12, sm: 12, xl: 12, xs: 12 },
                name: "",
                label: "",
                hidden: (values: any) =>
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
            endpointPath="persona"
            showSpecificDescription={false}
            nextButton={{ text: "Siguiente", action: siguiente }}
            prevButton={{ text: "Anterior", action: anterior }}
            idForEdit={id}
            saveButton="Guardar"
            submitFunction={submitUsoServiciosSalud}
            notifyValidation={(values) => {
              if (
                !Object.keys(respuestaMotivos).length &&
                JSON.stringify(values?.atendido) === JSON.stringify(["9833"])
              ) {
                return "Debe seleccionar al menos un motivo";
              }
            }}
            getByIdFunction={obtenerMiembroPorEncuesta}
          />
        </>
      ) : (
        <Typography mx={2} my={2}>
          {idhogar ? (
            <b>No existen miembros agregados</b>
          ) : (
            <b>No existe un hogar seleccionado</b>
          )}
        </Typography>
      )}
    </>
  );
}

export default Autonomía_y_Necesidades_Especiales;
