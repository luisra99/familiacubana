import { Button, Stack } from "@mui/material";

import {
  crear,
  modificar,
  obtenerDatosPorLlave,
} from "@/app/user-interfaces/forms/models/controllers";

import CheckIcon from "@mui/icons-material/CheckCircleRounded";
import AddHomeIcon from "@mui/icons-material/AddHome";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import Meta from "@/_pwa-framework/components/Meta";
import GenericForm from "@/_pwa-framework/genforms/components/form-components/form.generic";
import useModalState from "@/_pwa-framework/hooks/form/use-form-manager";
import { IGenericControls } from "@/_pwa-framework/genforms/types/controls/controls.types";
import TableView from "@/_pwa-framework/user-solicitudes/view";
import NotificationProvider from "@/_pwa-framework/sections/Notifications/provider";

import {
  setHogar,
  getHogar,
  setJefeHogar,
  setDireccionHogar,
} from "@/app/hogarController/hogar.controller";

import { useConfirm } from "material-ui-confirm";

import { datico as db } from "@/app/user-interfaces/forms/models/model";
import { useLiveQuery } from "dexie-react-hooks";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

function DatosHogar() {
  const idhogar = getHogar() ?? 0;
  // hooks
  const [id, setid] = useState<any>(null);
  const [hogares, setHogares] = useState<any>([]);
  const [idzonavulnerable, setIdZonaVulnerable] = useState<any>(true);
  const [titleForm, setTitleForm] = useState<any>("");
  // utils
  const confirm = useConfirm();
  const navegar = useNavigate();
  const siguiente = () => navegar("/nucleo-info");
  const { modalActions } = useModalState();
  const notificar = NotificationProvider();
  // data
  useLiveQuery(async () => {
    async function unionUnidadAlojamiento(arr: any) {
      const join = await Promise.all(
        arr.map(async (obj: any) => {
          // console.log(obj);
          const unidaddealojamiento = await db.dat_unidaddealojamiento.get(
            obj.idunidaddealojamiento
          );
          // console.log(unidaddealojamiento);
          const miembros = await db.dat_miembrohogar
            .where({ idcodigohogar: obj.idcodigohogar.toString() })
            .toArray();
          // console.log(miembros);
          const cantmiembros = miembros.length;
          const jefeHogar = miembros.find((obj) => {
            return obj?.idparentesco[0] == "9270";
          });
          const jefehogar = jefeHogar
            ? `${jefeHogar.pnombre} ${jefeHogar.snombre} ${jefeHogar.papellido} ${jefeHogar.sapellido}`
            : "";
          // console.log(jefeHogar);
          return {
            ...obj,
            ...unidaddealojamiento,
            cantmiembros: cantmiembros > 0 ? cantmiembros : "",
            jefehogar: jefehogar,
          };
        })
      );
      return join;
    }
    const hogares = await db.dat_hogar.where("idestado").notEqual(4).toArray();
    const data = await unionUnidadAlojamiento(hogares);
    setHogares(data);
  });
  // form
  const circunscripcion: IGenericControls = {
    type: "text",
    label: "Circunscripción",
    gridValues: { xl: 6, lg: 6, md: 6, sm: 12, xs: 12 },
    name: "circunscripcion",
    pattern: /^[a-zA-Z0-9]+$/,
  };

  const cdr: IGenericControls = {
    type: "text",
    label: "CDR",
    gridValues: { xl: 6, lg: 6, md: 6, sm: 12, xs: 12 },
    name: "cdr",
    pattern: /^[a-zA-Z0-9]+$/,
  };

  const direccion: IGenericControls = {
    type: "text",
    label: "Dirección",
    gridValues: { xl: 12, lg: 12, md: 12, sm: 12, xs: 12 },
    name: "direccion",
    multiline: { minRows: 1 },
    // pattern: /^[a-zA-Z0-9]+$/,
  };

  const geolocalizacion: IGenericControls = {
    type: "text",
    label: "Geolocalización",
    name: "geolocalizacion",
    gridValues: { xl: 6, lg: 6, md: 6, sm: 12, xs: 12 },
  };

  const zonaresidencial: IGenericControls = {
    type: "select",
    name: "idzonaresidencia",
    label: "Zona de residencia",
    gridValues: { xl: 4, lg: 4, md: 4, sm: 12, xs: 12 },
    url: "9289",
  };

  const tipovivienda: IGenericControls = {
    type: "select",
    name: "idtipovivienda",
    label: "Tipo de vivienda",
    gridValues: { xl: 4, lg: 4, md: 4, sm: 12, xs: 12 },
    url: "9292",
  };

  const asentamiento: IGenericControls = {
    type: "select",
    name: "idasentamiento",
    label: "Asentamiento",
    gridValues: { xl: 4, lg: 4, md: 4, sm: 12, xs: 12 },
    url: "",
  };

  const planturquino: IGenericControls = {
    type: "select",
    label: "Plan turquino",
    name: "planturquino",
    gridValues: { xl: 4, lg: 4, md: 4, sm: 12, xs: 12 },
    options: [
      { idconcepto: "1", denominacion: "Sí" },
      { idconcepto: "2", denominacion: "No" },
    ],
  };

  const vulnerabilidad: IGenericControls = {
    type: "select",
    label: "Comunidad en situación de vulnerabilidad",
    name: "zonavulnerable",
    gridValues: { xl: 4, lg: 4, md: 4, sm: 12, xs: 12 },
    options: [
      { idconcepto: "1", denominacion: "Sí" },
      { idconcepto: "2", denominacion: "No" },
    ],
    onChange: (e) => {
      // console.log(e);
      const { value } = e.target;
      setIdZonaVulnerable(value == "2");
    },
  };

  const comunidad: IGenericControls = {
    type: "select",
    name: "idzonavulnerable",
    label: "Comunidad",
    url: "",
    gridValues: { xl: 4, lg: 4, md: 4, sm: 12, xs: 12 },
    disabled: (values) => {
      return idzonavulnerable;
    },
  };

  const formularioHogar: IGenericControls[] = [
    direccion,
    circunscripcion,
    cdr,
    // geolocalizacion,
    zonaresidencial,
    tipovivienda,
    asentamiento,
    planturquino,
    vulnerabilidad,
    comunidad,
  ];

  function getFormTabla() {
    return (
      <GenericForm
        controls={[
          {
            type: "component",
            component: () => (
              <Stack
                direction="row"
                display={"inline-list-item"}
                justifyContent="flex-start"
                sx={{ width: "100%" }}
              >
                <Button
                  onClick={() => {
                    setTitleForm("Adicionar datos del hogar");
                    modalActions.open("formularioHogar");
                  }}
                  variant="contained"
                >
                  Adicionar
                </Button>
              </Stack>
            ),
            label: "",
            name: "",
            gridValues: { xs: 12, lg: 12, md: 12, sm: 12, xl: 12 },
          },
          {
            type: "component",
            component: () => (
              <TableView
                values={hogares}
                headers={[
                  { name: "direccion", label: "Dirección" },
                  { name: "jefehogar", label: "Jefe de hogar" },
                  {
                    name: "cantmiembros",
                    label: "Cantidad de miembros",
                  },
                ]}
                idKey="idcodigohogar"
                title=""
                multiSelect={true}                
                rowActions={[
                  {
                    label: "Selecionar",
                    action: (values: any) => {
                      // console.log(values);
                      setHogar(values.idcodigohogar);
                      setJefeHogar(values.jefehogar);
                      setDireccionHogar(values.direccion);
                      notificar({
                        type: "success",
                        title: "Hogar actual",
                        content: "Hogar actual seleccionado satisfactoriamente",
                      });
                    },
                    icon: CheckIcon,
                    color: "#54CC49",
                  },
                  {
                    label: "Modificar",
                    action: (values: any) => {
                      setid(values.idcodigohogar);
                      setTitleForm("Modificar datos del hogar");
                      modalActions.open("formularioHogar");
                    },
                    icon: EditIcon,
                  },
                  {
                    label: "Adicionar otro hogar",
                    action: (values) => {
                      const dat_hogar = {
                        idunidaddealojamiento: values.idunidaddealojamiento,
                        idestado: 1,
                      };
                      crear("dat_hogar", dat_hogar).then(() =>
                        notificar({
                          type: "success",
                          title: "Nuevo hogar en la vivienda",
                          content: "Ha sido adicionado correctamente",
                        })
                      );
                    },
                    icon: AddHomeIcon,
                  },
                  {
                    icon: DeleteIcon,
                    label: "Eliminar",
                    action: (values: any) => {
                      confirm({
                        title: "Eliminar",
                        confirmationText: "Eliminar",
                        cancellationText: "Cancelar",
                        description: `¿Está seguro que desea eliminar el hogar?`,
                      })
                        .then(() => {
                          // eliminar(
                          //   "dat_hogar",
                          //   "idcodigohogar",
                          //   values.idcodigohogar
                          // );
                          db.dat_hogar
                            .where("idcodigohogar")
                            .equals(values.idcodigohogar)
                            .modify({ idestado: 4 });
                          if (values.idcodigohogar == idhogar) {
                            setHogar("");
                          }
                        })
                        .catch(() => console.log("Acción cancelada."));
                    },
                    color: "#E54622",
                  },
                  // {
                  //   label: "Finalizar caracterización",
                  //   action: () => {
                  //     modalActions.open("estadoEntrevista");
                  //   },
                  //   icon: PlaylistAddCheckIcon,
                  // },
                ]}
                useCheckBox={false}
              />
            ),
            label: "",
            name: "",
            gridValues: { xs: 12, lg: 12, md: 12, sm: 12, xl: 12 },
          },
        ]}
        endpointPath=""
        name=""
        title="Información general de la vivienda"
        hideButtons={true}
      />
    );
  }

  function getFormHogar() {
    return (
      <GenericForm
        name="formularioHogar"
        controls={[
          // {
          //   type: "component",
          //   component: () => (
          //     <Typography>
          //       <b>Código:</b> 210100002
          //     </Typography>
          //   ),
          //   label: "",
          //   name: "",
          //   gridValues: { xl: 6, lg: 6, md: 6, sm: 12, xs: 12 },
          // },
          // {
          //   type: "component",
          //   component: () => (
          //     <Typography>
          //       <b>Hogar:</b> 02
          //     </Typography>
          //   ),
          //   label: "",
          //   name: "",
          //   gridValues: { xl: 6, lg: 6, md: 6, sm: 12, xs: 12 },
          // },
          ...formularioHogar,
        ]}
        title={titleForm}
        description=""
        endpointPath="/"
        // descriptionOnCreate="Adicionar"
        // descriptionOnEdit="Modificar"
        showSpecificDescription={true}
        idForEdit={id}
        setIdFunction={setid}
        modalType="fullWith"
        submitFunction={async (values) => {
          if (id) {
            const hogar = await obtenerDatosPorLlave(
              "dat_hogar",
              "idcodigohogar",
              id
            );
            const idunidaddealojamiento = hogar[0].idunidaddealojamiento;
            modificar(
              "dat_unidaddealojamiento",
              "idunidaddealojamiento",
              idunidaddealojamiento,
              values
            ).then(() =>
              notificar({
                type: "success",
                title: "Datos del hogar",
                content: "Ha sido modificado correctamente",
              })
            );
          } else {
            // console.log(values);
            const idunidaddealojamiento = await crear(
              "dat_unidaddealojamiento",
              values
            );
            // console.log(idunidaddealojamiento);
            const dat_hogar = {
              idunidaddealojamiento: idunidaddealojamiento,
              // 1 - creado
              // 2 -
              // 3 -
              // 4 - eliminado
              idestado: 1,
            };
            crear("dat_hogar", dat_hogar).then(() =>
              notificar({
                type: "success",
                title: "Datos del hogar",
                content: "Ha sido adicionado correctamente",
              })
            );
          }
        }}
        getByIdFunction={async (id) => {
          const hogar = await obtenerDatosPorLlave(
            "dat_hogar",
            "idcodigohogar",
            id
          );
          const idunidaddealojamiento = hogar[0].idunidaddealojamiento;
          const unidaddealojamiento = await obtenerDatosPorLlave(
            "dat_unidaddealojamiento",
            "idunidaddealojamiento",
            idunidaddealojamiento
          );
          const obj = { ...hogar[0], ...unidaddealojamiento[0] };
          return [obj];
        }}
      />
    );
  }

  function getToolBar() {
    return (
      <Stack
        direction="row"
        mx={"auto"}
        my={2}
        px={3}
        display={"inline-list-item"}
        justifyContent="flex-end"
        sx={{ width: "100%" }}
      >
        <Button onClick={siguiente} variant="contained">
          Siguiente
        </Button>
      </Stack>
    );
  }

  return (
    <>
      <Meta title="Datos del hogar" />

      {getFormTabla()}

      {getFormHogar()}

      {getToolBar()}
    </>
  );
}

export default DatosHogar;
