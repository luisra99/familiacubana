import Meta from "@/_pwa-framework/components/Meta";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import GenericForm from "@/_pwa-framework/genforms/components/form-components/form.generic";
import Typography from "@mui/material/Typography";
import { Divider } from "@mui/material";
import {
  cantidad,
  cantidadSegunCocina,
  cocina,
  Combustible,
  ecojaLaOpcion,
  letrina,
  LocalparaCocinar,
  PiezasdeTipoDormitorio,
  PiezasexclusivadeTipoDormitorio,
  Sanitario,
  seEncunetra,
} from "@/app/user-interfaces/controls/controls.config.ponzoa";
import {
  crear,
  modificar,
  obtenerDatosPorLlave,
} from "@/app/user-interfaces/forms/models/controllers";

function LocalesVivienda() {
  const [id, setid] = useState<any>(null);
  const navegar = useNavigate();

  const siguiente = () => navegar("/servicios-vivienda");
  const anterior = () => navegar("/afectaciones");
  return (
    <>
      <Meta title="Controles" />
      <GenericForm
        name="1"
        controls={[
          {
            type: "component",
            component: () => (
              <Typography mt={-4}>
                <b>Nota aclaratoria:</b>La información solicitada aplica a la
                vivienda o a la parte de ella que ocupa el hogar.
              </Typography>
            ),
            label: "",
            name: "",
            gridValues: { xs: 12, lg: 12, md: 12, sm: 12, xl: 12 },
          },
          {
            type: "component",
            component: () => <Typography>Dormitorios</Typography>,
            label: "",
            name: "",
            gridValues: { xs: 12, lg: 12, md: 12, sm: 12, xl: 12 },
          },
          {
            type: "component",
            component: () => <Divider sx={{ mb: 2 }} />,
            label: "",
            name: "",
            gridValues: { xs: 12, lg: 12, md: 12, sm: 12, xl: 12 },
          },
          PiezasdeTipoDormitorio,
          PiezasexclusivadeTipoDormitorio,

          {
            type: "component",
            component: () => <Typography mt={2}>Cocina</Typography>,
            label: "",
            name: "",
            gridValues: { xs: 12, lg: 12, md: 12, sm: 12, xl: 12 },
          },
          {
            type: "component",
            component: () => <Divider sx={{ mb: 2 }} />,
            label: "",
            name: "",
            gridValues: { xs: 12, lg: 12, md: 12, sm: 12, xl: 12 },
          },
          cocina,
          cantidadSegunCocina,
          {
            type: "component",
            component: () => <Divider sx={{ mb: -5 }} />,
            label: "",
            name: "",
            gridValues: { xs: 12, lg: 12, md: 12, sm: 12, xl: 12 },
          },
          LocalparaCocinar,
          Combustible,
          {
            type: "component",
            component: () => (
              <Typography sx={{ mt: 2 }}>Servicio sanitario</Typography>
            ),
            label: "",
            name: "",
            gridValues: { xs: 12, lg: 12, md: 12, sm: 12, xl: 12 },
          },
          {
            type: "component",
            component: () => <Divider sx={{ mb: 2 }} />,
            label: "",
            name: "",
            gridValues: { xs: 12, lg: 12, md: 12, sm: 12, xl: 12 },
          },
          Sanitario,
          ecojaLaOpcion,
          cantidad,
          //Serviciossanitario,
          seEncunetra,
          letrina,
        ]}
        title="Locales de la vivienda"
        description=""
        nextButton={{ text: "Siguiente", action: siguiente }}
        prevButton={{ text: "Anterior", action: anterior }}
        endpointPath="persona"
        showSpecificDescription={false}
        idForEdit={id}
        saveButton="Guardar"
        setIdFunction={setid}
        submitFunction={(values) => {
          if (id)
            modificar("dat_localesvivienda", "idlocalesvivienda", id, values);
          else crear("dat_localesvivienda", values);
        }}
        getByIdFunction={(id) =>
          obtenerDatosPorLlave("dat_localesvivienda", "idlocalesvivienda", id)
        }
      />
    </>
  );
}

export default LocalesVivienda;
