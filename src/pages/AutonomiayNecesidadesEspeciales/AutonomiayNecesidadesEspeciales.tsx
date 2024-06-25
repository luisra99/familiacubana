import {
  FormularioEviel,
  FormularioEviel1,
} from "@/app/user-interfaces/forms/forms.config";
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
import { obtenerMiembrosSelect } from "@/app/user-interfaces/forms/models/controllers.miembrohogar";

function AutonomiayNecesidadesEspeciales() {
  const { modalActions } = useModalState();
  const [id, setid] = useState<any>(null);
  const navegar = useNavigate();
  const data = useLiveQuery(async () => {
    const prueba = await (datico as any)["dat_miembrogradoautonomia"].toArray();
    return prueba;
  });

  const miembros = obtenerMiembrosSelect();
  // console.log(miembros);

  const siguiente = () => navegar("/autonomia/enfermedades");
  const anterior = () => navegar("/ocupacion/no-vinculado");
  const aceptar = () => navegar("/");
  return (
    <>
      <Meta title="Controles" />
      {/* <Button
              onClick={() => modalActions.open("")}
              variant="contained"
              sx={{ marginBottom: "10px !important" }}
            >
              Adicionar
            </Button> */}
      <GenericForm
        name="test"
        controls={[
          {
            type: "select",
            name: "idmiembro",
            label: "Miembro del hogar",

            gridValues: { xs: 6, lg: 6, md: 6, sm: 6, xl: 6 },
            //  onChange: { action: (values: any) => {
            //   setid(values.idcodigohogar);
            //  }
            // },
            options: miembros,
          },
          ...FormularioEviel,
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
                  values={data}
                  // dataActions={[
                  //   {
                  //     label: "Adicionar ",
                  //     action: (values: any) => modalActions.open("teste"),
                  //   },
                  // ]}
                  headers={[
                    { name: "idaditamento", label: "Aditamento" },
                    { name: "disponeadit", label: "Disponibilidad" },
                  ]}
                  idKey="idmiembrogradoautonomia"
                  title=""
                  multiSelect={true}
                  // dataActions={[
                  //   {
                  //     label: "Adicionar ",
                  //     action: (values: any) => modalActions.open("teste"),
                  //   },
                  // ]}
                  rowActions={[
                    {
                      label: "Eliminar",
                      action: (values: any) =>
                        eliminar(
                          "dat_miembrogradoautonomia",
                          "idmiembrogradoautonomia",
                          values.idmiembrogradoautonomia
                        ),
                      icon: DeleteIcon,
                    },
                  ]}
                />
              </>
            ),
            disabled: (values) => values.idmiembro == "", //|| values.idautonomia != "9371",
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
          else
            crear("dat_miembrogradoautonomia", {
              ...values,
              idcodigohogar: getHogar(),
            });
        }}
        getByIdFunction={(id) =>
          obtenerDatosPorLlave(
            "dat_miembrogradoautonomia",
            "idmiembrogradoautonomia",
            id
          )
        }
      />

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
            modificar(
              "dat_miembrogradoautonomia",
              "idmiembrogradoautonomia",
              id,
              { ...values, idcodigohogar: getHogar() }
            );
          else
            crear("dat_miembrogradoautonomia", {
              ...values,
              idcodigohogar: getHogar(),
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
    </>
  );
}

export default AutonomiayNecesidadesEspeciales;
