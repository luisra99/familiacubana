import { Divider, Typography } from "@mui/material";
import {
  FrecuenciaSuministro,
  FuentedeElectricidad,
  InstalacionRedAcueducto,
  ManejoDesechos,
  ProcedenciaPrincipalAgua,
  ServicioInternet,
  SistemaDesague,
} from "@/app/user-interfaces/controls/controls.config.eviel";

import GenericForm from "@/_pwa-framework/genforms/components/form-components/form.generic";
import Meta from "@/_pwa-framework/components/Meta";
import useModalState from "@/_pwa-framework/hooks/form/use-form-manager";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  crear,
  modificar,
  obtenerDatosPorLlave,
} from "@/app/user-interfaces/forms/models/controllers";

function ServiciosVivienda() {
  const { modalActions } = useModalState();
  const [id, setid] = useState<any>(null);
  const navegar = useNavigate();

  const siguiente = () => navegar("/servicios-equipamientos/mobiliario");
  const anterior = () => navegar("/servicios-equipamientos/locales");
  return (
    <>
      <Meta title="Controles" />

      <GenericForm
        name="2"
        controls={[
          {
            type: "component",
            component: () => <Typography>Servicio de agua</Typography>,
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
          InstalacionRedAcueducto,
          FrecuenciaSuministro,
          ProcedenciaPrincipalAgua,
          {
            type: "component",
            component: () => (
              <Typography>
                <b>Nota aclaratoria: </b>Escoger la procedencia principal del
                agua q se consume.
              </Typography>
            ),
            label: "",
            name: "",
            gridValues: { xs: 12, lg: 12, md: 12, sm: 12, xl: 12 },
          },
          {
            type: "component",
            component: () => <Typography sx={{ mt: 2 }}>Otros</Typography>,
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
          SistemaDesague,
          ManejoDesechos,
          FuentedeElectricidad,
          {
            type: "component",
            component: () => (
              <Typography sx={{ mt: 2 }}>Acceso a redes</Typography>
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
          ServicioInternet,
        ]}
        title="Servicios de la vivienda"
        description=""
        endpointPath="persona"
        nextButton={{ text: "Siguiente", action: siguiente }}
        prevButton={{ text: "Anterior", action: anterior }}
        showSpecificDescription={false}
        idForEdit={id}
        saveButton="Guardar"
        setIdFunction={setid}
        submitFunction={(values) => {
          if (id)
            modificar(
              "dat_seviciosvivienda",
              "idserviciosvivienda",
              id,
              values
            );
          else crear("dat_seviciosvivienda", values);
        }}
        getByIdFunction={(id) =>
          obtenerDatosPorLlave(
            "dat_seviciosvivienda",
            "idserviciosvivienda",
            id
          )
        }
      />
    </>
  );
}

export default ServiciosVivienda;
