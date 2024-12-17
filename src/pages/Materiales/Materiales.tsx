import { Grain, Handyman } from "@mui/icons-material";
import {
  crear,
  deleteRowsIfExist,
  modificar,
  obtener,
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
import { obtenerMiembros } from "@/app/user-interfaces/forms/models/controllers.miembrohogar";

function Materiales() {
  const navegar = useNavigate();
  const idHogar = getHogar();
  const siguiente = () => navegar("/servicios-equipamientos/afectaciones");
  const notificar = NotificationProvider();
  const anterior = async () => {
    const data = await obtenerMiembros();
    const miembros = data.filter((item) => item.edad <= 18);
    console.log("menores", miembros);

    if (miembros?.length) navegar("/adolecentes");
    else navegar("/proteccion");
  };

  const [listo, setListo] = useState<any>(false);

  const [treeData, setTreeData] = useState([]);
  const [isSaved, setIsSaved] = useState(false); // Nuevo estado

  const checkListo = async (id: string) => {
    const datos: any = await obtenerDatosPorLlave(
      "dat_estadoconstvivienda",
      "idcodigohogar",
      id
    );
    setListo(!!datos?.length);
  };

  useEffect(() => {
    console.log("efecto hogar", idHogar);
    if (idHogar) {
      checkListo(idHogar);
    }
  }, [idHogar]);

  useEffect(() => {
    cargarArbol();
  }, []);

  const cargarArbol = async () => {
    let arbol: any = [];
    await datico.nom_concepto
      .where("idpadre")
      .equals("9506")
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

  const [id, setid] = useState<any>(null);

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
                  <b>Nota aclaratoria:</b>La información solicitada aplica a la
                  vivienda o a la parte de ella que ocupa el hogar
                </Typography>
              ),
              label: "",
              name: "",
              gridValues: { xs: 12, lg: 12, md: 12, sm: 12, xl: 12 },
            },
            {
              type: "select",
              name: "idsituacionalegal",
              label: "Situación legal de la vivienda",
              url: "9299",
              validations: { required: { message: "Este campo es requerido" } },

              gridValues: { xs: 12, lg: 12, md: 12, sm: 12, xl: 12 },
            },
            {
              type: "component",
              component: () => (
                <Typography sx={{ mt: 3 }} fontSize={"17px"}>
                  Materiales predominantes en
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
                  defaultValues={props.formValue}
                  {...props}
                />
              ),
              label: "matPredominates",
              name: "matPredominates",
              gridValues: { xs: 12, lg: 12, md: 12, sm: 12, xl: 12 },
            },
          ]}
          title="Materiales predominantes de la vivienda"
          description=""
          endpointPath="persona"
          showSpecificDescription={false}
          idForEdit={idHogar}
          saveButton="Guardar"
          submitFunction={async (values: any) => {
            await deleteRowsIfExist(
              "dat_estadoconstvivienda",
              { idcodigohogar: idHogar },
              "idestadoconstvivienda"
            ).then(() => {
              const materiales: string[] = Object.values(
                values.matPredominates ?? {}
              );
              if (materiales.length) {
                materiales.forEach((material: string) => {
                  crear("dat_estadoconstvivienda", {
                    idestadoconst: material,
                    idcodigohogar: idHogar,
                  });
                });
              }
              Object.values(values.matPredominates);
            });
            modificar("dat_hogar", "idcodigohogar", parseInt(idHogar), {
              idsituacionalegal: values.idsituacionalegal,
            });

            notificar({
              type: "success",
              title:
                "Los materiales predominantes se han guardado satisfactoriamente",
            });

            setListo(true); // Actualizar estado cuando los datos se han guardado
          }}
          getByIdFunction={async (id) => {
            const materiales = await obtenerDatosPorLlave(
              "dat_estadoconstvivienda",
              "idcodigohogar",
              id
            );
            const hogar = await obtener("dat_hogar", {
              idcodigohogar: parseInt(idHogar),
            });
            return {
              matPredominates: materiales.map(
                (material: any) => material.idestadoconst
              ),
              idsituacionalegal: hogar.idsituacionalegal,
            };
          }}
          acceptDisabledFunction={(values) => {
            return !(
              values.idsituacionalegal?.length > 0 &&
              values.matPredominates?.length > 0
            );
          }}
          prevButton={{ text: "Anterior", action: anterior }}
          nextButton={{ text: "Siguiente", action: siguiente }}
          nextDisabledFunction={(values) => !listo}
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

export default Materiales;
