import { Button, Stack, Tooltip, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import {
  asentamiento,
  cdr,
  circunscripcion,
  direccion,
  planturquino,
  tipovivienda,
  unionUnidadAlojamiento,
  zonaresidencial,
} from "./utils";
import {
  atomHogarActualDireccion,
  atomHogarActualJefe,
} from "@/_pwa-framework/sections/Sidebar/Sidebar";
import {
  crear,
  descartarHogares,
  eliminar,
  modificar,
  obtenerDatosPorLlave,
} from "@/app/user-interfaces/forms/models/controllers";
import {
  setDireccionHogar,
  setHogar,
  setJefeHogar,
  unsetHogar,
} from "@/app/hogarController/hogar.controller";
import { useCallback, useEffect, useState } from "react";

import AddHomeIcon from "@mui/icons-material/AddHome";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import GenericForm from "@/_pwa-framework/genforms/components/form-components/form.generic";
import { IGenericControls } from "@/_pwa-framework/genforms/types/controls/controls.types";
import Meta from "@/_pwa-framework/components/Meta";
import NotificationProvider from "@/_pwa-framework/sections/Notifications/provider";
import { PlaylistAddCheckCircleRounded } from "@mui/icons-material";
import TableView from "@/_pwa-framework/user-solicitudes/view";
import { datico as db } from "@/app/user-interfaces/forms/models/model";
import { useConfirm } from "material-ui-confirm";
import { useLocalStorage } from "@uidotdev/usehooks";
import useModalState from "@/_pwa-framework/hooks/form/use-form-manager";
import { useRecoilState } from "recoil";

function DatosHogar() {
  const [idhogar] = useLocalStorage<any>("hogarActual");
  const confirm = useConfirm();
  const navegar = useNavigate();
  const notificar = NotificationProvider();
  const { modalActions } = useModalState();

  const [checkdatos, checkSetdatos] = useState<any>([]);
  const [id, setid] = useState<any>(null);
  const [hogares, setHogares] = useState<any>([]);
  const [idzonavulnerable, setIdZonaVulnerable] = useState<any>(true);
  const [titleForm, setTitleForm] = useState<any>("");
  const [selected, setSelected] = useState<any[]>([]);
  const [conceptos, setConceptos] = useState<any[]>([]);

  const [hogarActual, setHogarActualDireccion] = useRecoilState(
    atomHogarActualDireccion
  );

  const [, setHogarActualJefe] = useRecoilState(atomHogarActualJefe);
  const mainForm = useCallback(
    (): IGenericControls[] => [
      {
        type: "component",
        component: () => (
          <Stack
            direction="row"
            display={"inline-list-item"}
            justifyContent="flex-start"
            sx={{ width: "100%" }}
          >
            {conceptos.length ? (
              <Button
                onClick={() => {
                  setTitleForm("Adicionar datos del hogar");
                  modalActions.open("formularioHogar");
                }}
                variant="contained"
                disabled={!conceptos.length}
              >
                Adicionar
              </Button>
            ) : (
              <Typography>
                No se ha realizado la carga inicial de los nomencladores.{" "}
                <Link to={"/nomencladores"}>Ir a nomencladores.</Link>
              </Typography>
            )}
          </Stack>
        ),
        label: "",
        name: "",
        gridValues: { xs: 12, lg: 12, md: 12, sm: 12, xl: 12 },
      },
      {
        type: "component",
        component: ({ name, setFieldValue }: any) => (
          <TableView
            values={hogares}
            search={true}
            headers={[
              { name: "detalles", align: "left", label: "Detalles" },
              { name: "direccion", align: "center" },
              {
                name: "jefehogar",
                align: "center",
              },
              {
                name: "idEstado",
                align: "center",
              },
              {
                name: "idcodigohogar",
                align: "center",
              },
              {
                name: "cantmiembros",
                align: "center",
                label: "Miembros",
              },
              { name: "estado", align: "center" },
              { name: "estadotext", align: "center", label: "Estado" },
            ]}
            idKey="idcodigohogar"
            setFieldValue={setFieldValue}
            useCheckBox={true}
            multiSelect={false}
            setState={setSelectedFunction}
            name={name}
            defaultValues={idhogar ? [parseInt(idhogar)] : []}
            rowActions={[
              {
                label: "Modificar hogar",
                action: (values: any) => {
                  setid(values.idcodigohogar);
                  setTitleForm("Modificar datos del hogar");
                  modalActions.open("formularioHogar");
                },
                icon: EditIcon,
              },
              {
                label: "Adicionar otro hogar",
                action: (values: any) => {
                  const dat_hogar = {
                    idunidaddealojamiento: values.idunidaddealojamiento,
                    idestado: 1,
                  };
                  crear("dat_hogar", dat_hogar).then(() => {
                    notificar({
                      type: "success",
                      title:
                        "Ha sido adicionado correctamente un nuevo hogar en la vivienda ",
                      content: "",
                    });
                    loadHogares();
                  });
                },
                icon: AddHomeIcon,
              },
              {
                icon: DeleteIcon,
                label: "Eliminar hogar",
                action: (values: any) => {
                  confirm({
                    title: "Eliminar",
                    confirmationText: "Aceptar",
                    cancellationText: "Cancelar",
                    description: `¿Está seguro que desea eliminar el hogar?`,
                  })
                    .then(async () => {
                      const respuesta = await checkMultipleHogares(
                        values.idcodigohogar
                      );
                      if (respuesta) {
                        notificar({
                          type: "warning",
                          title: respuesta,
                          content: "",
                        });
                      } else {
                        unsetHogar();
                        descartarHogares(values.idcodigohogar);
                        db.dat_hogar
                          .where("idcodigohogar")
                          .equals(values.idcodigohogar)
                          .modify({ idestado: 4 });
                        if (values.idcodigohogar == idhogar) {
                          setHogar("");
                          setJefeHogar("");
                          setHogarActualJefe("");
                          setDireccionHogar("");
                        }

                        loadHogares();
                        eliminar(
                          "dat_unidaddealojamiento",
                          "idunidaddealojamiento",
                          idhogar
                        );
                        notificar({
                          type: "success",
                          title:
                            "El hogar ha sido eliminado satisfactoriamente",
                          content: "",
                        });
                      }
                    })
                    .catch(() => {
                      notificar({
                        type: "warning",
                        title: "Acción cancelada",
                        content: "",
                      });
                    });
                },
                disabled: (data) => {
                  return data.idEstado == "3";
                },
                //color: "#E54622",
              },
              {
                icon: PlaylistAddCheckCircleRounded,
                label: "Finalizar caracterización",
                action: (values: any) => modalActions.open("estadoEntrevista"),
              },
            ]}
          />
        ),
        label: "",
        name: "",
        gridValues: { xs: 12, lg: 12, md: 12, sm: 12, xl: 12 },
        hidden: () => !conceptos.length,
      },
    ],
    [conceptos, hogares, idhogar]
  );
  const siguiente = () => navegar("/nucleo-info");

  const loadHogares = async () => {
    const hogares = await db.dat_hogar
      .where("idestado")
      .notEqual(4)
      .sortBy("idcodigohogar");
    const conceptos = await db.nom_concepto.toArray();
    const data = await unionUnidadAlojamiento(hogares);
    setConceptos(conceptos);
    setHogares([...data]);
  };

  function UpdateDatos(selected: any) {
    const hogarselected = selected.length
      ? hogares.find((hogar: any) => {
          return hogar.idcodigohogar == selected[0];
        })
      : false;
    if (hogarselected) {
      setHogar(hogarselected?.idcodigohogar);
      setJefeHogar(hogarselected?.jefehogar);
      setDireccionHogar(hogarselected?.direccion);
      setHogarActualJefe(hogarselected?.jefehogar);
      setHogarActualDireccion(hogarselected?.direccion);
    } else {
      setHogar("");
      setJefeHogar("");
      setDireccionHogar("");
      setHogarActualJefe("");
      setHogarActualDireccion("");
    }
    setSelected(selected);
  }
  useEffect(() => {
    loadHogares().then(() => setSelected(idhogar ? [parseInt(idhogar)] : []));
  }, []);

  useEffect(() => {
    UpdateDatos(selected);
  }, [hogares]);

  const setSelectedFunction = (selected: any) => {
    setSelected(selected);
    UpdateDatos(selected);
  };

  const formularioHogar = useCallback(
    (): IGenericControls[] => [
      direccion,
      circunscripcion,
      cdr,
      zonaresidencial,
      tipovivienda,
      asentamiento,
      planturquino,
      {
        type: "select",
        label: "Comunidad en situación de vulnerabilidad",
        name: "zonavulnerable",
        checkValues: checkdatos,
        gridValues: { xl: 4, lg: 4, md: 4, sm: 12, xs: 12 },
        options: [
          { idconcepto: "1", denominacion: "Sí" },
          { idconcepto: "2", denominacion: "No" },
        ],
        validations: {
          required: { message: "Este campo es obligatorio" },
        },
        onChange: (e) => {
          const { value } = e.target;
          setIdZonaVulnerable(value == "2");
        },
      },
      {
        type: "select",
        name: "idzonavulnerable",
        label: "Comunidad",
        url: "9999999",
        gridValues: { xl: 4, lg: 4, md: 4, sm: 12, xs: 12 },
        hidden: (values: any) => values.zonavulnerable != "1",
        validations: {required:{message: "Este campo es obligatorio", when:{name: "zonavulnerable", expression: (value) => value[0] == "1",}}}
      },
    ],
    [idzonavulnerable, checkdatos]
  );
  const checkMultipleHogares = useCallback(
    async (idParam?: any) => {
      const hogar = id
        ? await obtenerDatosPorLlave("dat_hogar", "idcodigohogar", id)
        : [];
      if (hogar?.length > 0) {
        const hogares = await obtenerDatosPorLlave(
          "dat_hogar",
          "idunidaddealojamiento",
          hogar[0].idunidaddealojamiento
        );
        if (hogares?.length > 1) {
          const respuesta = await confirm({
            title: "Alerta",
            confirmationText: "Si",
            cancellationText: "No",
            description: `El hogar tiene varios hogares, esta seguro que desea continuar?`,
          }).catch(() => "Operación cancelada");
          return respuesta;
        }
      }
    },
    [id]
  );
  return (
    <>
      <Meta title="Datos del hogar" />
      <GenericForm
        controls={mainForm()}
        endpointPath=""
        name=""
        title="Información general de la vivienda"
        hideButtons={true}
      />
      <GenericForm
        name="formularioHogar"
        controls={formularioHogar()}
        title={titleForm}
        description=""
        endpointPath="/"
        showSpecificDescription={true}
        idForEdit={id}
        setIdFunction={setid}
        modalType="fullWith"
        notifyValidation={checkMultipleHogares}
        submitFunction={async (values, name, idForEdit, event) => {
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
            ).then((tx) => {
              loadHogares();
              notificar({
                type: "success",
                title:
                  "Los datos del hogar han sido modificados satisfactoriamente",
                content: "",
              });
            });
          } else {
            const idunidaddealojamiento = await crear(
              "dat_unidaddealojamiento",
              values
            );
            const dat_hogar = {
              idunidaddealojamiento: idunidaddealojamiento,
              idestado: 1,
            };
            const idcodigohogar = await crear("dat_hogar", dat_hogar);
            notificar({
              type: "success",
              title: "El hogar ha sido adicionado satisfactoriamente",
              content: "",
            });
            if (event.target.textContent == "Aceptar") {
              setHogar(idcodigohogar);
              setDireccionHogar(values.direccion);
              navegar("/nucleo-info");
            }
          }
          loadHogares();
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
          const obj = {
            ...hogar[0],
            ...unidaddealojamiento[0],
            editMode: true,
          };
          return obj;
        }}
      />
      <Stack
        direction="row"
        mx={"auto"}
        my={2}
        px={3}
        display={"inline-list-item"}
        justifyContent="flex-end"
        sx={{ width: "100%" }}
      >
        <Tooltip open={!selected?.length} title="" placement="bottom">
          <Button
            onClick={siguiente}
            variant="contained"
            disabled={!selected?.length}
          >
            Siguiente
          </Button>
        </Tooltip>
      </Stack>
    </>
  );
}

export default DatosHogar;
