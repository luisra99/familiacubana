import {
  Beneficios,
  Enfermedades as enfermedadesForm,
  enfermedadesCronicas,
  escojaMiembro,
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

function Enfermedades() {
  const { modalActions } = useModalState();
  const [id, setid] = useState<any>(null);
  const navegar = useNavigate();
  const data = useLiveQuery(async () => {
    const prueba = await (datico as any)["dat_miembroenfcronicas"].toArray();
    return prueba;
  });

  const siguiente = () => navegar("/uso-servicios-salud");
  const anterior = () => navegar("/AUTONOMÍA_Y_NECESIDADES_ESPECIALES");
  return (
    <>
      <Meta title="Controles" />

      <GenericForm
        name="1"
        controls={[
          escojaMiembro,
          {
            type: "component",
            component: () => (
              <Typography mt={"12px"}>Enfermedades crónicas</Typography>
            ),
            label: "",
            name: "",
            gridValues: { xs: 12, lg: 7, md: 6, sm: 6, xl: 7 },
            disabled: (values) => values.idmiembrohogar == "",
          },
          {
            type: "component",
            component: () => <Divider sx={{ mt: 0, mb: 1 }} />,
            label: "",
            name: "",
            gridValues: { xs: 12, lg: 12, md: 12, sm: 12, xl: 12 },
            disabled: (values) => values.idmiembrohogar == "",
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
                  values={data}
                  // values={[
                  //   // {
                  //   //     pat: "HTA",
                  //   //   Access: "Sí",
                  //   //   via: "T,M",
                  //   // },
                  //   // {
                  //   //     pat: "DM 1 Y 2",
                  //   //   Access: "No",
                  //   //   via: "H,T",
                  //   // },
                  // ]}
                  headers={[
                    { name: "idtipoenfermedad", label: "Patología" },
                    { name: "idtipoviaacceso", label: "Accede a medicamentos" },
                    { name: "idcodigohogar", label: "Vías de acceso" },
                  ]}
                  idKey="idmiembroenfcronica"
                  title=""
                  multiSelect={true}
                  // dataActions={[
                  //   {
                  //     label: "Adicionar  ",
                  //     action: (values: any) => modalActions.open("2"),
                  //   },
                  // ]}
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
                      action: (values: any) =>
                        eliminar(
                          "dat_miembroenfcronicas",
                          "idmiembroenfcronica",
                          values.idmiembroenfcronica
                        ),
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
              values.idmiembroenfcronica !== "1",
          },

          {
            type: "component",
            component: () => <Divider sx={{ mt: 0, mb: 1 }} />,
            label: "",
            name: "",
            gridValues: { xs: 12, lg: 12, md: 12, sm: 12, xl: 12 },
            disabled: (values) => values.idmiembrohogar == "",
          },
          enfermedadesForm,
          Beneficios,
        ]}
        title="Enfermedades"
        description=" "
        endpointPath="persona"
        showSpecificDescription={false}
        idForEdit={id}
        saveButton="Guardar"
        nextButton={{ text: "Siguiente", action: siguiente }}
        prevButton={{ text: "Anterior", action: anterior }}
      />
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
          if (id)
            modificar("dat_miembroenfcronicas", "idmiembroenfcronica", id, {
              ...values,
              idcodigohogar: getHogar(),
            });
          else
            crear("dat_miembroenfcronicas", {
              ...values,
              idcodigohogar: getHogar(),
            });
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
