import GenericForm from "@/_pwa-framework/genforms/components/form-components/form.generic";
import Meta from "@/_pwa-framework/components/Meta";
import TableView from "@/_pwa-framework/user-solicitudes/view";
import { Button, Stack, Typography } from "@mui/material";
import { adicionarModificarvehiculos } from "@/app/user-interfaces/forms/forms.config";
import useModalState from "@/_pwa-framework/hooks/form/use-form-manager";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useLiveQuery } from "dexie-react-hooks";
import { datico } from "@/app/user-interfaces/forms/models/model";
import {
  crear,
  eliminar,
  modificar,
  obtenerDatosPorLlave,
} from "@/app/user-interfaces/forms/models/controllers";

function Vehiculos() {
  const { modalActions } = useModalState();
  const [id, setid] = useState<any>(null);
  const data = useLiveQuery(async () => {
    const prueba = await (datico as any)[
      "dat_hogarmobiliarioequipos"
    ].toArray();
    return prueba;
  });
  const navegar = useNavigate();

  const siguiente = () => navegar("/estrategia/gastos");
  const anterior = () => navegar("/servicios-equipamientos/mobiliario");
  return (
    <>
      <Meta title="Controles" />

      <GenericForm
        name="test"
        controls={[
          {
            type: "component",
            component: () => (
              <Typography sx={{ mt: -4 }}>
                <b>Nota aclaratoria: </b> La información solicitada se refiere a
                Vehículos que comparten en el hogar si se usan cotidianamente, o
                en caso de necesidades para el bien común aunque sean propiedad
                o estén asignados a un miembro en particular.
              </Typography>
            ),
            label: "",
            name: "",
            gridValues: { xs: 12, lg: 12, md: 12, sm: 12, xl: 12 },
          },
          {
            type: "component",
            component: () => (
              <>
                <Typography variant="h6" marginX={""} mt={5}>
                  Vehículos y equipos de que dispone el hogar
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
                    onClick={() => modalActions.open("1")}
                    variant="contained"
                  >
                    Adicionar
                  </Button>{" "}
                </Stack>
                <TableView
                  values={data}
                  headers={[
                    { name: "idhogarmobiliario", label: "Vehículo/Equipo" },
                    { name: "cantidad", label: "Cantidad" },
                    { name: "idtipoactividad", label: "Asig/Propio" },
                  ]}
                  idKey="idhogarmobiliario"
                  title=""
                  multiSelect={true}
                  // dataActions={[
                  //   {
                  //     label: "Adicionar ",
                  //     action: (values: any) => modalActions.open("1"),
                  //   },
                  // ]}
                  rowActions={[
                    {
                      label: "Modificar",
                      action: (values: any) => {
                        setid(values.idhogarmobiliario);
                        modalActions.open("3");
                      },
                      icon: EditIcon,
                    },
                    {
                      label: "Eliminar",
                      action: (values: any) =>
                        eliminar(
                          "dat_hogarmobiliarioequipos",
                          "idhogarmobiliario",
                          values.idhogarmobiliario
                        ),
                      icon: DeleteIcon,
                    },
                  ]}
                />
              </>
            ),
            label: "",
            name: "",
            gridValues: { xs: 12, lg: 12, md: 12, sm: 12, xl: 12 },
          },
        ]}
        title="Vehículos y equipos de que dispone el hogar"
        description=""
        endpointPath="persona"
        showSpecificDescription={false}
        idForEdit={id}
        setIdFunction={setid}
        submitFunction={(values) => {
          if (id)
            modificar(
              "dat_hogarmobiliarioequipos",
              "idhogarmobiliario",
              id,
              values
            );
          else crear("dat_hogarmobiliarioequipos", values);
        }}
        getByIdFunction={(id) =>
          obtenerDatosPorLlave(
            "dat_hogarmobiliarioequipos",
            "idhogarmobiliario",
            id
          )
        }
        nextButton={{ text: "Siguiente", action: siguiente }}
        prevButton={{ text: "Anterior", action: anterior }}
        saveButton="Guardar"
      />
      <GenericForm
        name="1"
        controls={adicionarModificarvehiculos}
        title="Adicionar vehículo o equipo"
        description=""
        endpointPath="persona"
        showSpecificDescription={false}
        idForEdit={id}
        dataAction={[{ action: () => {}, label: "Aplicar" }]}
        modalType="fullWith"
        setIdFunction={setid}
        submitFunction={(values) => {
          if (id)
            modificar(
              "dat_hogarmobiliarioequipos",
              "idhogarmobiliario",
              id,
              values
            );
          else crear("dat_hogarmobiliarioequipos", values);
        }}
        getByIdFunction={(id) =>
          obtenerDatosPorLlave(
            "dat_hogarmobiliarioequipos",
            "idhogarmobiliario",
            id
          )
        }
      />
      <GenericForm
        name="3"
        controls={adicionarModificarvehiculos}
        title="Modificar vehículo o equipo "
        description=" "
        endpointPath="persona"
        showSpecificDescription={false}
        idForEdit={id}
        modalType="fullWith"
      />
    </>
  );
}

export default Vehiculos;
