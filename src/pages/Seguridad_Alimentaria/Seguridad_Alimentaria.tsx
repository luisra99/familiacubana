import { Divider, Typography } from "@mui/material";

import GenericForm from "@/_pwa-framework/genforms/components/form-components/form.generic";
import Meta from "@/_pwa-framework/components/Meta";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  crear,
  obtenerDatosPorLlave,
  obtenerPrimeroPorLlaveEnHogarActual,
} from "@/app/user-interfaces/forms/models/controllers";
import { useLiveQuery } from "dexie-react-hooks";
import { datico } from "@/app/user-interfaces/forms/models/model";
import { getHogar } from "@/app/hogarController/hogar.controller";

function Seguridad_Alimentaria() {
  const [id, setid] = useState<any>(null);
  const [cereales, setCereales] = useState([]);
  const [estrategias, setEstrategias] = useState([]);
  const [configuracionAlimentos, setConfiguracionAlimentos] = useState({});
  const [configuracionEstrategias, setConfiguracionEstrategias] = useState({});
  const navegar = useNavigate();
  const siguiente = () => navegar("/Otros_Datos");
  const anterior = () => navegar("/gastos");
  const data = useLiveQuery(async () => {
    const prueba = await (datico as any)["nom_concepto"]
      .where("idpadre")
      .equals("9628")
      .toArray();
    setCereales(prueba);
    return prueba;
  });

  const alimentos = useLiveQuery(async () => {
    const prueba = await (datico as any)["nom_concepto"]
      .where("idpadre")
      .equals("9557")
      .toArray();

    setEstrategias(prueba);
    return prueba;
  });

  return (
    <>
      <Meta title="Controles" />

      <GenericForm
        name="test"
        controls={[
          {
            type: "component",
            component: () => (
              <>
                {" "}
                <Typography sx={{ mt: -4 }} textAlign={"justify"}>
                  <b>Nota aclaratoria: </b>Cuando se pregunta si encontró los
                  alimentos en el mercado, se refiere a cualquier situación de
                  compra-venta, ya sea los alimentos normados, en mercados
                  estatales,mercados privados (MIPYMES y mercados agropecuarios
                  donde venden productores privados o cooperativos) o mercado
                  negro o informal.
                </Typography>
                <Typography textAlign={"justify"}>
                  Tener en cuenta que la tabla combina dos enmarcamientos
                  temporales: la última semana y el último mes.
                </Typography>
                <Typography textAlign={"justify"}>
                  <b>¿Los encontró? </b>Se refiere a si en la última semana los
                  alimentos del listado se encontraron en el mercado
                </Typography>
                <Typography textAlign={"justify"}>
                  <b>Frecuencia: </b> Es la frecuencia de consumo semanal de
                  cada uno de los alimentos del listado, pero tomando como
                  referencia la situación promedio del último mes
                </Typography>
              </>
            ),
            label: "",
            name: "",
            gridValues: { xs: 12, lg: 12, md: 12, sm: 12, xl: 12 },
          },
          {
            type: "component",
            component: () => (
              <>
                {" "}
                <Typography sx={{ mt: 4 }} textAlign={"justify"}>
                  <b>Grupos de alimentos</b>
                </Typography>
              </>
            ),
            label: "",
            name: "",
            gridValues: { xs: 4, lg: 5, md: 4, sm: 4, xl: 5 },
          },

          {
            type: "component",
            component: () => <Divider sx={{ mt: 0, mb: 1 }} />,
            label: "",
            name: "",
            gridValues: { xs: 12, lg: 12, md: 12, sm: 12, xl: 12 },
          },

          {
            type: "component",
            component: () =>
              estrategias.map((estrategia: any) => (
                <GenericForm
                  key={estrategia.idconcepto}
                  name="test"
                  controls={[
                    {
                      type: "component",
                      component: () => (
                        <Typography sx={{ mt: 2 }}>
                          {estrategia.denominacion}
                        </Typography>
                      ),
                      label: "",
                      name: "",
                      gridValues: { xs: 5, lg: 5, md: 5, sm: 5, xl: 5 },
                    },
                    {
                      type: "select",
                      label: "¿Le gusta?",
                      name: "legustan",
                      options: [
                        { idconcepto: "1", denominacion: "Si" },
                        { idconcepto: "0", denominacion: "No" },
                      ],
                      gridValues: { xl: 2, lg: 2, md: 2, sm: 2, xs: 2 },
                      onChange: (event) => {
                        //#region Raul
                        //Se actualiza una variable con la configuración de los alimentos
                        setConfiguracionAlimentos((prev: any) => {
                          prev[estrategia.idconcepto] = {
                            ...prev[estrategia.idconcepto],
                            idtipoalimento: estrategia.idconcepto,
                            legustan: event.target.value,
                          };
                          return prev;
                        });
                        //#endregion
                      },
                    },
                    {
                      type: "select",
                      label: "¿Los encuentra?",
                      name: "losencontro",

                      options: [
                        { idconcepto: "1", denominacion: "Si" },
                        { idconcepto: "0", denominacion: "No" },
                      ],
                      gridValues: { xl: 3, lg: 3, md: 3, sm: 3, xs: 3 },
                      onChange: (event) => {
                        //#region Raul
                        //Se actualiza una variable con la configuración de los alimentos
                        setConfiguracionAlimentos((prev: any) => {
                          prev[estrategia.idconcepto] = {
                            ...prev[estrategia.idconcepto],
                            idtipoalimento: estrategia.idconcepto,
                            losencontro: event.target.value,
                          };
                          return prev;
                        });
                        //#endregion
                      },
                    },
                    {
                      type: "select",
                      label: "Frecuencia",
                      name: "frecuencia",
                      url: "9619",

                      gridValues: { xl: 2, lg: 2, md: 2, sm: 2, xs: 2 },
                      onChange: (event) => {
                        //#region Raul
                        //Se actualiza una variable con la configuración de los alimentos
                        setConfiguracionAlimentos((prev: any) => {
                          prev[estrategia.idconcepto] = {
                            ...prev[estrategia.idconcepto],
                            idtipoalimento: estrategia.idconcepto,
                            frecuencia: event.target.value,
                          };
                          return prev;
                        });
                        //#endregion
                      },
                    },
                  ]}
                  getByIdFunction={(id) =>
                    obtenerPrimeroPorLlaveEnHogarActual(
                      "dat_hogardiversidadalimentaria",
                      "idtipoalimento",
                      estrategia.idconcepto,
                      "dat_hogarpertenece"
                    )
                  }
                  endpointPath="/"
                  title=""
                  hideButtons={true}
                />
              )),
            label: "",
            name: "",
            gridValues: { xs: 12, lg: 12, md: 12, sm: 12, xl: 12 },
          },

          {
            type: "component",
            component: () => <Divider sx={{ mt: 0, mb: 1 }} />,
            label: "",
            name: "",
            gridValues: { xs: 12, lg: 12, md: 12, sm: 12, xl: 12 },
          },
          {
            type: "component",
            component: () => (
              <>
                <Typography sx={{ mt: 2, mb: 2 }} variant="h6">
                  Estrategias de afrontamiento en el hogar
                </Typography>{" "}
                <Typography sx={{ mt: 2, mb: 2 }}>
                  ¿En los últimos 7 días,en los que su hogar tuvo que emplear
                  alguna de las siguientes estrategias para superar la falta de
                  alimentos o de dinero para comprarlos? Si los hubo, ¿cuántos
                  días fueron?
                </Typography>
              </>
            ),
            label: "",
            name: "",
            gridValues: { xs: 12, lg: 12, md: 12, sm: 12, xl: 12 },
          },
          {
            type: "component",
            component: () => (
              <>
                {" "}
                <Typography sx={{ mt: 4 }} textAlign={"justify"}>
                  <b>Estrategias </b>
                </Typography>
              </>
            ),
            label: "",
            name: "",
            gridValues: { xs: 2, lg: 5, md: 2, sm: 2, xl: 2 },
          },

          {
            type: "component",
            component: () => <Divider sx={{ mt: 0, mb: 1 }} />,
            label: "",
            name: "",
            gridValues: { xs: 12, lg: 12, md: 12, sm: 12, xl: 12 },
          },
          {
            type: "component",
            component: () =>
              estrategias.map((estrategia: any) => (
                <GenericForm
                  key={estrategia.idconcepto}
                  name="test"
                  controls={[
                    {
                      type: "component",
                      component: () => (
                        <Typography sx={{ mt: 2 }}>
                          {estrategia.denominacion}
                        </Typography>
                      ),
                      label: "",
                      name: "",
                      gridValues: { xs: 9, lg: 9, md: 9, sm: 9, xl: 9 },
                    },

                    {
                      type: "number",
                      label: "Días",
                      name: "dias",
                      format: "units",
                      gridValues: { xl: 3, lg: 3, md: 3, sm: 3, xs: 3 },
                      onChange: (event) => {
                        //#region Raul
                        //Se actualiza una variable con la configuración de los alimentos
                        setConfiguracionEstrategias((prev: any) => {
                          prev[estrategia.idconcepto] = {
                            ...prev[estrategia.idconcepto],
                            dias: event.value,
                          };
                          return prev;
                        });
                        //#endregion
                      },
                    },
                  ]}
                  getByIdFunction={(id) =>
                    obtenerPrimeroPorLlaveEnHogarActual(
                      "dat_hogardiversidadalimentaria",
                      "idtipoalimento",
                      estrategia.idconcepto,
                      "dat_hogarpertenece"
                    )
                  }
                  endpointPath="/"
                  title=""
                  hideButtons={true}
                />
              )),
            label: "",
            name: "",
            gridValues: { xs: 12, lg: 12, md: 12, sm: 12, xl: 12 },
          },
        ]}
        title="Seguridad alimentaria y estrategias de afrontamiento en el hogar"
        description=""
        endpointPath="persona"
        showSpecificDescription={false}
        setIdFunction={setid}
        saveOnDirty={false}
        submitFunction={(values) => {
          //#region Raul
          //Crea el registro de los alimentos
          Object.values(configuracionAlimentos).forEach((configAlimento: any) =>
            crear("dat_hogardiversidadalimentaria", {
              ...configAlimento,
              idhogardiversidadalimentaria: getHogar(),
            })
          );
          Object.values(configuracionEstrategias).forEach(
            (configEstrategia: any) =>
              crear("dat_hogarestrategias", {
                ...configEstrategia,
                idcodigohogar: getHogar(),
              })
          );
          //#endregion
          // if (id)
          //   modificar(
          //     "dat_hogardiversidadalimentaria",
          //     "idhogardiversidadalimentaria",
          //     id,
          //     values
          //   );
          // else crear("dat_hogardiversidadalimentaria", values);
        }}
        getByIdFunction={(id) =>
          obtenerDatosPorLlave(
            "dat_hogardiversidadalimentaria",
            "idhogardiversidadalimentaria",
            id
          )
        }
        nextButton={{ text: "Siguiente", action: siguiente }}
        prevButton={{ text: "Anterior", action: anterior }}
        saveButton="Guardar"
      />
    </>
  );
}

export default Seguridad_Alimentaria;
