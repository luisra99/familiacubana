import { FormularioEviel1 } from "@/app/user-interfaces/forms/forms.config";
import DeleteIcon from "@mui/icons-material/Delete";
import GenericForm from "@/_pwa-framework/genforms/components/form-components/form.generic";
import Meta from "@/_pwa-framework/components/Meta";
import TableView from "@/_pwa-framework/user-solicitudes/view";
import useModalState from "@/_pwa-framework/hooks/form/use-form-manager";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import { datico } from "@/app/user-interfaces/forms/models/model";
import {
  crear,
  eliminar,
  modificar,
  obtenerDatosPorLlave,
} from "@/app/user-interfaces/forms/models/controllers";
import { Button, Stack, Typography } from "@mui/material";
import { getHogar } from "@/app/hogarController/hogar.controller";
import {
  obtenerMiembros,
  obtenerMiembrosSelect,
} from "@/app/user-interfaces/forms/models/controllers.miembrohogar";
import NotificationProvider from "@/_pwa-framework/sections/Notifications/provider";
import { TiposdeAyuda } from "@/app/user-interfaces/controls/controls.config.ponzoa";
import {
  Discapacidad,
  PresentaDiscapacidad,
} from "@/app/user-interfaces/controls/controls.config.eviel";

function AutonomiayNecesidadesEspeciales() {
  const idhogar = getHogar() ?? 0;
  const { modalActions } = useModalState();
  const notificar = NotificationProvider();
  const [id, setid] = useState<any>(null);
  const [miembros, setMiembros] = useState<any>([]);
  const [datatable, setDataTable] = useState<any>([]);
  const [idmiembrohogar, setIdMiembroHogar] = useState<any>(0);

  const navegar = useNavigate();

  useLiveQuery(async () => {
    const data = await obtenerMiembros();
    console.log("miembros", data), setMiembros(data);
  });
  async function onChangeMiembro(id: any) {
    const datos = await obtenerDatos(id);
    console.log("kakita", datos);
    setDataTable(datos);
  }
  async function obtenerDatos(idmiembro: any) {
    // console.log(idmiembro);
    const data = await datico.dat_miembroaditamentos
      .where({ idmiembrohogar: idmiembro })
      .toArray();
    console.log("data", data, idmiembro);
    const result = await unionNomenclador(data);
    return result;
  }
  async function unionNomenclador(arr: any) {
    const join = await Promise.all(
      arr.map(async (obj: any) => {
        // console.log(obj);
        const aditamento = await datico.nom_concepto.get(
          parseInt(obj?.idaditamento[0] ?? 0)
        );
        const disponibilidad = await datico.nom_concepto.get(
          parseInt(obj?.disponeadit[0] ?? 0)
        );
        console.log("diarrea", {
          ...obj,
          aditamento: aditamento?.denominacion,
          disponibilidad: disponibilidad?.denominacion,
        });
        return {
          ...obj,
          aditamento: aditamento?.denominacion,
          disponibilidad: disponibilidad?.denominacion,
        };
      })
    );
    return join;
  }

  function getPage() {
    if (idhogar) {
      if (miembros.length) {
        return (
          <GenericForm
            name="test"
            controls={[
              {
                type: "select",
                name: "idmiembro",
                label: "Miembro del hogar",
                gridValues: { xs: 6, lg: 6, md: 6, sm: 6, xl: 6 },
                options: miembros,

                onChange: (e, refs) => {
                  const { value } = e.target;
                  setIdMiembroHogar(value);
                  onChangeMiembro(value);
                  refs.setFieldValue("idautonomia", [], true),
                    refs.setFieldValue("idcuidadoprimerainf", [], true);
                  refs.setFieldValue("idmiembrodiscapacidad", [], true),
                    refs.setFieldValue("iddiscapacidad", [], true);
                },
              },
              {
                type: "select",
                name: "idautonomia",
                gridValues: { xs: 12, lg: 12, md: 12, sm: 12, xl: 12 },
                label: "Grado de autonomía",
                url: "9369",
                disabled: (values) => values.idmiembro == "",
                onChange: (e, refs) => {
                  refs.setFieldValue("idautonomia", [], true),
                    refs.setFieldValue("idcuidadoprimerainf", [], true),
                    refs.setFieldValue("idmiembrodiscapacidad", [], true),
                    refs.setFieldValue("iddiscapacidad", [], true);
                },
              },
              {
                type: "component",
                disabled: (values) =>
                  values.idmiembro == "" || values.idautonomia != "9371",
                component: () => (
                  <Typography>
                    <b>Nota aclaratoria:</b> En el caso de niños y niñas se
                    registran en "se vale solo" a menos que exista una
                    discapacidad que impida las actividades propias del cilo de
                    vida
                  </Typography>
                ),
                label: "",
                name: "",
                gridValues: { xs: 12, lg: 12, md: 12, sm: 12, xl: 12 },
              },
              {
                type: "select",
                name: "idtiposayuda",
                gridValues: { xs: 12, lg: 12, md: 12, sm: 12, xl: 12 },
                label: "Tipo de ayuda",
                multiple: "check",
                url: "9373",
                disabled: (values) =>
                  values.idmiembro == "" || values.idautonomia != "9371",
              },
              {
                type: "component",
                disabled: (values) =>
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
                disabled: (values) => values.idmiembro == "",
                onChange: (value, refs) =>
                  refs.setFieldValue("iddiscapacidad", [], true),
              },
              {
                type: "select",
                label: "Discapacidad",
                name: "iddiscapacidad",
                url: "9376",
                multiple: "check",
                gridValues: { xs: 12 },

                disabled: (values) =>
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
                      direction="row"
                      mx={"auto"}
                      my={2}
                      px={5}
                      display={"inline-list-item"}
                    >
                      <Button
                        onClick={() => modalActions.open("teste")}
                        variant="contained"
                        sx={{ marginBottom: "10px !important" }}
                      >
                        Adicionar
                      </Button>
                    </Stack>

                    <TableView
                      values={datatable} /*diarrea*/
                      headers={[
                        { name: "aditamento", label: "Aditamento" },
                        { name: "disponibilidad", label: "Disponibilidad" },
                      ]}
                      idKey="idmiembrogradoautonomia"
                      title=""
                      multiSelect={false}
                      useCheckBox={false}
                      rowActions={[
                        {
                          label: "Eliminar",
                          action: (values: any) => {
                            console.log("action", values);
                            eliminar(
                              //dat_miembroaditamentos
                              "dat_miembroaditamentos",
                              "idmiembroaditamentos",
                              values.idmiembroaditamentos
                            ).then(() => {
                              notificar({
                                type: "success",
                                title: "Eliminar",
                                content: "Eliminado correctamente",
                              });
                              onChangeMiembro(idmiembrohogar);
                            });
                          },
                          icon: DeleteIcon,
                        },
                      ]}
                    />
                  </>
                ),
                disabled: (values) =>
                  values.idmiembro == "" ||  values.idmiembrodiscapacidad != "1",
                gridValues: { lg: 12, md: 12, sm: 12, xl: 12, xs: 12 },
                name: "aditamentos",

                label: "adt",
              },
            ]}
            title=" Grado de autonomía y situación de discapacidad"
            description=""
            endpointPath="persona"
            showSpecificDescription={false}
            nextButton={{ text: "Siguiente", action: siguiente }}
            prevButton={{ text: "Anterior", action: anterior }}
            saveButton="Guardar"
            idForEdit={id}
            setIdFunction={setid}
            submitFunction={(values) => {
              if (id)
                modificar(
                  "dat_miembrogradoautonomia",
                  "idmiembrogradoautonomia",
                  id,
                  { ...values, idcodigohogar: getHogar() }
                );
              else {
                const idautonomia = crear("dat_miembrogradoautonomia", {
                  ...values,
                  idmiembrohogar: values.idmiembro,
                  idcodigohogar: getHogar(),
                  // idtiposayuda: ()=>{if(values.idtiposayuda.filter((element:any)=> element ===""))return 3}
                }).then((idautonomia) => {
                  crear("dat_tiposayuda", {
                    idmiembrogradoautonomia: idautonomia,
                    idayuda: values.idtipoayuda,
                  });
                  notificar({
                    type: "success",
                    title: "Adicionar",
                    content: "Se ha adicionado correctamente",
                  });
                  onChangeMiembro(idmiembrohogar);
                });
              }
            }}
            getByIdFunction={(id) =>
              obtenerDatosPorLlave(
                "dat_miembrogradoautonomia",
                "idmiembrogradoautonomia",
                id
              )
            }
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
          name="teste"
          controls={FormularioEviel1}
          title="Adicionar aditamiento"
          description=" "
          endpointPath="persona"
          showSpecificDescription={false}
          idForEdit={id}
          setIdFunction={setid}
          modalType="fullWith"
          submitFunction={(values) => {
            if (id)
              modificar("dat_miembroaditamentos", "idmiembroaditamentos", id, {
                ...values,
                idcodigohogar: getHogar(),
                idmiembrohogar: idmiembrohogar,
              });
            else
              crear("dat_miembroaditamentos", {
                ...values,
                idcodigohogar: getHogar(),
                idmiembrohogar: idmiembrohogar,
              }).then((id) => {
                console.log(id);
                notificar({
                  type: "success",
                  title: "Adicionar",
                  content: "El ingreso ha sido adicionado correctamente",
                });
                onChangeMiembro(idmiembrohogar);
              });
          }}
          getByIdFunction={(id) =>
            obtenerDatosPorLlave(
              "dat_miembrogradoautonomia",
              "idmiembrogradoautonomia",
              id
            )
          }
          dataAction={[{ action: () => {}, label: "Aplicar" }]}
        />
      );
    }
  }

  const siguiente = () => navegar("/autonomia/enfermedades");
  const anterior = () => navegar("/ocupacion/no-vinculado");
  const aceptar = () => navegar("/");

  return (
    <>
      <Meta title="Controles" />
      {getPage()}
      {getFormModal()}
    </>
  );
}

export default AutonomiayNecesidadesEspeciales;
