import {
  CreateOrModify,
  obtenerDatosPorLlave,
} from "@/app/user-interfaces/forms/models/controllers";
import { Divider, Typography } from "@mui/material";
import { useCallback, useState } from "react";

import GenericForm from "@/_pwa-framework/genforms/components/form-components/form.generic";
import Meta from "@/_pwa-framework/components/Meta";
import NotificationProvider from "@/_pwa-framework/sections/Notifications/provider";
import { datico } from "@/app/user-interfaces/forms/models/model";
import { getHogar } from "@/app/hogarController/hogar.controller";
import { obtenerMobiliarios } from "./utils";
import { useLiveQuery } from "dexie-react-hooks";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Condicion_de_vivienda() {
  const [id, setid] = useState<any>(null);
  const hogar = getHogar();
  const [errors, setErrors] = useState<any>({});
  const navegar = useNavigate();
  const siguiente = () => navegar("/servicios-equipamientos/vehiculos");
  const anterior = () => navegar("/servicios-equipamientos/servicios");
  const [mobiliarioBasico, setmobiliarioBasico] = useState([]);
  const [configuraciónMobiliarioBasico, setConfiguracionMobiliarioBasico] =
    useState({});
  const [listo, setListo] = useState<any>(false);
  const findByIdMobiliarioSetConfiguracion = async (id: any) => {
    return await obtenerMobiliarios(id, setConfiguracionMobiliarioBasico);
  };
  const nexDisabledFunction = useCallback(() => !listo, [listo]);
  const notifyValidation = useCallback(
    (values: any) => {
      const validateRequired = Object.values(
        configuraciónMobiliarioBasico
      ).filter((item: any) => {
        const idMobiliarioCheck =
          item.idmobiliarioequipo == 9782 ||
          item.idmobiliarioequipo == 9781 ||
          item.idmobiliarioequipo == 9783;
        const estadoCantidadCheck =
          (!!item.estado && !item.cantidad.length) ||
          (!item.estado && !!item.cantidad.length);
        return idMobiliarioCheck && estadoCantidadCheck;
      });

      // if (validateRequired.length) {
      //   return "Hay campos requeridos que no tienen información";
      // }
      if (Object.values(errors).length) {
        return "Hay valores incorrectos en las declaraciones de los mobiliarios";
      }
      if (!Object.values(configuraciónMobiliarioBasico).length) {
        return "Debe introducir los datos de los muebles y equipos";
      }
    },
    [errors]
  );
  const checkListo = async (id: string | number) => {
    const datos: any = await obtenerDatosPorLlave(
      "dat_hogarmobiliarioequipos",
      "idcodigohogar",
      id.toString()
    );
    console.log("sdgfhdgsh", datos, id);
    setListo(!!datos?.length);
  };

  useEffect(() => {
    console.log("efecto hogar", hogar);
    if (hogar) {
      checkListo(parseInt(hogar));
    }
  }, [hogar]);

  const data = useLiveQuery(async () => {
    const prueba = await (datico as any)["nom_concepto"]
      .where("idpadre")
      .equals("9759")
      .toArray();

    setmobiliarioBasico(prueba);
    return prueba;
  });
  const form = useCallback(
    () =>
      hogar ? (
        <GenericForm
          name="test"
          controls={[
            {
              type: "component",
              component: () => (
                <Typography variant="h5" sx={{ mt: 0, mb: 2 }}>
                  Mobiliario básico y equipos funcionando
                </Typography>
              ),
              label: "",
              name: "",
              gridValues: { xs: 12, lg: 12, md: 12, sm: 12, xl: 12 },
            },
            {
              type: "component",
              component: () => (
                <Typography>
                  <b>Nota aclaratoria: </b>La información solicitada se refiere
                  al mobiliario básico y a equipos que comparten en el hogar si
                  se usan cotidianamente, o en caso de necesidad para el bien
                  común aunque sean propiedad .
                </Typography>
              ),
              label: "",
              name: "",
              gridValues: { xs: 12, lg: 12, md: 12, sm: 12, xl: 12 },
            },

            {
              type: "component",
              component: () => (
                <Typography sx={{ mt: 4, mb: 0 }}>
                  <b>Muebles/Equipos</b>
                </Typography>
              ),
              label: "",
              name: "",
              gridValues: { xs: 5, lg: 5, md: 5, sm: 5, xl: 5 },
            },

            {
              type: "component",
              component: () => <Divider sx={{ mt: 0, mb: 0 }} />,
              label: "",
              name: "",
              gridValues: { xs: 12, lg: 12, md: 12, sm: 12, xl: 12 },
            },

            {
              type: "component",
              component: () =>
                mobiliarioBasico.map((mobiliarioBasico: any) =>
                  mobiliarioBasico.idconcepto == "9782" ||
                  mobiliarioBasico.idconcepto == "9781" ||
                  mobiliarioBasico.idconcepto == "9783" ? (
                    <GenericForm
                      name="test"
                      sx={{ p: 1 }}
                      setExternalErrors={setErrors}
                      controls={[
                        {
                          type: "component",
                          component: () => (
                            <Typography sx={{ mt: 2 }}>
                              {mobiliarioBasico.denominacion}
                            </Typography>
                          ),
                          label: "",
                          name: "",
                          gridValues: { xs: 4, lg: 4, md: 4, sm: 4, xl: 4 },
                        },
                        {
                          type: "number",
                          label: "Cuántos",
                          gridValues: { xs: 4, lg: 4, md: 4, sm: 4, xl: 4 },
                          name: "cantidad",
                          format: "units",
                          negativeValues: false,
                          onChange: (event) => {
                            setConfiguracionMobiliarioBasico((prev: any) => {
                              prev[mobiliarioBasico.idconcepto] = {
                                ...prev[mobiliarioBasico.idconcepto],
                                cantidad: event.value,
                                idmobiliarioequipo: mobiliarioBasico.idconcepto,
                              };
                              return prev;
                            });
                          },
                          validations: {
                            moreThan: { value: 0, message: "No puede ser 0" },
                          },
                        },

                        // {
                        //   type: "select",
                        //   label: "Propio/Asignado",
                        //   name: "estado",
                        //   sx: { mx: 1 },
                        //   validations: {
                        //     required: {
                        //       message: "Debe especificar",
                        //       when: {
                        //         name: "cantidad",
                        //         expression: (value) => {
                        //           return value?.length;
                        //         },
                        //       },
                        //     },
                        //   },
                        //   options: [
                        //     { idconcepto: "0", denominacion: "Propio" },
                        //     { idconcepto: "1", denominacion: "Asignado" },
                        //   ],
                        //   gridValues: { xl: 4, lg: 4, md: 4, sm: 4, xs: 4 },
                        //   onChange: (event) => {
                        //     setConfiguracionMobiliarioBasico((prev: any) => {
                        //       prev[mobiliarioBasico.idconcepto] = {
                        //         ...prev[mobiliarioBasico.idconcepto],
                        //         estado: event.target.value,
                        //         idmobiliarioequipo:
                        //           mobiliarioBasico.idconcepto,
                        //       };
                        //       return prev;
                        //     });
                        //   },
                        // },
                      ]}
                      idForEdit={mobiliarioBasico.idconcepto}
                      getByIdFunction={findByIdMobiliarioSetConfiguracion}
                      endpointPath="/"
                      title=""
                      hideButtons={true}
                    />
                  ) : (
                    <GenericForm
                      name="test"
                      sx={{ p: 1 }}
                      setExternalErrors={setErrors}
                      idForEdit={mobiliarioBasico.idconcepto}
                      getByIdFunction={findByIdMobiliarioSetConfiguracion}
                      controls={[
                        {
                          type: "component",
                          component: () => (
                            <Typography sx={{ mt: 2 }}>
                              {mobiliarioBasico.denominacion}
                            </Typography>
                          ),
                          label: "",
                          name: "",
                          gridValues: { xs: 4, lg: 4, md: 4, sm: 4, xl: 4 },
                        },
                        {
                          type: "number",
                          label: "Cuántos",
                          gridValues: { xs: 4, lg: 4, md: 4, sm: 4, xl: 4 },
                          name: "cantidad",
                          negativeValues: false,
                          format: "units",
                          onChange: (event) => {
                            setConfiguracionMobiliarioBasico((prev: any) => {
                              prev[mobiliarioBasico.idconcepto] = {
                                ...prev[mobiliarioBasico.idconcepto],
                                cantidad: event.value,
                                idmobiliarioequipo: mobiliarioBasico.idconcepto,
                                tipoMobiliario: 1,
                              };
                              return prev;
                            });
                          },
                          validations: {
                            moreThan: { value: 0, message: "No puede ser 0" },
                          },
                        },
                      ]}
                      endpointPath="/"
                      title=""
                      hideButtons={true}
                    />
                  )
                ),
              label: "",
              name: "",
              gridValues: { xs: 12, lg: 12, md: 12, sm: 12, xl: 12 },
            },
          ]}
          title=""
          description=""
          endpointPath="persona"
          showSpecificDescription={false}
          idForEdit={id}
          saveButton="Guardar"
          setIdFunction={setid}
          notifyValidation={notifyValidation}
          submitFunction={(values: any) => {
            Object.values(configuraciónMobiliarioBasico).forEach(
              (mobiliario: any) =>
                CreateOrModify(
                  "dat_hogarmobiliarioequipos",
                  {
                    idcodigohogar: getHogar(),
                    idmobiliarioequipo: mobiliario.idmobiliarioequipo,
                  },
                  {
                    ...mobiliario,
                    idcodigohogar: getHogar(),
                  },
                  "idhogarmobiliarioequipo"
                )
            );
            notificar({
              type: "success",
              title:
                "Los datos  de mobiliario básico y equipos funcionando se han adicionado satisfactoriamente",
              content: "",
            });
            setListo(true);
          }}
          getByIdFunction={(id) =>
            obtenerDatosPorLlave(
              "dat_hogarmobiliarioequipos",
              "idhogarmobiliarioequipo",
              id
            )
          }
          nextButton={{ text: "Siguiente", action: siguiente }}
          prevButton={{ text: "Anterior", action: anterior }}
          nextDisabledFunction={nexDisabledFunction}
          applyButton={false}
        />
      ) : (
        <Typography variant="h6" margin={2}>
          No existe un hogar seleccionado
        </Typography>
      ),
    [
      hogar,
      data,
      listo,
      data,
      configuraciónMobiliarioBasico,
      errors,
      id,
      nexDisabledFunction,
      ,
      notifyValidation,
    ]
  );
  const notificar = NotificationProvider();
  return (
    <>
      <Meta title="Controles" />
      {form()}
    </>
  );
}

export default Condicion_de_vivienda;
