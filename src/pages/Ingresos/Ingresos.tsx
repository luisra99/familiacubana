import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { Button, Stack, Typography } from "@mui/material";

import GenericForm from "@/_pwa-framework/genforms/components/form-components/form.generic";
import Meta from "@/_pwa-framework/components/Meta";
import TableView from "@/_pwa-framework/user-solicitudes/view";
import useModalState from "@/_pwa-framework/hooks/form/use-form-manager";
import { IGenericControls } from "@/_pwa-framework/genforms/types/controls/controls.types";
import NotificationProvider from "@/_pwa-framework/sections/Notifications/provider";

import { useNavigate } from "react-router-dom";
import { useState } from "react";

import {
  crear,
  eliminar,
  modificar,
  obtenerDatosPorLlave,
} from "@/app/user-interfaces/forms/models/controllers";

import { obtenerMiembros } from "@/app/user-interfaces/forms/models/controllers.miembrohogar";

import { getHogar } from "@/app/hogarController/hogar.controller";

import { datico as db } from "@/app/user-interfaces/forms/models/model";
import { useLiveQuery } from "dexie-react-hooks";

function Ingresos() {
  const idhogar = getHogar() ?? 0;
  // hooks
  const [id, setid] = useState<any>(null);
  const [habilitarAdd, setHabilitarAdd] = useState<any>(true);
  const [idmiembrohogar, setIdMiembroHogar] = useState<any>(0);
  const [ingresosMiembro, setIngresosMiembro] = useState<any>([]);
  const [miembros, setMiembros] = useState<any>([]);
  const [titleForm, setTitleForm] = useState<any>("");
  // utils
  const notificar = NotificationProvider();
  const navegar = useNavigate();
  const siguiente = () => navegar("/ocupacion/principal");
  const anterior = () => navegar("/nucleo-info");
  const { modalActions } = useModalState();
  // init
  useLiveQuery(async () => {
    const data = await obtenerMiembros();
    setMiembros(data);
  });

  async function unionNomenclador(arr: any) {
    const join = await Promise.all(
      arr.map(async (obj: any) => {
        // console.log(obj);
        const moneda = await db.nom_concepto.get(
          parseInt(obj?.idmoneda[0] ?? 0)
        );
        const fuente = await db.nom_concepto.get(
          parseInt(obj?.idfuente[0] ?? 0)
        );
        return {
          ...obj,
          moneda: moneda?.denominacion,
          fuente: fuente?.denominacion,
        };
      })
    );
    return join;
  }

  async function obtenerDatos(idmiembro: any) {
    // console.log(idmiembro);
    const data = await db.dat_miembrofuentesingresos
      .where({ idmiembrohogar: idmiembro })
      .toArray();
    const result = await unionNomenclador(data);
    return result;
  }

  async function onChangeMiembro(id: any) {
    // console.log(id);
    const datos = await obtenerDatos(id);
    // console.log(datos);
    setIngresosMiembro(datos);
  }

  const formModal: IGenericControls[] = [
    {
      type: "select",
      label: "Fuente de procedencia",
      name: "idfuente",
      gridValues: { xl: 4, lg: 4, md: 6, xs: 12, sm: 12 },
      url: "9318",
      // validations: {}
    },
    {
      type: "text",
      label: "Cuál",
      name: "esotrafuente",
      multiline: { minRows: 1 },
      gridValues: { xl: 4, lg: 4, md: 6, xs: 12, sm: 12 },
      disabled: (values) => values.idfuente != "9326",
    },
    {
      type: "select",
      label: "Moneda",
      name: "idmoneda",
      gridValues: { xl: 4, lg: 4, md: 6, xs: 12, sm: 12 },
      url: "9309",
      // validations: {}
    },
    {
      type: "number",
      label: "Monto",
      name: "montomensual",
      decimalScale: 2,
      format: "finance",
      gridValues: { xl: 4, lg: 4, md: 6, xs: 12, sm: 12 },
      // validations: {}
    },
  ];

  function getFormPage() {
    if (idhogar) {
      if (miembros.length) {
        return (
          <GenericForm
            name="formularioTabla"
            controls={[
              {
                type: "select",
                label: "Miembro del hogar",
                name: "idmiembro",
                gridValues: { xl: 12, lg: 12, md: 12, sm: 12, xs: 12 },
                options: miembros,
                onChange: (e) => {
                  const { value } = e.target;
                  setHabilitarAdd(false);
                  setIdMiembroHogar(value);
                  onChangeMiembro(value);
                },
              },
              {
                type: "component",
                component: () => (
                  <Typography>
                    <b>Nota aclaratoria:</b> Se pregunta a la persona
                    entrevistada cuánto dinero gana y/o recibe cada miembro del
                    hogar mensualmente de forma habitual y tomando de referencia
                    los últimos 12 meses
                  </Typography>
                ),
                label: "",
                name: "",
                gridValues: { xs: 12, lg: 12, md: 12, sm: 12, xl: 12 },
              },
              {
                type: "component",
                component: () => (
                  <Typography variant="h6" marginX={"auto"} mt={1}>
                    Ingresos de los miembros del hogar por fuentes
                  </Typography>
                ),
                label: "",
                name: "",
                gridValues: { xs: 12, lg: 12, md: 12, sm: 12, xl: 12 },
              },
              {
                type: "component",
                component: () => (
                  <Stack
                    spacing={2}
                    direction="row"
                    mx={"auto"}
                    my={2}
                    display={"inline-list-item"}
                  >
                    <Button
                      onClick={() => {
                        setTitleForm("Adicionar ingreso");
                        modalActions.open("formularioModal");
                      }}
                      variant="contained"
                      disabled={habilitarAdd}
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
                    values={ingresosMiembro}
                    headers={[
                      { name: "fuente", label: "Fuente de procedencia" },
                      { name: "moneda", label: "Moneda" },
                      { name: "montomensual", label: "Monto" },
                      { name: "esotrafuente", label: "Cuál" },
                    ]}
                    idKey="idmiembrofuentesingresos"
                    title=""
                    multiSelect={true}
                    rowActions={[
                      {
                        label: "Modificar",
                        action: (values: any) => {
                          setid(values.idmiembrofuentesingresos);
                          setTitleForm("Modificar ingreso");
                          modalActions.open("formularioModal");
                        },
                        icon: EditIcon,
                      },
                      {
                        label: "Eliminar",
                        action: (values: any) => {
                          eliminar(
                            "dat_miembrofuentesingresos",
                            "idmiembrofuentesingresos",
                            values.idmiembrofuentesingresos
                          ).then(() => {
                            notificar({
                              type: "success",
                              title: "Eliminar",
                              content:
                                "El ingreso ha sido eliminado correctamente",
                            });
                            onChangeMiembro(idmiembrohogar);
                          });
                        },
                        icon: DeleteIcon,
                      },
                    ]}
                    disabled={false}
                    useCheckBox={false}
                  />
                ),
                label: "",
                name: "",
                gridValues: { xs: 12, lg: 12, md: 12, sm: 12, xl: 12 },
              },
            ]}
            title="Ingresos"
            endpointPath=""
            hideButtons={true}
          />
        );
      }
    } else {
      return (
        <Typography mx={2} my={2}>
          <b>No hay un hogar seleccionado...</b>
        </Typography>
      );
    }
  }

  function getFormModal() {
    if (idmiembrohogar) {
      return (
        <GenericForm
          name="formularioModal"
          controls={formModal}
          title={titleForm}
          description=" "
          endpointPath=""
          showSpecificDescription={true}
          // descriptionOnEdit="Modificar"
          // descriptionOnCreate="Adicionar"
          idForEdit={id}
          setIdFunction={setid}
          modalType="fullWith"
          submitFunction={(values) => {
            if (id) {
              modificar(
                "dat_miembrofuentesingresos",
                "idmiembrofuentesingresos",
                id,
                values
              ).then(() => {
                notificar({
                  type: "success",
                  title: "Modificar",
                  content: "El ingreso ha sido modificado correctamente",
                });
                onChangeMiembro(idmiembrohogar);
              });
            } else {
              crear("dat_miembrofuentesingresos", {
                ...values,
                idmiembrohogar: idmiembrohogar,
                idcodigohogar: idhogar,
              }).then((id) => {
                // console.log(id);
                notificar({
                  type: "success",
                  title: "Adicionar",
                  content: "El ingreso ha sido adicionado correctamente",
                });
                onChangeMiembro(idmiembrohogar);
              });
            }
          }}
          getByIdFunction={(id) =>
            obtenerDatosPorLlave(
              "dat_miembrofuentesingresos",
              "idmiembrofuentesingresos",
              id
            )
          }
          // dataAction={[{
          //   action: (values) => {
          //     console.log(values);
          //   },
          //   label: "Aplicar" }
          // ]}
        />
      );
    } else {
      return (
        <Typography mx={2} my={2}>
          <b>No hay miembros seleccionados...</b>
        </Typography>
      );
    }
  }

  function getToolBar() {
    if (idhogar) {
      return (
        <Stack
          direction="row"
          mx={"auto"}
          my={2}
          px={5}
          display={"inline-list-item"}
          justifyContent="flex-end"
          sx={{ width: "100%" }}
        >
          <Button
            onClick={anterior}
            variant="contained"
            sx={{ marginRight: "5px" }}
          >
            Anterior
          </Button>
          <Button onClick={siguiente} variant="contained">
            Siguiente
          </Button>
        </Stack>
      );
    }
  }

  return (
    <>
      <Meta title="Ingresos" />

      {getFormPage()}

      {getFormModal()}

      {getToolBar()}
    </>
  );
}

export default Ingresos;
