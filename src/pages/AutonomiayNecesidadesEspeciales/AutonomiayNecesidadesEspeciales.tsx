import { Button, Stack, Typography } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import {
  crear,
  CreateOrModify,
  eliminar,
  modificar,
  obtenerDatosPorLlave,
} from "@/app/user-interfaces/forms/models/controllers";
import {
  obtenerDatos,
  obtenerGradoAutonomia,
  tieneDiscapacidad,
} from "./helpers";
import { useCallback, useEffect, useState } from "react";

import { FormularioEviel1 } from "@/app/user-interfaces/forms/forms.config";
import GenericForm from "@/_pwa-framework/genforms/components/form-components/form.generic";
import { IGenericControls } from "@/_pwa-framework/genforms/types/controls/controls.types";
import Meta from "@/_pwa-framework/components/Meta";
import NotificationProvider from "@/_pwa-framework/sections/Notifications/provider";
import TableView from "@/_pwa-framework/user-solicitudes/view";
import { datico } from "@/app/user-interfaces/forms/models/model";
import { getHogar } from "@/app/hogarController/hogar.controller";
import { obtenerMiembros } from "@/app/user-interfaces/forms/models/controllers.miembrohogar";
import { useConfirm } from "material-ui-confirm";
import { useLiveQuery } from "dexie-react-hooks";
import { useLocalStorage } from "@uidotdev/usehooks";
import useModalState from "@/_pwa-framework/hooks/form/use-form-manager";
import { useNavigate } from "react-router-dom";
import { moveMessagePortToContext } from "worker_threads";

function AutonomiayNecesidadesEspeciales() {
  const { modalActions } = useModalState();
  const notificar = NotificationProvider();
  const [id, setid] = useState<any>(null);
  const [idAditamento, setIdAditamento] = useState<any>(null);
  const [idhogar] = useLocalStorage("hogarActual", null);
  const [miembros, setMiembros] = useState<any>([]);
  const [datatable, setDataTable] = useState<any>([]);
  const [checkDiscapacidad, setCheckDiscapacidad] = useState<any>([]);
  const [aditamentos, setAditamentos] = useState<any>([]);
  const [aditamentosFiltrados, setAditamentosFiltrados] = useState<any>([]);
  const confirm = useConfirm();


  const AditamentosForm = useCallback(() => miembros.map((miembro: { idconcepto: any }) => (
    <GenericForm
      name={`aditamento-${miembro.idconcepto}`}
      controls={aditamentosControl}
      title="Adicionar aditamento"
      endpointPath="persona"
      showSpecificDescription={false}
      idForEdit={idAditamento}
      setIdFunction={setIdAditamento}
      modalType="fullWith"
      submitFunction={(values: any) => {
        delete values.editMode;
        if (idAditamento) {
          modificar(
            "dat_miembroaditamentos",
            "idmiembroaditamentos",
            idAditamento,
            values
          ).then(() => {
            notificar({
              type: "success",
              title:
                "El aditamento ha sido modificado satisfactoriamente",
              content: "",
            });
            LoadAditamentos(miembro.idconcepto);
          });
        } else {
          crear("dat_miembroaditamentos", {
            ...values,
            idcodigohogar: getHogar(),
            idmiembrohogar: miembro.idconcepto,
          }).then(() => {
            notificar({
              type: "success",
              title:
                "El aditamento ha sido adicionado satisfactoriamente",
              content: "",
            });
            LoadAditamentos(miembro.idconcepto);
          });
        }
      }}
      getByIdFunction={async (id) => {
        const arr = await obtenerDatosPorLlave(
          "dat_miembroaditamentos",
          "idmiembroaditamentos",
          id
        );

        return arr[0];
      }}
    />
  )), [aditamentosFiltrados])
  const aditamentosControl: IGenericControls[] = [{
    type: "select",
    label: "Aditamentos",
    name: "idaditamento",
    validations: {
      required: { message: "Debe seleccionar un aditamento" },
    },
    disabledOnEdit: true,
    gridValues: { xs: 12, sm: 6, lg: 6, md: 6, xl: 6 },
    options: aditamentosFiltrados,
  }, {
    type: "select",
    label: "Disponibilidad",
    name: "disponeadit",
    url: "9395",
    validations: {
      required: { message: "Debe seleccionar la disponibilidad" },
    },
    gridValues: { xs: 12, sm: 6, lg: 6, md: 6, xl: 6 },
  }]


  useEffect(() => {
    cargarNomencladores();
  }, []);

  useEffect(() => {
    if (id) LoadAditamentos(id);
  }, [id]);

  useEffect(() => {
    FiltrarAditamentos(datatable);
  }, [datatable]);

  const cargarNomencladores = async () => {
    const nom_aditamentos = await (datico as any)["nom_concepto"]
      .where("idpadre")
      .equals("9383")
      .toArray();
    setAditamentos(nom_aditamentos);
  };

  const FiltrarAditamentos = async (aditamentosDeclarados?: any[]) => {
    if (aditamentosDeclarados) {
      const declarados: any[] = aditamentosDeclarados.map((item: any) =>
        parseInt(item.idaditamento[0])
      );

      const filtrados = aditamentos.filter(
        (item: any) => !declarados.includes(item.idconcepto)
      );
      setAditamentosFiltrados(filtrados);
    } else {
      setAditamentosFiltrados(aditamentos);
    }
  };

  const LoadAditamentos = (idmiembro: any) =>
    obtenerDatos(idmiembro).then((datos: any) => setDataTable(datos));

  useLiveQuery(async () => {
    const data = await obtenerMiembros();
    setMiembros(data);
    const discapacidad = await tieneDiscapacidad(data);
    setCheckDiscapacidad(discapacidad);
  });

  const submitGradoAutonomia = async (values: any) => {
    try {
      if (values.editMode)
        delete values.editMode;

      // Crear nuevo registro
      const newRecord = {
        ...values,
        idmiembrohogar: values.idmiembro[0],
        idcodigohogar: getHogar(),
      };
      await CreateOrModify(
        "dat_miembrogradoautonomia",
        {
          idmiembrohogar: values.idmiembro[0],
          idcodigohogar: getHogar(),
        },
        newRecord,
        "idmiembrogradoautonomia"
      );

      // Actualizar el estado del formulario
      setDataTable([]);

      notificar({
        type: "success",
        title:
          "Se han adicionado los datos de autonomía y necesidades especiales al miembro satisfactoriamente",
        content: "",
      });

      // Cargar nuevamente los datos actualizados
      LoadAditamentos(values.idmiembro[0]);
    } catch (error) {
      console.error("Error al guardar:", error);
      notificar({
        type: "error",
        title: "Error al guardar",
        content:
          "Ha ocurrido un error al guardar los datos. Por favor, intente nuevamente.",
      });
    }
  };

  const navegar = useNavigate();
  const siguiente = () => navegar("/autonomia/enfermedades");
  const anterior = async () => {
    const data = await obtenerMiembros();
    const data_ocupacion = await datico.dat_miembroocupacion.toArray();
    const filterdata = data?.filter((ele: any) => {
      return data_ocupacion?.some((ocupacion: any) => {
        return (
          ele.idconcepto === parseInt(ocupacion.idmiembrohogar[0]) &&
          (ocupacion?.idtipoocupacion?.includes(9350) ||
            ocupacion?.idtipoocupacion?.includes(9344) ||
            ocupacion?.idtipoocupacion?.includes(9346))
        );
      });
    });
    console.log("filterdata", filterdata);
    if (!filterdata.length) navegar("/ocupacion/principal");
    else navegar("/ocupacion/no-vinculado");
  };

  return (
    <>
      <Meta title="Controles" />
      {idhogar ? (
        miembros.length ? (
          <GenericForm
            applyButton={false}
            name="test"
            controls={[
              {
                type: "select",
                name: "idmiembro",
                label: "Miembro del hogar",
                gridValues: { xs: 6, lg: 6, md: 6, sm: 6, xl: 6 },
                options: miembros,
                checkValues: checkDiscapacidad,
                onChange: (e, refs) => {
                  const { value } = e.target;
                  setid(value);
                },
                validations: {
                  required: { message: "Este campo es obligatorio" },
                },
              },
              {
                type: "select",
                name: "idautonomia",
                gridValues: { xs: 12, lg: 12, md: 12, sm: 12, xl: 12 },
                label: "Grado de autonomía",
                url: "9369",
                validations: {
                  required: { message: "Este campo es obligatorio" },
                },
                disabled: (values) => !values.idmiembro.length,
                onChange: (event, ref) => {
                  event.target.value == "9372"
                    ? ref.setFieldValue("idmiembrodiscapacidad", ["1"], false)
                    : ref.setFieldValue("idmiembrodiscapacidad", [], false);
                },
              },
              {
                type: "component",
                hidden: (values: any) =>
                  values.idmiembro == "" || values.idautonomia != "9371",
                component: () => (
                  <Typography>
                    <b>Nota aclaratoria:</b> En el caso de niños y niñas se
                    registran en "se vale solo" a menos que exista una
                    discapacidad que impida las actividades propias del ciclo de
                    vida
                  </Typography>
                ),
                label: "",
                name: "",
                gridValues: { xs: 12, lg: 12, md: 12, sm: 12, xl: 12 },
              },
              {
                type: "multiselect",
                name: "idtiposayuda",
                gridValues: { xs: 12, lg: 12, md: 12, sm: 12, xl: 12 },
                label: "Tipo de ayuda",
                multiple: "check",
                disabled: (values) => !values.idmiembro.length,
                url: "9373",
                // validations: {
                //   required: {
                //     message: "Este campo es obligatorio",
                //     when: {
                //       name: "idautonomia",
                //       expression: (value) => value?.[0] == "9371",
                //     },
                //   },
                // },
                hidden: (values: any) =>
                  values.idmiembro == "" || values.idautonomia != "9371",
              },
              {
                type: "component",
                hidden: (values: any) =>
                  values.idmiembro == "" || values.idautonomia != "9371",
                component: () => (
                  <Typography>
                    <b>
                      Nota aclaratoria:
                      <br />{" "}
                    </b>{" "}
                    <b>ABVD:</b> Se refiere a bañarse, vestirse, comer, usar el
                    servicio sanitario y moverse dentro del hogar
                    <br />
                    <b>AIVD:</b>
                    Se refiere a preparar y calentar los alimentos, manejar
                    dinero, visitar al médico, tomar sus medicamentos, llamar
                    por teléfono, hacer compras, y otros quehaceres. Una misma
                    persona puede necesitar ambos tipos de ayuda.
                  </Typography>
                ),
                label: "",
                name: "",
                gridValues: { xs: 12, lg: 12, md: 12, sm: 12, xl: 12 },
              },
              {
                type: "select",
                label: "¿Presenta alguna discapacidad?",
                name: "idmiembrodiscapacidad",
                gridValues: { xs: 12 },
                options: [
                  { idconcepto: "1", denominacion: "Sí" },
                  { idconcepto: "2", denominacion: "No" },
                ],
                validations: {
                  required: { message: "Este campo es obligatorio" },
                },

                disabled: (values) =>
                  !values.idmiembro.length || values.idautonomia == "9372",
              },
              {
                type: "multiselect",
                label: "Discapacidad",
                name: "iddiscapacidad",
                url: "9376",
                multiple: "check",
                gridValues: { xs: 12 },
                validations: {
                  min: {
                    value: 1,
                    message: "Este campo es obligatorio",
                    when: {
                      name: "idmiembrodiscapacidad",
                      expression: (value) => {
                        return value[0] === "1";
                      },
                    },
                  },
                },
                disabled: (values) => !values.idmiembro.length,
                hidden: (values: any) =>
                  values.idmiembro == "" || values.idmiembrodiscapacidad != "1",
              },
              {
                type: "component",

                component: () => (
                  <>
                    <Typography variant="h6" marginX={"auto"} mt={5}>
                      Aditamentos de ayuda a la discapacidad
                    </Typography>
                    <Stack
                      spacing={2}
                      direction="row-reverse"
                      mx={"auto"}
                      my={2}
                      display={"inline-list-item"}
                    >
                      <Button
                        onClick={() => modalActions.open(`aditamento-${id}`)}
                        variant="contained"
                        sx={{ marginBottom: "10px !important" }}
                      >
                        Adicionar
                      </Button>
                    </Stack>

                    <TableView
                      values={datatable}
                      headers={[
                        { name: "aditamento", label: "Aditamento" },
                        { name: "idmiembrohogar" },
                        { name: "disponibilidad", label: "Disponibilidad" },
                      ]}
                      idKey="idmiembrogradoautonomia"
                      multiSelect={false}
                      useCheckBox={false}
                      rowActions={[
                        {
                          label: "Modificar",
                          action: (values: any) => {
                            FiltrarAditamentos();
                            setIdAditamento(values.idmiembroaditamentos);
                            modalActions.open(`aditamento-${id}`);
                          },
                          icon: Edit,
                        },
                        {
                          label: "Eliminar",
                          action: (values: any) => {
                            confirm({
                              title: "Eliminar",
                              confirmationText: "Aceptar",
                              cancellationText: "Cancelar",
                              description: `¿Está seguro que desea eliminar el aditamento seleccionado?`,
                            }).then(() =>
                              eliminar(
                                "dat_miembroaditamentos",
                                "idmiembroaditamentos",
                                values.idmiembroaditamentos
                              ).then(() => {
                                notificar({
                                  type: "success",
                                  title:
                                    "El aditamento ha sido eliminado satisfactoriamente",
                                  content: "",
                                });
                                LoadAditamentos(values.idmiembrohogar);
                              })
                            );
                          },
                          icon: Delete,
                        },
                      ]}
                    />
                  </>
                ),
                hidden: (values: any) =>
                  values.idmiembro == "" || values.idmiembrodiscapacidad != "1",
                gridValues: { lg: 12, md: 12, sm: 12, xl: 12, xs: 12 },

                name: "aditamentos",
                label: "adt",
              },
            ]}
            title="Grado de autonomía y situación de discapacidad"
            description=""
            endpointPath="persona"
            showSpecificDescription={false}
            nextDisabledFunction={() => {
              const miembrosCheck = checkDiscapacidad.includes(",")
                ? checkDiscapacidad?.split?.(",")?.length
                : checkDiscapacidad.length > 0
                  ? 1
                  : 0;
              return miembros?.length !== miembrosCheck;
            }}
            nextButton={{ text: "Siguiente", action: siguiente }}
            prevButton={{ text: "Anterior", action: anterior }}
            saveButton="Guardar"
            acceptDisabledFunction={(values) => values.idmiembro == ""}
            idForEdit={id}
            notifyValidation={(values) => {
              if (
                values.idmiembrodiscapacidad[0] === "1" &&
                datatable.length === 0
              )
                return "Debe agregarse al menos un aditamento";
            }}
            setIdFunction={setid}
            submitFunction={submitGradoAutonomia}
            getByIdFunction={(id) => obtenerGradoAutonomia(id)}
          />
        ) : (
          <Typography variant="h6" p={2}>
            <b>No existen miembros en el hogar seleccionado </b>
          </Typography>
        )
      ) : (
        <Typography variant="h6" p={2}>
          <b>No existe un hogar seleccionado </b>
        </Typography>
      )}

      {id && <AditamentosForm/>
      }
    </>
  );
}
export default AutonomiayNecesidadesEspeciales;
