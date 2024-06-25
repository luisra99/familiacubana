import {
  Beneficios,
  Enfermedades as enfermedadesForm,
  enfermedadesCronicas,
} from "@/app/user-interfaces/controls/controls.config.ponzoa";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { AdicionarEnfermedadesCronicas } from "@/app/user-interfaces/forms/forms.config";
import GenericForm from "@/_pwa-framework/genforms/components/form-components/form.generic";
import Meta from "@/_pwa-framework/components/Meta";
import TableView from "@/_pwa-framework/user-solicitudes/view";
import useModalState from "@/_pwa-framework/hooks/form/use-form-manager";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button, Divider, Stack, Typography } from "@mui/material";
import { useLiveQuery } from "dexie-react-hooks";
import { datico } from "@/app/user-interfaces/forms/models/model";
import {
  crear,
  eliminar,
  modificar,
  obtenerDatosPorLlave,
} from "@/app/user-interfaces/forms/models/controllers";
import { getHogar } from "@/app/hogarController/hogar.controller";
import { datico as db } from "@/app/user-interfaces/forms/models/model";
import NotificationProvider from "@/_pwa-framework/sections/Notifications/provider";
import { obtenerMiembros } from "@/app/user-interfaces/forms/models/controllers.miembrohogar";

function Enfermedades() {
  const idhogar = getHogar() ?? 0;
  const [idmiembrohogar, setIdMiembroHogar] = useState<any>(0);
  const [enfermedades, setEnfermedades] = useState<any>([]);
  const [miembros, setMiembros] = useState<any>([]);
  const [vias, setVias] = useState<any>([]);
  const notificar = NotificationProvider();

  const { modalActions } = useModalState();
  const [id, setid] = useState<any>(null);
  const navegar = useNavigate();

  useLiveQuery(async () => {
    const data = await obtenerMiembros();
    setMiembros(data);
  });

  async function unionNomenclador(arr: any) {
    console.log("arr", arr);
    const join = await Promise.all(
      arr.map(async (obj: any) => {
        console.log("obj", obj);
        const patologia = await db.nom_concepto.get(
          parseInt(obj?.idtipoenfermedad[0] ?? 0)
        );
        const accede = obj?.accede[0] === "1" ? "Si" : "No";
        const arrNum = obj?.idtipoviaacceso?.map((srtr: any) => parseInt(srtr));
        const data = await db.nom_concepto
          .where("idconcepto")
          .anyOf(arrNum)
          .toArray();
        const eli = data.map((obj) => obj.denominacion).join(", ");

        return {
          ...obj,
          patologia: patologia?.denominacion,
          accede: accede,
          via: eli,
        };
      })
    );
    return join;
  }
  async function addnomenclador(arr: any) {
    const join = await Promise.all(
      arr.map(async (obj: any) => {
        console.log("objobj", obj);
        const miviaacceso = await db.dat_viasacceso
          .where({ idmiembroenfcronica: parseInt(obj?.idmiembroenfcronica) })
          .toArray();
        console.log("miviaacceso", miviaacceso);
        // arr["idtipoviaacceso"] = miviaacceso[0].idtipoviaacceso;
        return {
          ...obj,
          idtipoviaacceso: miviaacceso[0]?.idtipoviaacceso,
        };
      })
    );
    console.log("join", join);
    const result = await unionNomenclador(join);
    return result;
  }

  async function obtenerDatos(idmiembro: any) {
    const data = await db.dat_miembroenfcronicas
      .where({ idmiembrohogar: idmiembro })
      .toArray();
    const result1 = await addnomenclador(data);
    return result1;
  }

  async function onChangeMiembro(id: any) {
    const datos = await obtenerDatos(id);
    console.log("datoseliminado", datos);
    setEnfermedades(datos);
  }

  const siguiente = () => navegar("/autonomia/servicios");
  const anterior = () => navegar("/autonomia/discapacidad");

  function getPage() {
    if (idhogar) {
      if (miembros.length) {
        return (
          <GenericForm
            name="1"
            controls={[
              {
                type: "select",
                label: "Miembro del hogar",
                name: "idmiembro",
                gridValues: { xl: 12, lg: 12, md: 12, sm: 12, xs: 12 },
                options: miembros,
                onChange: (e, ref) => {
                  const { value } = e.target;
                  console.log("eee", value);
                  setIdMiembroHogar(value),
                    ref.setFieldValue("idenfermedad", [], true),
                    ref.setFieldValue("idbeneficio", [], true),
                    onChangeMiembro(value);
                },
              },
              {
                type: "component",
                component: () => (
                  <Typography mt={"12px"}>Enfermedades crónicas</Typography>
                ),
                label: "",
                name: "",
                gridValues: { xs: 12, lg: 7, md: 6, sm: 6, xl: 7 },
                disabled: (values) => values.idmiembro == 0,
              },
              {
                type: "component",
                component: () => <Divider sx={{ mt: 0, mb: 1 }} />,
                label: "",
                name: "",
                gridValues: { xs: 12, lg: 12, md: 12, sm: 12, xl: 12 },
                disabled: (values) => values.idmiembro == 0,
              },
              enfermedadesCronicas,
              {
                type: "component",

                component: () => (
                  <>
                    <Typography variant="h6" marginX={"auto"} mt={5}>
                      Enfermedades crónicas
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
                        onClick={() => modalActions.open("2")}
                        variant="contained"
                        sx={{ marginBottom: "10px !important" }}
                      >
                        Adicionar
                      </Button>
                    </Stack>
                    <TableView
                      values={enfermedades}
                      useCheckBox={false}
                      headers={[
                        {
                          name: "patologia",
                          align: "center",
                          label: "Patología",
                        },
                        {
                          name: "accede",
                          align: "center",
                          label: "Accede a medicamentos",
                        },
                        {
                          name: "via",
                          align: "center",
                          label: "Vías de acceso",
                        },
                      ]}
                      idKey="idmiembroenfcronica"
                      title=""
                      multiSelect={true}
                      rowActions={[
                        {
                          label: "Modificar",
                          action: (values: any) => {
                            modalActions.open("3");
                          },
                          icon: EditIcon,
                        },

                        {
                          label: "Eliminar",
                          action: (values: any) => {
                            console.log("valuess", idmiembrohogar);
                            const llave = values.idmiembroenfcronica;
                            eliminar(
                              "dat_miembroenfcronicas",
                              "idmiembroenfcronica",
                              llave
                            ).then(() => onChangeMiembro(idmiembrohogar));
                            eliminar(
                              "dat_viasacceso",
                              "idmiembroenfcronica",
                              llave
                            ).then(() => onChangeMiembro(idmiembrohogar));
                          },
                          icon: DeleteIcon,
                        },
                      ]}
                    />
                  </>
                ),
                gridValues: { lg: 12, md: 12, sm: 12, xl: 12, xs: 12 },
                name: "aditamentos",
                label: "adt",
                disabled: (values) =>
                  values.idmiembroenfcronica == "2" ||
                  values.idmiembroenfcronica !== "1" ||
                  values.idmiembro == 0,
              },

              {
                type: "component",
                component: () => <Divider sx={{ mt: 0, mb: 1 }} />,
                label: "",
                name: "",
                gridValues: { xs: 12, lg: 12, md: 12, sm: 12, xl: 12 },
                disabled: (values) => values.idmiembro == 0,
              },
              {
                type: "select",
                name: "idenfermedad",
                label: "Enfermedades de baja prevalencia",
                gridValues: { xs: 12, lg: 6, md: 6, sm: 6, xl: 6 },
                url: "9399",
                multiple: "check",
                disabled: (values) => values.idmiembro == 0,
              },
              {
                type: "select",
                name: "idbeneficio",
                label: "Beneficios focalizados de salud",
                url: "9802",
                multiple: "check",
                gridValues: { xs: 12, lg: 6, md: 6, sm: 6, xl: 6 },
                disabled: (values) => values.idmiembro == 0,
              },
            ]}
            title="Enfermedades"
            description=" "
            endpointPath="persona"
            showSpecificDescription={false}
            idForEdit={id}
            saveButton="Guardar"
            nextButton={{ text: "Siguiente", action: siguiente }}
            prevButton={{ text: "Anterior", action: anterior }}
            submitFunction={(values) => {
              console.log('valoritos',values)
              crear("dat_miembrobeneficios", {
                idmiembrohogar: values.idmiembro[0],
                idbeneficio: values.idbeneficio,
              }).then((id) => {               
                onChangeMiembro(idmiembrohogar);
              });
              crear("dat_miembroenfcronicas", {
                idmiembrohogar: values.idmiembro[0],
                idenfermedad:values.idenfermedad
              }).then((id) => {
                notificar({
                  type: "success",
                  title: "Adicionar",
                  content: "Enfermedad adicionada correctamente",
                });
                onChangeMiembro(idmiembrohogar);
              });
            }}
          />
        );
      } else {
        return (
          <Typography mx={2} my={2}>
            <b>No hay miembros en el hogar seleccionado...</b>
          </Typography>
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
  function getFormADD() {
    if (idmiembrohogar)
      return (
        <GenericForm
          name="2"
          controls={AdicionarEnfermedadesCronicas}
          title="Adicionar enfermedad crónica "
          description=" "
          endpointPath="persona"
          showSpecificDescription={false}
          idForEdit={id}
          modalType="fullWith"
          setIdFunction={setid}
          submitFunction={(values) => {
            console.log("idmiemnro", values, idmiembrohogar);
            if (id) {
              modificar("dat_miembroenfcronicas", "idmiembroenfcronica", id, {
                ...values,
                idmiembrohogar: idmiembrohogar,
                idtipoenfermedad:values.idtipoenfermedad
              }).then(() => {
                notificar({
                  type: "success",
                  title: "Adicionar",
                  content: "La enfermedad ha sido adicionada correctamente",
                });
                onChangeMiembro(idmiembrohogar);
              });
            } else {
              
              const idenfermedades = crear("dat_miembroenfcronicas", {
                idtipoenfermedad: values.idtipoenfermedad,
                accede: values.accede,
                idmiembrohogar: idmiembrohogar,
              }).then((idenfermedades) => {
                console.log("lolo", values);
                crear("dat_viasacceso", {
                  idtipoviaacceso: values.idtipoviaacceso,
                  idmiembroenfcronica: idenfermedades,
                });
                notificar({
                  type: "success",
                  title: "Adicionar",
                  content: "La enfermedad ha sido adicionada correctamente",
                });
                onChangeMiembro(idmiembrohogar);
              });
            }
          }}
          getByIdFunction={(id) =>
            obtenerDatosPorLlave(
              "dat_miembroenfcronicas",
              "idmiembroenfcronica",
              id
            )
          }
          dataAction={[{ action: () => {}, label: "Aplicar" }]}
        />
      );
  }

  return (
    <>
      <Meta title="Controles" />

      {getPage()}

      {getFormADD()}

      <GenericForm
        name="3"
        controls={AdicionarEnfermedadesCronicas}
        title="Modificar enfermedad crónica "
        description=" "
        endpointPath="persona"
        showSpecificDescription={false}
        idForEdit={id}
        modalType="fullWith"
      />
    </>
  );
}

export default Enfermedades;
