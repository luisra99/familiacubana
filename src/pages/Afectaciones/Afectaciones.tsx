import { Grain, Handyman } from "@mui/icons-material";

import { CustomTree } from "@/_pwa-framework/components/tree/tree.component";
import GenericForm from "@/_pwa-framework/genforms/components/form-components/form.generic";
import Meta from "@/_pwa-framework/components/Meta";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  crear,
  modificar,
  obtenerDatosPorLlave,
} from "@/app/user-interfaces/forms/models/controllers";

function Afectaciones() {
  const [id, setid] = useState<any>(null);
  const navegar = useNavigate();

  const siguiente = () => navegar("/servicios-equipamientos/locales");
  const anterior = () => navegar("/servicios-equipamientos/materiales");
  return (
    <>
      <Meta title="Controles" />
      <GenericForm
        name="test"
        controls={[
          {
            type: "component",
            component: () => (
              <>
                <Typography sx={{ mt: -4 }}>
                  <b>Nota aclaratoria:</b> La información solicitada aplica a la
                  vivienda o a la parte de ella que ocupa el hogar
                </Typography>
                <Typography sx={{ mt: 3 }} variant="caption"></Typography>
              </>
            ),
            label: "",
            name: "",
            gridValues: { xs: 12, lg: 12, md: 12, sm: 12, xl: 12 },
          },

          {
            type: "component",
            component: () => (
              <CustomTree
                data={folder}
                parentIcon={Handyman}
                childrenIcon={Grain}
                multiSelect={true}
              />
            ),
            label: "",
            name: "",
            gridValues: { xs: 12, lg: 12, md: 12, sm: 12, xl: 12 },
          },
        ]}
        title="Afectaciones que presenta la vivienda"
        description=""
        endpointPath="persona"
        showSpecificDescription={false}
        idForEdit={id}
        saveButton="Guardar"
        setIdFunction={setid}
        submitFunction={(values) => {
          if (id)
            modificar(
              "dat_afectacionmatvivienda",
              "idafectacionemat",
              id,
              values
            );
          else crear("dat_afectacionmatvivienda", values);
        }}
        getByIdFunction={(id) =>
          obtenerDatosPorLlave(
            "dat_afectacionmatvivienda",
            "idafectacionemat",
            id
          )
        }
        nextButton={{ text: "Siguiente", action: siguiente }}
        prevButton={{ text: "Anterior", action: anterior }}
      />
    </>
  );
}

export default Afectaciones;
const folder = [
  {
    value: "nome6",
    label: " Afectaciones presenta la vivienda ",
    children: [
      {
        value: "nom2e",
        label: "Techo o entrepiso",
        children: [
          { value: "aa", label: "Derrumbe parcial" },
          { value: "ab", label: "Filtración" },
          { value: "ac", label: "Humedad" },
          { value: "ad", label: "Abofado o desconchado" },
          { value: "ae", label: "Grieta" },
          { value: "af", label: "Acero expuesto" },
          { value: "ag", label: "Madera podrida en soportería" },
          { value: "ah", label: "Está apuntalada" },
          { value: "ai", label: "Ninguna" },
        ],
      },
      {
        value: "nom7e",
        label: "Columna, viga y soportería",
        children: [
          { value: "aj", label: "Grieta o rajadura " },
          { value: "ak", label: "Acero expuesto" },
          { value: "al", label: "No tiene estos elementos" },
          { value: "am", label: "Ninguna" },
        ],
      },
      {
        value: "nom8e",
        label: "Paredes y pisos",
        children: [
          { value: "an", label: "Grietas" },
          { value: "ao", label: " Desplomes " },
          { value: "ap", label: "Abofados o desconchados " },
          { value: "aq", label: "Filtraciones " },
          { value: "ar", label: " Hundimiento del piso" },
          { value: "as", label: "Ninguna " },
        ],
      },
    ],
  },
];
