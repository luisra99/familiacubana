import { Grain, Handyman } from "@mui/icons-material";
import {
  crear,
  deleteRowsIfExist,
  obtenerDatosPorLlave,
} from "@/app/user-interfaces/forms/models/controllers";
import { useEffect, useState } from "react";

import { CustomTree } from "@/_pwa-framework/components/tree/tree.component";
import GenericForm from "@/_pwa-framework/genforms/components/form-components/form.generic";
import Meta from "@/_pwa-framework/components/Meta";
import NotificationProvider from "@/_pwa-framework/sections/Notifications/provider";
import { Typography } from "@mui/material";
import { datico } from "@/app/user-interfaces/forms/models/model";
import { getHogar } from "@/app/hogarController/hogar.controller";
import { useNavigate } from "react-router-dom";

function Afectaciones() {
  const notificar = NotificationProvider();
  const idHogar = getHogar();

  const navegar = useNavigate();
  const [treeData, setTreeData] = useState([]);
  const [isSaved, setIsSaved] = useState(false);
  const [listo, setListo] = useState<any>(false);
  
  const checkListo = async (id: string) => {
    const datos: any = await obtenerDatosPorLlave(
      "dat_afectacionmatvivienda",
      "idcodigohogar",
      id
    );
    setListo(!!datos?.length)
  }

  useEffect(() => {
    console.log("efecto hogar",idHogar)
    if (idHogar) {
      checkListo(idHogar)
    }
  },[idHogar])


  useEffect(() => {
    cargarArbol();
  }, []);
  const cargarArbol = async () => {
    let arbol: any = [];
    await datico.nom_concepto
      .where("idpadre")
      .equals("9507")
      .toArray()
      .then(async (data: any) => {
        arbol = data.map((concepto: any) => {
          let leaf: any = {};
          leaf.value = concepto.idconcepto.toString();
          leaf.label = concepto.denominacion;
          leaf.children = concepto.hijos?.map((item: any) => {
            return {
              value: item.idconcepto.toString(),
              label: item.denominacion,
            };
          });

          return leaf;
        });
        setTreeData(arbol);
      });
  };

  const siguiente = () => navegar("/servicios-equipamientos/locales");
  const anterior = () => navegar("/servicios-equipamientos/materiales");

  return (
    <>
      <Meta title="Controles" />
      {idHogar ? (
        <GenericForm
          name="test"
          controls={[
            {
              type: "component",
              component: () => (
                <Typography>
                  <b>Nota aclaratoria:</b> La información solicitada aplica a la
                  vivienda o a la parte de ella que ocupa el hogar
                </Typography>
              ),
              label: "",
              name: "",
              gridValues: { xs: 12, lg: 12, md: 12, sm: 12, xl: 12 },
            },
            {
              type: "component",
              component: () => (
                <Typography sx={{ mt: 3 }} fontSize={"17px"}>
                  Afectaciones que presenta la vivienda en
                </Typography>
              ),
              label: "",
              name: "",
              gridValues: { xs: 12, lg: 12, md: 12, sm: 12, xl: 12 },
            },

            {
              type: "component",
              component: (props) => (
                <CustomTree
                  data={treeData}
                  parentIcon={Handyman}
                  childrenIcon={Grain}
                  multiSelect={true}
                  setFieldValue={props.setFieldValue}
                  defaultValues={props.formValue}
                  {...props}
                />
              ),
              label: "",
              name: "afectaciones",
              gridValues: { xs: 12, lg: 12, md: 12, sm: 12, xl: 12 },
            },
          ]}
          title="Afectaciones que presenta la vivienda"
          description=""
          endpointPath="persona"
          showSpecificDescription={false}
          idForEdit={idHogar}
          saveButton="Guardar"
          acceptDisabledFunction={(values) => {
            return !(values.afectaciones.length > 0);
          }}
          submitFunction={async (values: any) => {
            await deleteRowsIfExist(
              "dat_afectacionmatvivienda",
              { idcodigohogar: idHogar },
              "idafectacionemat"
            ).then(() => {
              const afectaciones: string[] = Object.values(
                values.afectaciones ?? {}
              );
              if (afectaciones.length) {
                afectaciones.forEach((afectacion: string) => {
                  crear("dat_afectacionmatvivienda", {
                    idafectacion: afectacion,
                    idcodigohogar: idHogar,
                  });
                });
              }
            });
            notificar({
              type: "success",
              title:
                "Las afectaciones de la vivienda se han guardado satisfactoriamente",
            });
            setListo(true);
          }}
          getByIdFunction={async (id) => {
            const afectaciones = await obtenerDatosPorLlave(
              "dat_afectacionmatvivienda",
              "idcodigohogar",
              id
            );

            return {
              afectaciones: afectaciones.map(
                (afectacion: any) => afectacion.idafectacion
              ),
            };
          }}
          // nextButton={{
          //   text: "Siguiente",
          //   action: siguiente,
          //   submitOnAction: true,
          // }}
          prevButton={{ text: "Anterior", action: anterior }}
          nextButton={{ text: "Siguiente", action: siguiente }}
          // nextDisabledFunction={(values) => !listo}
          applyButton={false}
        />
      ) : (
        <Typography variant="h6" p={2}>
          <b>No existe un hogar seleccionado</b>
        </Typography>
      )}
    </>
  );
}

export default Afectaciones;
