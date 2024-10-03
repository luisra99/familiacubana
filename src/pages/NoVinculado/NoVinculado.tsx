import {
  crear,
  eliminar,
  modificar,
  obtenerDatosPorLlave,
} from "@/app/user-interfaces/forms/models/controllers";

import GenericForm from "@/_pwa-framework/genforms/components/form-components/form.generic";
import Meta from "@/_pwa-framework/components/Meta";
import NotificationProvider from "@/_pwa-framework/sections/Notifications/provider";
import { Typography } from "@mui/material";
import { datico } from "@/app/user-interfaces/forms/models/model";
import { getHogar } from "@/app/hogarController/hogar.controller";
import { obtenerMiembros } from "@/app/user-interfaces/forms/models/controllers.miembrohogar";
import { useLiveQuery } from "dexie-react-hooks";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { validateByConcept } from "./utils";

function NoVinculado() {
  const idhogar = getHogar() ?? 0;
  const notificar = NotificationProvider();
  const [id, setid] = useState<any>(null);
  const [miembros, setMiembros] = useState<any>([]);
  const [configuracionParentesco, setConfiguracionParentesco] = useState({});
  const [nvinculamiento, setNvinculamiento] = useState<any>(null);
  const [miembrosConDatos, setMiembrosConDatos] = useState<any>([]);
  const [checkDiscapacidad, checkSetDiscapacidad] = useState<any>([]);

  async function tieneDiscapacidad(arr: any) {
    const result = await Promise.all(
      arr.map(async (obj: any) => {
        const disca = await datico.dat_nvinculacionmiembro
          .where({ idmiembrohogar: obj.idconcepto.toString() })
          .count();
        if (disca > 0) {
          return obj.idconcepto;
        } else {
          return 0;
        }
      })
    );
    const _result = result.filter((item) => item != 0);
    return _result.toString();
  }

  useLiveQuery(async () => {
    const data = await obtenerMiembros();
    const data_ocupacion = await datico.dat_miembroocupacion.toArray();
    const filterdata = data?.filter((ele) => {
      return data_ocupacion?.some((ocupacion: any) => {
        console.log("ocupaciopn", ocupacion);
        return (
          ele.idconcepto === parseInt(ocupacion.idmiembrohogar[0]) &&
          (ocupacion?.idtipoocupacion?.includes("9350") ||
            ocupacion?.idtipoocupacion?.includes(9344) ||
            ocupacion?.idtipoocupacion?.includes(9346))
        );
      });
    });
    if (!filterdata.length) siguiente();
    const discapacidad = await tieneDiscapacidad(data);
    setMiembros(filterdata);
    checkSetDiscapacidad(discapacidad);
  });

  async function tieneDatos(arr: any) {
    const result = await Promise.all(
      arr.map(async (obj: any) => {
        const dato = await datico.dat_situacnnaj
          .where({ idmiembrohogar: [obj.idconcepto.toString()] })
          .count();
        const datonna = await datico.dat_nnaocupacion
          .where({ idmiembrohogar: [obj.idconcepto.toString()] })
          .count();
        if (dato > 0 || datonna > 0) {
          return obj.idconcepto.toString();
        } else {
          return 0;
        }
      })
    );

    return result.filter((item) => item != 0);
  }
  const obtenerData = async (id: string) => {
    const datos_nvinculado = await obtenerDatosPorLlave(
      "dat_nvinculacionmiembro",
      "idmiembrohogar",
      id
    );
    let causas;
    if (datos_nvinculado.length && datos_nvinculado[0]?.tipo != "9352") {
      causas = await getremuneraciones(
        datos_nvinculado[0]?.idnvinculacionmiembro
      );
    }
    if (datos_nvinculado.length) {
      setNvinculamiento(datos_nvinculado[0]?.idnvinculacionmiembro);
    }
    setConfiguracionParentesco({});
    return datos_nvinculado.length
      ? datos_nvinculado[0].tipo == "9352"
        ? { ...datos_nvinculado[0], editMode: true, idmiembro: [id] }
        : {
            ...datos_nvinculado[0],
            idcausasnoremuneraciones: causas,
            editMode: true,
            idmiembro: [id],
          }
      : {
          idmiembro: [id],
          idnvinculacionmiembro: "",
          tipo: "9352",
          idcausa: "",
          idmotivodecision: "",
          idcodigohogar: "",
          idmiembrohogar: "",
          idcausasnoremuneraciones: [],
          editMode: false,
        };
  };
  const parentesco = useLiveQuery(async () => {
    const prueba = await (datico as any)["nom_concepto"]
      .where("idpadre")
      .equals("9740")
      .toArray();
    let ordenar = prueba.filter(
      ({ denominacion }: any) => denominacion !== "Otros"
    );
    let otros = prueba.filter(
      ({ denominacion }: any) => denominacion === "Otros"
    );
    return [...ordenar, ...otros];
  });
  const navegar = useNavigate();
  const siguiente = () => navegar("/autonomia/discapacidad");
  const anterior = () => navegar("/ocupacion/principal");

  return (
    <>
      <Meta title="Controles" />
      {!!miembros.length ? (
        configuracionParentesco && (
          <GenericForm
            name="tesst"
            nextButton={{ text: "Siguiente", action: () => siguiente() }}
            prevButton={{ text: "Anterior", action: () => anterior() }}
            // nextDisabledFunction={}
            controls={[
              {
                type: "select",
                name: "idmiembro",
                label: "Miembro del hogar",
                gridValues: { xs: 12, lg: 8, md: 8, sm: 8, xl: 8 },
                options: miembros,
                checkValues: checkDiscapacidad,
                validations: {
                  required: { message: "Este campo es obligatorio" },
                },
                onChange: (e, refs) => {
                  const { value } = e.target;
                  setid(value);
                },
                hidden: () => !idhogar || !miembros.length,
              },
              {
                type: "radio",
                label: "Se Encuentra",
                name: "tipo",
                gridValues: { xs: 12, sm: 8, lg: 6, md: 6, xl: 6 },
                radios: [
                  { idconcepto: "9352", denominacion: "Apto" },
                  {
                    idconcepto: "9353",
                    denominacion: "No Apto o fuera de la edad laboral",
                  },
                ],
                //defaultValue: "9352",
                direction: "row",
                labelPlacement: "end",

                hidden: () => !idhogar || !miembros.length,
              },
              {
                type: "select",
                gridValues: { xs: 12, sm: 12, lg: 12, md: 12, xl: 12 },
                label:
                  "Causas por la que no se encuentra vinculado al trabajo remunerado",
                name: "idcausa",
                url: "9354",

                hidden: (values: any) =>
                  values.tipo != "9352" || !idhogar || !miembros.length,
                validations: {
                  tests: [{ message: "", test: () => false }],
                },
              },
              {
                type: "select",
                label: "Motivo de la desición",
                name: "idmotivodecision",
                gridValues: { xs: 12, sm: 12, lg: 12, md: 12, xl: 12 },
                url: "9360",
                hidden: (values: any) =>
                  values.tipo != "9352" || values.idcausa != "9357",
                // validations: { length: { value: 1, message: "Seleccione el motivo de la desición" } },
              },
              {
                type: "multiselect",
                label: "Escoja la opción",
                name: "idcausasnoremuneraciones",
                multiple: "check",
                gridValues: { xs: 12, sm: 12, lg: 12, md: 12, xl: 12 },
                url: "9363",
                hidden: (values: any) => values.tipo != "9353",
                validations: {
                  required: {
                    when: {
                      name: "tipo",
                      expression: (value) => value != "9352",
                    },
                    message: "Seleccione al menos una opción",
                  },
                },
              },
              {
                type: "component",
                component: ({ name, setFieldValue, formValue }) =>
                  parentesco?.map((parent: any) => (
                    <GenericForm
                      name="parentesco"
                      sx={{ p: 1 }}
                      controls={[
                        {
                          type: "component",
                          component: () => (
                            <Typography sx={{ mt: 2 }}>
                              {parent.denominacion}
                            </Typography>
                          ),
                          label: "",
                          name: "",
                          gridValues: { xs: 6, lg: 8, md: 8, sm: 8, xl: 7 },
                        },
                        {
                          type: "number",
                          name: "cantidad",
                          label: "Cantidad de Personas",
                          format: "units",
                          gridValues: { xs: 6, lg: 4, md: 6, sm: 4, xl: 5 },
                          onChange: (event, values) => {
                            //#region Raul
                            //Se actualiza una variable con la configuraci�n de los alimentos
                            if (event.value) {
                              setConfiguracionParentesco((prev: any) => {
                                prev[parent.idconcepto] = {
                                  ...prev[parent.idconcepto],
                                  idparentesco: parent.idconcepto,
                                  cantidad: event.value,
                                };
                                setFieldValue(name, prev);
                                return prev;
                              });
                            } else {
                              setConfiguracionParentesco((prev: any) => {
                                delete prev[parent.idconcepto];
                                setFieldValue(prev);

                                return prev;
                              });
                            }

                            //#endregion
                          },
                          negativeValues: false,
                          validations: {
                            lessThan: {
                              value: 5,
                              message: "Cantidad no permitida",
                            },
                            tests: validateByConcept(parent.idconcepto),
                            moreThan: {
                              value: 0,
                              message: "La cantidad no es válida",
                            },
                          },
                        },
                      ]}
                      endpointPath="/"
                      hideButtons={true}
                      idForEdit={id}
                      // nextDisabledFunction={()=>{miembros.length !=}}
                      getByIdFunction={() => getparentesco(parent, id)}
                    />
                  )),
                label: "",
                name: "cantidad",
                hidden: (values: any) => {
                  return (
                    values.tipo !== "9352" ||
                    JSON.stringify(values.idcausa) !== JSON.stringify(["9357"])
                  );
                },
              },
            ]}
            title={
              idhogar
                ? miembros.length
                  ? "Miembros adultos no vinculados al trabajo remunerado"
                  : "No existen miembros sin ocupación que cumplan las condiciones..."
                : "No hay un hogar seleccionado..."
            }
            endpointPath="persona"
            showSpecificDescription={false}
            nextDisabledFunction={() =>
              miembros?.length !== checkDiscapacidad?.split?.(",")?.length
            }
            idForEdit={id}
            saveButton="Guardar"
            acceptDisabledFunction={(values) =>
              Object.values(values?.cantidad ?? {}).length == 0 &&
              values.tipo === "9352" &&
              JSON.stringify(values.idcausa) == JSON.stringify(["9357"])
            }
            applyButton={false}
            submitFunction={async (values: any) => {
              values.editMode;
              const existedatos = await datico.dat_nvinculacionmiembro
                .where({ idmiembrohogar: values.idmiembro[0] })
                .toArray();
              if (!existedatos.length) {
                const idnvinculacionmiembro = await crear(
                  "dat_nvinculacionmiembro",
                  {
                    idmiembrohogar: values.idmiembro[0],
                    idcodigohogar: getHogar(),
                    tipo: values.tipo,
                    idcausa: values.tipo == "9352" ? values.idcausa : "",
                    idmotivodecision:
                      values.tipo == "9352"
                        ? values.idcausa == "9357"
                          ? values.idmotivodecision
                          : ""
                        : "",
                  }
                ).then(async (idnvinculacionmiembro: any) => {
                  if (values.idcausa == "9357") {
                    Object.values(configuracionParentesco).forEach(
                      (parentesco: any) => {
                        crear("dat_quiencuida", {
                          ...parentesco,
                          idmiembrohogar: values.idmiembro[0],
                          idcodigohogar: getHogar(),
                          idnvinculacionmiembro: idnvinculacionmiembro,
                        });
                      }
                    );
                    notificar({
                      type: "success",
                      title:
                        "Se han adicionado los datos de los miembros adultos no vinculados al trabajo remunerado satisfactoriamente",
                      content: "",
                    });
                  }
                  if (values.tipo == "9353") {
                    const existeremun = await datico.dat_remuneraciones
                      .where({ idnvinculacionmiembro: idnvinculacionmiembro })
                      .toArray();
                    if (!existeremun.length) {
                      crear("dat_remuneraciones", {
                        idcodigohogar: getHogar(),
                        idnvinculacionmiembro: idnvinculacionmiembro,
                        remuneracion: values.idcausasnoremuneraciones,
                      }).then(() => {
                        notificar({
                          type: "success",
                          title:
                            "Se han adicionado los datos de los miembros adultos no vinculados al trabajo remunerado satisfactoriamente",
                          content: "",
                        });
                      });
                    } else {
                      modificar(
                        "dat_remuneraciones",
                        "idnvinculacionmiembro",
                        idnvinculacionmiembro,
                        {
                          idcodigohogar: getHogar(),
                          remuneracion: values.idcausasnoremuneraciones,
                        }
                      ).then(() => {
                        notificar({
                          type: "success",
                          title:
                            "Se han adicionado los datos de los miembros adultos no vinculados al trabajo remunerado satisfactoriamente",
                          content: "",
                        });
                      });
                    }
                  }
                });
              } else {
                await modificar(
                  "dat_nvinculacionmiembro",
                  "idmiembrohogar",
                  values.idmiembro[0],
                  {
                    idmiembrohogar: values.idmiembro[0],
                    idcodigohogar: getHogar(),
                    tipo: values.tipo,
                    idcausa: values.tipo == "9352" ? values.idcausa : "",
                    idmotivodecision:
                      values.tipo == "9352"
                        ? values.idcausa == "9357"
                          ? values.idmotivodecision
                          : ""
                        : "",
                  }
                );
                const vinculamiento = await (
                  datico as any
                ).dat_nvinculacionmiembro
                  .where({ idmiembrohogar: values.idmiembro[0] })
                  .toArray();
                const existequiencuida = await (datico as any).dat_quiencuida
                  .where({
                    idnvinculacionmiembro:
                      vinculamiento[0].idnvinculacionmiembro,
                  })
                  .toArray();
                const existeremune = await (datico as any).dat_remuneraciones
                  .where({
                    idnvinculacionmiembro:
                      vinculamiento[0].idnvinculacionmiembro,
                  })
                  .toArray();
                if (values.tipo == "9352") {
                  if (existequiencuida?.length) {
                    if (values.idcausa == "9357") {
                      // aestaewtetet
                      Object.values(configuracionParentesco).forEach(
                        async (parentesco: any) => {
                          const existeparentesco = await (
                            datico as any
                          ).dat_quiencuida
                            .where({ idparentesco: parentesco.idparentesco })
                            .toArray();
                          if (existeparentesco?.length) {
                            modificar(
                              "dat_quiencuida",
                              "idparentesco",
                              parentesco.idparentesco,
                              {
                                ...parentesco,
                                idmiembrohogar: values.idmiembro[0],
                                idcodigohogar: getHogar(),
                              }
                            );
                          } else {
                            crear("dat_quiencuida", {
                              ...parentesco,
                              idmiembrohogar: values.idmiembro[0],
                              idcodigohogar: getHogar(),
                              idnvinculacionmiembro:
                                vinculamiento[0].idnvinculacionmiembro,
                            });
                          }
                        }
                      );
                      notificar({
                        type: "success",
                        title:
                          "Se han adicionado los datos de los miembros adultos no vinculados al trabajo remunerado satisfactoriamente",
                        content: "",
                      });
                    } else {
                      eliminar(
                        "dat_quiencuida",
                        "idnvinculacionmiembro",
                        vinculamiento[0].idnvinculacionmiembro
                      ).then(() => {
                        notificar({
                          type: "success",
                          title:
                            "Se han adicionado los datos de los miembros adultos no vinculados al trabajo remunerado satisfactoriamente",
                          content: "",
                        });
                      });
                    }
                  } else {
                    Object.values(configuracionParentesco).forEach(
                      (parentesco: any) => {
                        crear("dat_quiencuida", {
                          ...parentesco,
                          idmiembrohogar: values.idmiembro[0],
                          idcodigohogar: getHogar(),
                          idnvinculacionmiembro:
                            vinculamiento[0].idnvinculacionmiembro,
                        });
                      }
                    );
                  }
                  eliminar(
                    "dat_remuneraciones",
                    "idnvinculacionmiembro",
                    vinculamiento[0].idnvinculacionmiembro
                  ).then(() => {
                    notificar({
                      type: "success",
                      title:
                        "Se han adicionado los datos de los miembros adultos no vinculados al trabajo remunerado satisfactoriamente",
                      content: "",
                    });
                  });
                } else {
                  if (existequiencuida.length) {
                    eliminar(
                      "dat_quiencuida",
                      "idnvinculacionmiembro",
                      vinculamiento[0].idnvinculacionmiembro
                    ).then(() => {
                      notificar({
                        type: "success",
                        title:
                          "Se han adicionado los datos de los miembros adultos no vinculados al trabajo remunerado satisfactoriamente",
                        content: "",
                      });
                    });
                  }
                  if (existeremune.length) {
                    modificar(
                      "dat_remuneraciones",
                      "idnvinculacionmiembro",
                      vinculamiento[0].idnvinculacionmiembro,
                      {
                        idcodigohogar: getHogar(),
                        remuneracion: values.idcausasnoremuneraciones,
                        idnvinculacionmiembro:
                          vinculamiento[0].idnvinculacionmiembro,
                      }
                    ).then(() => {
                      notificar({
                        type: "success",
                        title:
                          "Se han adicionado los datos de los miembros adultos no vinculados al trabajo remunerado satisfactoriamente",
                        content: "",
                      });
                    });
                  } else {
                    crear("dat_remuneraciones", {
                      idcodigohogar: getHogar(),
                      remuneracion: values.idcausasnoremuneraciones,
                      idnvinculacionmiembro:
                        vinculamiento[0].idnvinculacionmiembro,
                    }).then(() => {
                      notificar({
                        type: "success",
                        title:
                          "Se han adicionado los datos de los miembros adultos no vinculados al trabajo remunerado satisfactoriamente",
                        content: "",
                      });
                    });
                  }
                }
              }
            }}
            getByIdFunction={obtenerData}
            // nextButton={{ text: "Siguiente", action: siguiente }}
            // prevButton={{ text: "Anterior", action: anterior }}
          />
        )
      ) : (
        <Typography variant="h6" m={2}>
          No hay miembros agregados
        </Typography>
      )}
    </>
  );
}
export default NoVinculado;

export const getparentesco = async (id: any, idMiembro: any) => {
  const datos_parentesco = await datico.dat_quiencuida
    .where({ idparentesco: id.idconcepto, idmiembrohogar: idMiembro })
    .toArray();
  return datos_parentesco.length
    ? { ...datos_parentesco[0], editMode: true }
    : {
        cantidad: "",
        editMode: false,
      };
};
export const getremuneraciones = async (idnvinculacionmiembro: any) => {
  const datos_remuneraciones = await datico.dat_remuneraciones
    .where({ idnvinculacionmiembro })
    .toArray();
  return datos_remuneraciones[0]?.remuneracion;
};
