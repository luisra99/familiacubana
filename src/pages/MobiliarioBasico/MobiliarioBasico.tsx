import { TextField, Typography } from "@mui/material";

import GenericForm from "@/_pwa-framework/genforms/components/form-components/form.generic";
import Meta from "@/_pwa-framework/components/Meta";
import TableView from "@/_pwa-framework/user-solicitudes/view";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  crear,
  modificar,
  obtenerDatosPorLlave,
} from "@/app/user-interfaces/forms/models/controllers";

function MobiliarioBasico() {
  const [id, setid] = useState<any>(null);
  const navegar = useNavigate();

  const siguiente = () => navegar("/servicios-equipamientos/vehiculos");
  const anterior = () => navegar("/servicios-equipamientos/servicios");
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
                <b>Nota aclaratoria: </b>La información solicitada se refiere al
                mobiliario básico y a equipos que comparten en el hogar si se
                usan cotidianamente, o en caso de necesidad para el bien común
                aunque sean propiedad .
              </Typography>
            ),
            label: "",
            name: "",
            gridValues: { xs: 12, lg: 12, md: 12, sm: 12, xl: 12 },
          },
          {
            type: "component",
            component: () => (
              <Typography variant="h5" sx={{}}>
                Mobiliario básico
              </Typography>
            ),
            label: "",
            name: "",
            gridValues: { xs: 12, lg: 12, md: 12, sm: 12, xl: 12 },
          },
          {
            type: "component",
            component: () => (
              <TableView
                values={[
                  { pat: "Camas", as: <TextField></TextField> },
                  { pat: "Colchones", as: <TextField></TextField> },
                  { pat: "Mesas", as: <TextField></TextField> },
                  { pat: "Sillas", as: <TextField></TextField> },
                  { pat: "Radio", as: <TextField></TextField> },
                  {
                    pat: "Televisor blanco y negro",
                    as: <TextField></TextField>,
                  },
                  { pat: "Televisor colores", as: <TextField></TextField> },
                  { pat: "Caja decodificadora", as: <TextField></TextField> },
                  {
                    pat: "Equipo reproductor de audio/video",
                    as: <TextField></TextField>,
                  },
                  {
                    pat: "Cocina u hornilla eléctrica",
                    as: <TextField></TextField>,
                  },
                  {
                    pat: "Refrigerador / Nevera",
                    as: <TextField></TextField>,
                  },
                  {
                    pat: "Lavadora",
                    as: <TextField></TextField>,
                  },
                  {
                    pat: "Calentador fijo de agua (Electricidad)",
                    as: <TextField></TextField>,
                  },
                  {
                    pat: "Calentador fijo de agua (Solar)",
                    as: <TextField></TextField>,
                  },
                  {
                    pat: "Calentador fijo de agua (Gas)",
                    as: <TextField></TextField>,
                  },
                  {
                    pat: "Ducha eléctrica",
                    as: <TextField></TextField>,
                  },
                  {
                    pat: "Batidora / Licuadora",
                    as: <TextField></TextField>,
                  },
                  {
                    pat: "Olla arrocera / multi-propósito",
                    as: <TextField></TextField>,
                  },
                  {
                    pat: "Horno microonda",
                    as: <TextField></TextField>,
                  },
                  {
                    pat: "Plancha eléctrica",
                    as: <TextField></TextField>,
                  },
                  {
                    pat: "Ventilador",
                    as: <TextField></TextField>,
                  },
                  {
                    pat: "Aire acondicionado / Split",
                    as: <TextField></TextField>,
                  },
                  {
                    pat: "Teléfono fijo",
                    as: <TextField></TextField>,
                  },
                ]}
                headers={[
                  { name: "pat", label: "Muebles/Equipos" },
                  { name: "as", label: "Cuantos" },
                ]}
                idKey="idhogarmobiliario"
                title=""
                multiSelect={true}
              />
            ),
            label: "",
            name: "",
            gridValues: { xs: 12, lg: 12, md: 12, sm: 12, xl: 12 },
          },
        ]}
        title="Mobiliario básico y equipos funcionando"
        description=""
        endpointPath="persona"
        showSpecificDescription={false}
        idForEdit={id}
        saveButton="Guardar"
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
      />
    </>
  );
}

export default MobiliarioBasico;
