import { Button, Stack } from "@mui/material";
import {
  crear,
  eliminar,
  modificar,
  obtenerDatosPorLlave,
} from "@/app/user-interfaces/forms/models/controllers";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import GenericForm from "@/_pwa-framework/genforms/components/form-components/form.generic";
import { IGenericControls } from "@/_pwa-framework/genforms/types/controls/controls.types";
import Meta from "@/_pwa-framework/components/Meta";
import TableView from "@/_pwa-framework/user-solicitudes/view";
import { datico } from "@/app/user-interfaces/forms/models/model";
import { useLiveQuery } from "dexie-react-hooks";
import useModalState from "@/_pwa-framework/hooks/form/use-form-manager";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function ComunidadesVulnerables() {
  const { modalActions } = useModalState();
  const [id, setid] = useState<any>(null);
  const [Condiciondevivienda, setCondiciondevivienda] = useState<any>([]);

  useLiveQuery(async () => {
    const prueba = await (datico as any)[
      "dat_hogarmobiliarioequipos"
    ].toArray();
    const result = await unionNomenclador(prueba);
    setCondiciondevivienda(result);

    return result;
  });

  async function unionNomenclador(arr: any) {
    //
    const join = await Promise.all(
      arr.map(async (obj: any) => {
        //  ;
        const mobiliario = await datico.nom_concepto.get(
          parseInt(obj?.idmobiliarioequipo ?? 0)
        );

        return {
          ...obj,
          mobiliario: mobiliario?.denominacion,
        };
      })
    );
    return join;
  }

  const CondicionVivienda: IGenericControls[] = [
    {
      type: "text",
      label: "Nombre",
      name: "idhogarmobiliario",
      gridValues: { xs: 12, sm: 4 },
      //hidden: (value) => value.idtipo == "",
    },
    {
      type: "text",
      label: "Provincia",
      name: "provincia",
      gridValues: { xs: 12, sm: 4 },
      options: [
        { idconcepto: "0", denominacion: "Propio" },
        { idconcepto: "1", denominacion: "Asignado" },
      ],
    },
    {
      type: "text",
      label: "Municipio",
      name: "municipio",
      gridValues: { xs: 12, sm: 4 },
      //hidden: (values:any) => values.tienesanitario !=="1",
    },
    {
      type: "text",
      label: "Nombre de la comunidad en situación de vulnerabilidad",
      name: "comunidad",
      gridValues: { xs: 12, sm: 4 },
      //hidden: (value) => value.idtipo == "",
    },
    {
      type: "text",
      label: "Consejo popular",
      name: "consejoPopular",
      gridValues: { xs: 12, sm: 4 },
      //hidden: (values:any) => values.tienesanitario !=="1",
    },
  ];

  const navegar = useNavigate();

  const siguiente = () => navegar("/");
  const anterior = () => navegar("/");
  return (
    <>
      <Meta title="Controles" />
      <GenericForm
        name="test"
        controls={[
          // {
          //   type: "component",
          //   component: () => (
          //     <Typography sx={{ mt: -4 }}>
          //       <b>Nota aclaratoria: </b> La información solicitada se refiere a
          //       vehículos que comparten en el hogar si se usan cotidianamente, o
          //       en caso de necesidades para el bien común aunque sean propiedad
          //       o estén asignados a un miembro en particular.
          //     </Typography>
          //   ),
          //   label: "",
          //   name: "",
          //   gridValues: { xs: 12, lg: 12, md: 12, sm: 12, xl: 12 },
          // },
          {
            type: "component",
            component: () => (
              <>
                {/* <Typography variant="h6" marginX={""} mt={5}>
                   Vehículos de que dispone el hogar
                 </Typography> */}
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
                  values={Condiciondevivienda}
                  headers={[
                    { name: "idhogarmobiliario", label: "Nombre" },
                    { name: "provincia", label: "Provincia" },
                    { name: "municipio", label: "Municipio" },
                  ]}
                  idKey="idtipodenominacion"
                  multiSelect={true}
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
        title="Comunidades en situación de vulnerabilidad"
        description=""
        endpointPath="vivienda"
        showSpecificDescription={false}
        idForEdit={id}
        setIdFunction={setid}
        submitFunction={(values: any) => {
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
        controls={CondicionVivienda}
        title="Adicionar comunidad en situación de vulnerabilidad"
        description=""
        endpointPath=""
        showSpecificDescription={false}
        idForEdit={id}
        modalType="fullWith"
        setIdFunction={setid}
        submitFunction={(values: any) => {
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
        controls={CondicionVivienda}
        title="Modificar comunidad en situación de vulnerabilidad"
        description=" "
        endpointPath=""
        showSpecificDescription={false}
        idForEdit={id}
        modalType="fullWith"
      />
    </>
  );
}

export default ComunidadesVulnerables;
