
import { Button, Divider, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
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
import { ocupacionNNA } from "@/app/user-interfaces/forms/forms.config";
import { Stack } from "@mui/system";
import { getHogar } from "@/app/hogarController/hogar.controller";
import NotificationProvider from "@/_pwa-framework/sections/Notifications/provider";
import { obtenerMiembros } from "@/app/user-interfaces/forms/models/controllers.miembrohogar";

//import { Ingresos,Aditamientos } from "@/app/user-interfaces/controls/controls.config.eviel";

function SITUACIÓN_DE_NIÑOS_Y_NIÑAS_Y_ADOLESCENTES() {
  const idhogar = getHogar() ?? 0;
  const { modalActions } = useModalState();
  const [habilitarAdd, setHabilitarAdd] = useState<any>(true);
  const [idmiembrohogar, setIdMiembroHogar] = useState<any>(0);
  const [ingresosMiembro, setIngresosMiembro] = useState<any>([]);
  const [miembros, setMiembros] = useState<any>([]);
  const [titleForm, setTitleForm] = useState<any>('');
  
  async function unionNomenclador(arr: any) {
    const join = await Promise.all(
      arr.map(async (obj: any) => {
        console.log('obj', obj);
        const actividad = await datico.nom_concepto.get(
          parseInt(obj?.idtipoactividad[0] ?? 0)
        );
        const horas = await datico.nom_concepto.get(
          parseInt(obj?.idcanthoras[0] ?? 0)
        );
        const horarios = await datico.nom_concepto.get(
          parseInt(obj?.idhorario[0] ?? 0)
        );
        console.log('autorizacion', parseInt(obj?.autorizadomtss[0]))
        const autori = parseInt(obj?.autorizadomtss[0])
        return {
          ...obj,
          actividad: actividad?.denominacion,
          horas: horas?.denominacion,
          horarios: horarios?.denominacion,
          autorizacion: parseInt(obj?.autorizadomtss[0]) == 1 ? 'Si' : 'No',
        };
      }
      )
    );
    return join;
  }
  async function obtenerDatos(idmiembro: any) {

    const data = await datico.dat_nnaocupacion //idcodigohogar:"1"
      .where({ idmiembrohogar: idmiembro })
      .toArray();

    const result = await unionNomenclador(data);
    return result;
  }
  /*llenar el combo d elos miembros*/
  useLiveQuery(async () => {
    const data = await obtenerMiembros();
    setMiembros(data);
  });
  async function onChangeMiembro(id: any) {
    const datos = await obtenerDatos(id);
    console.log('datos', datos);
    setIngresosMiembro(datos);
  }
  const notificar = NotificationProvider();
  const navegar = useNavigate();
  const siguiente = () => navegar("/servicios-equipamientos/materiales");
  const anterior = () => navegar("/proteccion");

  const [id, setid] = useState<any>(null);

  console.log('idmiembrohogar', idmiembrohogar);
  function getFormPage() {
    if (idhogar) {
      if (miembros?.length) {
        return (<GenericForm
          name="test"
          controls={[
            {
              type: "select",
              label: "Miembro del hogar",
              name: "idmiembrohogar",
              gridValues: { xl: 12, lg: 12, md: 12, sm: 12, xs: 12 },
              options: miembros,
              onChange: (e,ref) => {
                const { value } = e.target;
                console.log('valuemiembro', value)
                setHabilitarAdd(false);
                setIdMiembroHogar(value);
                ref.setFieldValue('idsituacioneduc', [], true),
                ref.setFieldValue('idcuidadoprimerainf', [], true),
                ref.setFieldValue('idcuidadohogar', [], true)
                ref.setFieldValue('idetp', [], true)
                ref.setFieldValue('idcausadesv', [], true)
                ref.setFieldValue('otrascausas', [], true)
                ref.setFieldValue('idtiposituacion', [], true)
                onChangeMiembro(value);
                
              },
            },
            {
              type: "select",
              label:
                "Situación educativa de niños, niñas, adolecentes y jóvenes del hogar",
              name: "idsituacioneduc",
              gridValues: { xl: 12, lg: 12, md: 12, sm: 12, xs: 12 },
              url: "9472",
              disabled: () => idmiembrohogar == 0,
              onChange: (value, ref) => {
                ref.setFieldValue('idcuidadoprimerainf', [], true),
                ref.setFieldValue('idcuidadohogar', [], true)
                ref.setFieldValue('idetp', [], true)
                ref.setFieldValue('idcausadesv', [], true)
                ref.setFieldValue('otrascausas', [], true)
              }
            },
            // idcuidadoprimerainf,
            {
              type: "select",
              label: "Escoja la opción", //Educacion y cuidado en la primera infancia
              name: "idcuidadoprimerainf",
              url: "9473",
              gridValues: { xl: 12, lg: 12, md: 12, sm: 12, xs: 12 },
              disabled: (values) => values.idsituacioneduc != "9473" || idmiembrohogar == 0,
              onChange: (value, ref) => {
                ref.setFieldValue('idcuidadohogar', [], true)
              }
            },
            {
              type: "select",
              label: "Escoja la opción",
              name: "idsne",
              gridValues: { xl: 12, lg: 12, md: 12, sm: 12, xs: 12 },
              disabled: (values) => values.idsituacioneduc != "9474" || idmiembrohogar == 0,
              url: "9474",
              onChange: (value, ref) =>
                ref.setFieldValue('idcuidadohogar', [], true)
  
            },
            {
              type: "select",
              label: "Escoja la opción", // Educacion y cuidado en el hogar
              name: "idcuidadohogar",
              gridValues: { xl: 12, lg: 12, md: 12, sm: 12, xs: 12 },
              disabled: (values) => {
                console.log('valuesvalues', values)
                return values.idcuidadoprimerainf != "9478" || values.idsituacioneduc != "9473" || idmiembrohogar == 0
              }, //values.idsituacioneduc !="9473" &&
              url: "9478",
              onChange: (value, ref) =>
                ref.setFieldValue('idetp', [], true)
  
            },
            {
              type: "select",
              label: "Escoja la opción",
              name: "idetp",
              gridValues: { xl: 12, lg: 12, md: 12, sm: 12, xs: 12 },
              disabled: (values) => values.idsne != "9486" || values.idsituacioneduc != "9474" || idmiembrohogar == 0,
              url: "9486",
  
            },
            {
              type: "component",
              component: () => (
                <Typography>
                  <b>Nota aclaratoria:</b>El programa educa a tu hijo es lo que se
                  conoce como "vias no formales".
                </Typography>
              ),
              label: "",
              name: "",
              gridValues: { xs: 12, lg: 12, md: 12, sm: 12, xl: 12 },
              disabled: (values) => { return values.idcuidadoprimerainf != "9478" || values.idsituacioneduc != "9473" || idmiembrohogar == 0 },
            },
            {
              type: "select",
              label: "Causas",
              name: "idcausadesv",
              url: "9475",
              multiple: "check",
              gridValues: { xs: 12, lg: 12, md: 12, sm: 12, xl: 12 },
              disabled: (values) => values.idsituacioneduc != "10134" || idmiembrohogar == 0,
              onChange: (value, ref) =>
                ref.setFieldValue('otrascausas', [], true)
            },
            {
              type: "text",
              label: "Explicite otras razones",
              name: "otrascausas",
              multiline: { minRows: 2 },
              gridValues: { xs: 12, lg: 12, md: 12, sm: 12, xl: 12 },
              disabled: (values) =>
                values.idcausadesv.findIndex((causa: any) => causa === "9500") == -1 || values.idsituacioneduc != "10134" || idmiembrohogar == 0
            },
            {
              type: "component",
              component: () => <Divider sx={{ my: 1 }} />,
              label: "",
              name: "",
              gridValues: { xs: 12, lg: 12, md: 12, sm: 12, xl: 12 },
              disabled: () => idmiembrohogar == 0,
            },
            {
              type: "component",
              component: () => (
                <>
                  <Typography variant="h6" marginX={""} mt={5}>
                    Niños, niñas y adolescentes ocupados/as
                  </Typography>
                  <Stack
                    spacing={2}
                    direction="row"
                    my={2}
                    textAlign={"left"}
                    px={5}
                    display={"inline-list-item"}
                  >
                    <Button
                      onClick={() => modalActions.open("formulario")}
                      variant="contained"
                    >
                      Adicionar
                    </Button>{" "}
                  </Stack>
                  <TableView
                    values={ingresosMiembro}
                    headers={[
                      { name: "actividad", align: "left", label: "Actividad" },
                      { name: "horas", align: "left", label: "Cantidad de horas" },
                      { name: "horarios", align: "left", label: "Horarios" },
                      { name: "autorizacion", align: "center", label: "Autorización  el MTSS" },
                    ]}
                    idKey="idnnaocupacion"
                    title=""
                    multiSelect={false}
                    useCheckBox={false}
                    rowActions={[
                      {
                        label: "Modificar",
                        action: (values: any) => {
                          setid(values.idmiembrofuentesingresos);
                          setTitleForm("Modificar ingreso");
                          modalActions.open("formulario");
                          // setid(values.idnnaocupacion);
                          // modalActions.open("1");
                        },
                        icon: EditIcon,
                      },
                      {
                        icon: DeleteIcon,
                        label: "Eliminar",
                        action: (values: any) => {
                          eliminar("dat_nnaocupacion",
                            "idnnaocupacion",
                            values.idnnaocupacion)
                            .then(() => {
                              notificar({
                                type: "success",
                                title: "Eliminar",
                                content:
                                  "Eliminado correctamente",
                              });
                              onChangeMiembro(idmiembrohogar);
                            }
  
                            )
  
                        },
                      },
  
                    ]}
                  />
                </>
              ),
              label: "",
              name: "",
              gridValues: { xs: 12, lg: 12, md: 12, sm: 12, xl: 12 },
              disabled: () => idmiembrohogar == 0
            },
            {
              type: "component",
              component: () => (
                <Typography>
                  <b>Nota aclaratoria:</b>Esta información no se pregunta se
                  completa con información previa.
                </Typography>
              ),
              label: "",
              name: "",
              gridValues: { xs: 12, lg: 12, md: 12, sm: 12, xl: 12 },
              disabled: () => idmiembrohogar == 0,
            },
            {
              type: "component",
              component: () => <Divider sx={{ m: 2 }} />,
              label: "",
              name: "",
              gridValues: { xs: 12, lg: 12, md: 12, sm: 12, xl: 12 },
              disabled: () => idmiembrohogar == 0,
            },
            {
              type: "component",
              component: () => (
                <Typography>
                  Situación de NNA que cometen hechos que la ley tipifica como
                  delito, con comportamiento social inadecuado y/o víctimas de
                  violencia.
                </Typography>
              ),
              label: "",
              name: "",
              gridValues: { xs: 12, lg: 12, md: 12, sm: 12, xl: 12 },
              disabled: () => idmiembrohogar == 0,
            },
            {
              type: "select",
              label: "Situación de NNA que cometen hechos que la ley tipifica como delito",
              name: "idtiposituacion",
              multiple: "check",
              gridValues: { xs: 12, lg: 12, md: 12, sm: 12, xl: 12 },
              url: "9421",
              disabled: () => idmiembrohogar == 0,
            },
          ]}
          // Niños, niñas y adolescentes ocupados/as
          title="Situación de niños, niñas y adolescentes"
          description=""
          endpointPath="persona"
          showSpecificDescription={false}
          nextButton={{ text: "Siguiente", action: siguiente }}
          prevButton={{ text: "Anterior", action: anterior }}
          idForEdit={id}
          saveButton="Guardar"
          setIdFunction={setid}
          submitFunction={async (values) => {
            {
              console.log('valores', values, idmiembrohogar)
              const id_situacnnaj = await crear("dat_situacnnaj", {
                ...values,
                idcodigohogar: idhogar
              }).then((id_situacnnaj:any)=>{
                crear("dat_nnasitdelictiva", {
                  idtiposituacion: values.idtiposituacion,
                  id_situacnnaj
                })
                notificar({
                  type: "success",
                  title: "Adicionar",
                  content: "Adicionado correctamente",
                });
              })
           
            }
          }}
          getByIdFunction={(id) =>
            obtenerDatosPorLlave("dat_situacnnaj", "idsituacnnaj", id)
          }
        />)
      } else {
        return (
          <Typography mx={2} my={2}>
            <b>No existen miembro añadidos al hogar...</b>
          </Typography>
        );
      }
    }else {
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
          name="formulario"
          controls={ocupacionNNA}
          title={titleForm}
          description=" "
          endpointPath="persona"
          showSpecificDescription={true}
          idForEdit={id}
          setIdFunction={setid}
          modalType="fullWith"
          submitFunction={(values) => {
            console.log('nnaocupacion', values,)
            console.log('nnaocupacion0', idmiembrohogar)
            if (id) {             
              modificar("dat_nnaocupacion", "idnnaocupacion", id, values).then(() => {
                notificar({
                  type: "success",
                  title: "Modificar",
                  content:"Modificado correctamente",
                });
                onChangeMiembro(idmiembrohogar);
              });
            }
            else {
              console.log('datos a insertar en la tabla ', {
                ...values,
                idmiembrohogar: idmiembrohogar,
              }),
                crear("dat_nnaocupacion", {
                  ...values,
                  idmiembrohogar: idmiembrohogar,
                }).then((id) => {
                  // console.log(id);
                  notificar({
                    type: "success",
                    title: "Adicionar",
                    content: "Adicionado correctamente",
                  });
                  onChangeMiembro(idmiembrohogar);
                });
            }
          }
          }
          getByIdFunction={
            (id) =>
              obtenerDatosPorLlave(
                "dat_nnaocupacion",
                "idnnaocupacion",
                id
              )
            }
        />

      );
    }
  }
  return (
    <>
      <Meta title="Controles" />
      {getFormPage()}
      {getFormModal()}
    </>
  );
}
export default SITUACIÓN_DE_NIÑOS_Y_NIÑAS_Y_ADOLESCENTES;
