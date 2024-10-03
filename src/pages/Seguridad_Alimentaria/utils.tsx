import {
  CreateOrModify,
  obtenerDatosPorLlave,
} from "@/app/user-interfaces/forms/models/controllers";
import { Divider, Typography } from "@mui/material";

import { IGenericControls } from "@/_pwa-framework/genforms/types/controls/controls.types";
import NotificationProvider from "@/_pwa-framework/sections/Notifications/provider";
import { datico } from "@/app/user-interfaces/forms/models/model";
import { getHogar } from "@/app/hogarController/hogar.controller";
import { useLiveQuery } from "dexie-react-hooks";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export const topElements: IGenericControls[] = [
  {
    type: "component",
    component: () => (
      <>
        {" "}
        <Typography textAlign={"justify"}>
          <b>Nota aclaratoria: </b>Cuando se pregunta si encontró los alimentos
          en el mercado, se refiere a cualquier situación de compra-venta, ya
          sea los alimentos normados, en mercados estatales,mercados privados
          (MIPYMES y mercados agropecuarios donde venden productores privados o
          cooperativos) o mercado negro o informal.
        </Typography>
        <Typography textAlign={"justify"}>
          Tener en cuenta que la tabla combina dos enmarcamientos temporales: la
          última semana y el último mes.
        </Typography>
        <Typography textAlign={"justify"}>
          <b>¿Los encontró? </b>Se refiere a si en la última semana los
          alimentos del listado se encontraron en el mercado
        </Typography>
        <Typography textAlign={"justify"}>
          <b>Frecuencia: </b> Es la frecuencia de consumo semanal de cada uno de
          los alimentos del listado, pero tomando como referencia la situación
          promedio del último mes
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
    gridValues: { xs: 5, lg: 5, md: 5, sm: 5, xl: 5 },
  },
  {
    type: "component",
    component: () => (
      <>
        {" "}
        <Typography sx={{ mt: 4 }} flex={1} textAlign={"center"}>
          <b>¿Les gustan?</b>
        </Typography>
      </>
    ),
    label: "",
    name: "",
    gridValues: { xl: 2, lg: 2, md: 2, sm: 2, xs: 2 },
  },
  {
    type: "component",
    component: () => (
      <>
        {" "}
        <Typography sx={{ mt: 4 }} flex={1} textAlign={"center"}>
          <b>¿Los encontro?</b>
        </Typography>
      </>
    ),
    label: "",
    name: "",
    gridValues: { xl: 3, lg: 3, md: 3, sm: 3, xs: 3 },
  },
  {
    type: "component",
    component: () => (
      <>
        <Typography sx={{ mt: 4 }} flex={1} textAlign={"center"}>
          <b>Frecuencia</b>
        </Typography>
      </>
    ),
    label: "",
    name: "",
    gridValues: { xl: 2, lg: 2, md: 2, sm: 2, xs: 2 },
  },
  {
    type: "component",
    component: () => <Divider sx={{ mt: 0, mb: 1 }} />,
    label: "",
    name: "",
    gridValues: { xs: 12, lg: 12, md: 12, sm: 12, xl: 12 },
  },
];
export const midElements: IGenericControls[] = [
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
          ¿En los últimos 7 días,en los que su hogar tuvo que emplear alguna de
          las siguientes estrategias para superar la falta de alimentos o de
          dinero para comprarlos? Si los hubo, ¿cuántos días fueron?
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
    gridValues: { xs: 8, lg: 8, md: 8, sm: 8, xl: 8 },
  },
  {
    type: "component",
    component: () => (
      <>
        {" "}
        <Typography sx={{ mt: 4 }} flex={1} textAlign={"center"}>
          <b>Días </b>
        </Typography>
      </>
    ),
    label: "",
    name: "",
    gridValues: { xs: 3, lg: 3, md: 3, sm: 3, xl: 3 },
  },
  {
    type: "component",
    component: () => <Divider sx={{ mt: 0, mb: 1 }} />,
    label: "",
    name: "",
    gridValues: { xs: 12, lg: 12, md: 12, sm: 12, xl: 12 },
  },
];
export const message = (
  <Typography
    variant="h5"
    p={2}
    flex={1}
    flexDirection={"row"}
    textAlign={"center"}
  >
    No hay hogar seleccionado
  </Typography>
);
export function useSeguridadAlimentaria(): [
  submitFunction: (
    values: any,
    name: string,
    idForEdit: any,
    event: any
  ) => void,
  getByIdFunction: (idForEdit: any) => any,
  notifyValidation: (values?: any) => Promise<string | void> | string | void,
  siguiente: () => void,
  anterior: () => void,
  cereales: any[],
  estrategias: any[],
] {
  const notificar = NotificationProvider();
  const [cereales, setCereales] = useState([]);
  const [estrategias, setEstrategias] = useState([]);
  const navegar = useNavigate();
  const siguiente = () => navegar("/estrategia/otros");
  const anterior = () => navegar("/estrategia/gastos");
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
  const submitFunction = (values: any) => {
    Object.values(values.alimentos).forEach((configAlimento: any) => {
      CreateOrModify(
        "dat_hogardiversidadalimentaria",
        {
          idtipoalimento: configAlimento.idtipoalimento,
          idcodigohogar: getHogar(),
        },
        {
          ...configAlimento,
          idcodigohogar: getHogar(),
        },
        "idhogardiversidadalimentaria"
      ).then((id) => {});
    });
    Object.values(values.estrategia).forEach((configEstrategia: any) => {
      CreateOrModify(
        "dat_hogarestrategias",
        {
          idcodigohogar: getHogar(),
          idestrategia: configEstrategia.estrategia,
        },
        {
          dias: configEstrategia.dias,
          idcodigohogar: getHogar(),
          idestrategia: configEstrategia.estrategia,
        },
        "idhogarestrategia"
      );
    });
    notificar({
      type: "success",
      title:
        "Los datos de seguridad alimentaria han sido adicionados satisfactoriamente",
    });
  };
  const getByIdFunction = (id: any) =>
    obtenerDatosPorLlave(
      "dat_hogardiversidadalimentaria",
      "idhogardiversidadalimentaria",
      id
    );
  const notifyValidation = (values: any) => {
    const alimentosValues = Object.values(values.alimentos);
    if (alimentosValues.length != cereales.length) {
      return "Debe llenar los datos de todos los alimentos";
    }
    if (alimentosValues.length) {
      let faltanDatos = false;
      alimentosValues.forEach((item: any) => {
        Object.values(item).forEach((value: any) => {
          if (!value) {
            faltanDatos = true;
            return;
          }
          if (faltanDatos) return;
        });
      });
      if (faltanDatos) {
        return "Faltan datos por declarar en los alimentos";
      }
    }
  };

  return [
    submitFunction,
    getByIdFunction,
    notifyValidation,
    siguiente,
    anterior,
    cereales,
    estrategias,
  ];
}
