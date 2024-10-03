import {
  crear,
  modificar,
} from "@/app/user-interfaces/forms/models/controllers";
import {
  obtenerBeneficiosXmiembro,
  obtenerMiembroPorBeneficios,
} from "./helpers";

import GenericForm from "@/_pwa-framework/genforms/components/form-components/form.generic";
import Meta from "@/_pwa-framework/components/Meta";
import NotificationProvider from "@/_pwa-framework/sections/Notifications/provider";
import { Typography } from "@mui/material";
import { datico } from "@/app/user-interfaces/forms/models/model";
import { getHogar } from "@/app/hogarController/hogar.controller";
import { obtenerMiembros } from "@/app/user-interfaces/forms/models/controllers.miembrohogar";
import { useLiveQuery } from "dexie-react-hooks";
import useModalState from "@/_pwa-framework/hooks/form/use-form-manager";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

//import {  } from "@/app/user-interfaces/controls/controls.config.eviel";

function ACCESO_A_PROGRAMAS_DE_PROTECCION_SOCIAL_Y_CUIDADOS() {
  const { modalActions } = useModalState();
  const [id, setid] = useState<any>(null);
  const [configuracionBeneficios, setConfiguracionBeneficios] = useState({});
  const [configuracionCausasNoAcceso, setConfiguracionCausasNoAcceso] =
    useState({});

  const [idmiembrohogar, setIdMiembroHogar] = useState<any>(0);
  const idhogar = getHogar() ?? 0;
  const [miembros, setMiembros] = useState<any>([]);
  const [checked, setCheked] = useState<any>("");
  const [keyTable, setKeyTable] = useState<any>(null);
  const notificar = NotificationProvider();
  const navegar = useNavigate();
  const siguiente = () => navegar("/adolecentes");
  const anterior = () => navegar("/autonomia/servicios");
  const ObtenerChecked = async (arr: any) => {
    //logica
    //resultado
    const result = await Promise.all(
      arr.map(async (obj: any) => {
        const uso = await datico.dat_polprogsoc
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
    setCheked(_result.toString());
  };
  const beneficios = useLiveQuery(async () => {
    const prueba = await (datico as any)["nom_concepto"]
      .where("idpadre")
      .equals("9442")
      .toArray();

    return prueba;
  });
  useLiveQuery(async () => {
    const data = await obtenerMiembros();
    setMiembros(data);
    await ObtenerChecked(data);
  });

  const submitAccesoProgramas = async (values: any) => {
    const existeMiembroBeneficio = await datico.dat_polprogsoc
      .where({ idmiembrohogar: values.idmiembrohogar[0] })
      .toArray();

    if (existeMiembroBeneficio?.length) {
      Object.values(configuracionBeneficios).forEach((beneficio: any) => {
        existeMiembroBeneficio.map(async (ben: any) => {
          const dat_estadoacceso = await datico.dat_estadonoacceso
            .where({ idpolprogsoc: ben.idpolprogsoc })
            .toArray();

          if (ben.idbeneficio == beneficio.idbeneficio) {
            modificar("dat_polprogsoc", "idbeneficio", beneficio.idbeneficio, {
              ...beneficio,
              idmiembrohogar: values.idmiembrohogar[0],
            });
          }
        });
        crear("dat_polprogsoc", {
          ...beneficio,
          idmiembrohogar: values.idmiembrohogar[0],
        });
      }),
        notificar({
          type: "success",
          title: "Los datos se han modificado satisfactoriamente",
        });

      Object.values(configuracionCausasNoAcceso).forEach((configCausa: any) => {
        existeMiembroBeneficio?.map(async (ben: any) => {
          const dat_estadoacceso = await datico.dat_estadonoacceso
            .where({ idpolprogsoc: ben.idpolprogsoc })
            .toArray();
          dat_estadoacceso?.length
            ? setKeyTable(dat_estadoacceso[0].idpolprogsoc)
            : "";

          if (ben.accede == "3" && dat_estadoacceso.length) {
            modificar(
              "dat_estadonoacceso",
              "  idpolprogsoc",
              ben.idpolprogsoc,
              {
                ...configCausa,
              }
            );
          }
        });
        crear("dat_estadonoacceso", {
          ...configCausa,
          idpolprogsoc: keyTable,
        });
      });
    } else {
      Object.values(configuracionBeneficios).forEach((configBeneficio: any) => {
        crear("dat_polprogsoc", {
          ...configBeneficio,
          idmiembrohogar: values.idmiembrohogar[0],
        }).then(async (idpolprogsoc: any) => {
          if (configBeneficio.accede == "3") {
            Object.values(configuracionCausasNoAcceso).forEach(
              (configCausa: any) => {
                crear("dat_estadonoacceso", {
                  ...configCausa,
                  idpolprogsoc,
                });
              }
            );
          }
        });
      }),
        notificar({
          type: "success",
          title: "Los datos se han adicionado satisfactoriamente",
        });
    }
  };

  return (
    <>
      <Meta title="Controles" />
      {idhogar && miembros?.length ? (
        <GenericForm
          name="test"
          applyButton={false}
          controls={[
            {
              type: "select",
              name: "idmiembrohogar",
              label: "Miembro del hogar",
              gridValues: { xs: 6, lg: 6, md: 6, sm: 6, xl: 6 },
              options: miembros,
              onChange: (e: any, ref) => {
                //ref.setFieldValue("accede", [], true);
                setid(`${e.target.value}`);
              },
              checkValues: checked,
              validations: {
                required: { message: "Debe seleccionar un miembro" },
              },
            },
            {
              type: "component",
              component: () => (
                <Typography mt={"12px"}>
                  <b>Nota aclaratoria:</b> Con frecuencia las personas no
                  conocen que beneficios existen y pudieran acceder, por ello
                  lee y explica con detenimiento las opciones a la persona
                  entrevistada
                </Typography>
              ),
              label: "",
              name: "",
              gridValues: { xs: 12, lg: 12, md: 12, sm: 12, xl: 12 },
              hidden: (values: any) => values.idmiembrohogar == "",
            },

            {
              type: "component",
              component: () =>
                id &&
                beneficios?.map((beneficio: any) => (
                  <GenericForm
                    name="beneficios"
                    applyButton={false}
                    sx={{ py: 1, px: 0 }}
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
                        gridValues: { xs: 6, lg: 4, md: 6, sm: 6, xl: 3 },
                      },
                      {
                        type: "select",
                        name: "accede",
                        label: "Acceso a beneficios",

                        gridValues: { xs: 6, lg: 2, md: 6, sm: 6, xl: 3 },
                        onChange: (event, values) => {
                          //#region Raul
                          //Se actualiza una variable con la configuración de los alimentos
                          setConfiguracionBeneficios((prev: any) => {
                            prev[beneficio.idconcepto] = {
                              ...prev[beneficio.idconcepto],
                              idbeneficio: beneficio.idconcepto,
                              accede: event.target.value,
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
                        gridValues: { xl: 2, lg: 2, md: 4, sm: 4, xs: 4 },
                        onChange: (e) => {
                          setConfiguracionCausasNoAcceso((prev: any) => {
                            prev[beneficio.idconcepto] = {
                              ...prev[beneficio.idconcepto],
                              idbeneficio: beneficio.idconcepto,
                              conocequeexiste: e.target.checked,
                            };
                            return prev;
                          });
                        },
                        hidden: (values: any) => values.accede != "3",
                      },
                      {
                        type: "check",
                        label: "En trámites para obtenerlos",
                        name: "entramites",
                        gridValues: { xl: 2, lg: 2, md: 4, sm: 4, xs: 4 },
                        onChange: (e) => {
                          setConfiguracionCausasNoAcceso((prev: any) => {
                            prev[beneficio.idconcepto] = {
                              ...prev[beneficio.idconcepto],
                              idbeneficio: beneficio.idconcepto,
                              entramites: e.target.checked,
                            };
                            return prev;
                          });
                        },
                        hidden: (values: any) => values.accede != "3",
                      },
                      {
                        type: "check",
                        label: "Necesitan ayuda para acceder",
                        name: "ayudaparaacceder",
                        gridValues: { xl: 2, lg: 2, md: 4, sm: 4, xs: 4 },
                        onChange: (e) => {
                          setConfiguracionCausasNoAcceso((prev: any) => {
                            prev[beneficio.idconcepto] = {
                              ...prev[beneficio.idconcepto],
                              idbeneficio: beneficio.idconcepto,
                              ayudaparaacceder: e.target.checked,
                            };
                            return prev;
                          });
                        },
                        hidden: (values: any) => values.accede != "3",
                      },
                    ]}
                    endpointPath="/"
                    hideButtons={true}
                    idForEdit={id}
                    setIdFunction={setid}
                    getByIdFunction={(id) =>
                      obtenerBeneficiosXmiembro(id, beneficio)
                    }
                  />
                )),
              gridValues: { lg: 12, md: 12, sm: 12, xl: 12, xs: 12 },
              name: "",
              label: "",
              hidden: (values: any) => values.idmiembrohogar == "",
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
          submitFunction={submitAccesoProgramas}
          getByIdFunction={(id) => obtenerMiembroPorBeneficios(id)}
        />
      ) : (
        <Typography variant="h6" p={2}>
          {idhogar
            ? " No existen miembros en el hogar seleccionado"
            : "No existe un hogar seleccionado"}
        </Typography>
      )}
    </>
  );
}

export default ACCESO_A_PROGRAMAS_DE_PROTECCION_SOCIAL_Y_CUIDADOS;
