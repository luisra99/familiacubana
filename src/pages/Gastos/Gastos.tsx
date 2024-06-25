import {
  Divider,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import { AddCircleRounded } from "@mui/icons-material";
import GenericForm from "@/_pwa-framework/genforms/components/form-components/form.generic";
import Meta from "@/_pwa-framework/components/Meta";
import TableView from "@/_pwa-framework/user-solicitudes/view";
import { gastocup } from "@/app/user-interfaces/controls/controls.config.eviel";
import { gastosmensualesdelhogar } from "@/app/user-interfaces/forms/forms.config";
import { useNavigate } from "react-router-dom";
import {
  crear,
  modificar,
  obtenerDatosPorLlave,
} from "@/app/user-interfaces/forms/models/controllers";
import { useState } from "react";

function Gastos() {
  const navegar = useNavigate();
  const [id, setid] = useState<any>(null);
  const siguiente = () => navegar("/estrategia/alimentos");
  const anterior = () => navegar("/servicios-equipamientos/vehiculos");
  return (
    <>
      <Meta title="Gastos" />
      <Typography variant="h6" marginX={""} mt={5}>
        Gastos mensuales del hogar
      </Typography>
      <GenericForm
        name="test"
        controls={[
          {
            type: "component",
            component: () => (
              <Typography sx={{ mt: -4, mb: 2 }}>
                <b>Nota aclaratoria: </b> Preguntar el monto aproximado de
                gastos (en CUP) para los destinos principales. Si la persona
                entrevistada no puede responder el monto, pide que ordene los
                destinos posibles de acuerdo con el peso de los gastos.
              </Typography>
            ),
            label: "",
            name: "",
            gridValues: { xs: 12, lg: 12, md: 12, sm: 12, xl: 12 },
          },
          gastocup,

          {
            type: "component",
            component: () => (
              <TableView
                values={[
                  { pat: "Alimentación", as: <TextField></TextField> },
                  { pat: "Higiene", as: <TextField></TextField> },
                  { pat: "Ropa y calzado", as: <TextField></TextField> },
                  { pat: "Transporte", as: <TextField></TextField> },
                  {
                    pat: "Materiales de la construcción y reparación de la vivienda",
                    as: <TextField></TextField>,
                  },
                  {
                    pat: "Servicios básicos (agua, electricidad, gas y teléfono)",
                    as: <TextField></TextField>,
                  },
                  { pat: "Combustible", as: <TextField></TextField> },
                  { pat: "Medicamentos", as: <TextField></TextField> },
                  { pat: "Créditos bancarios", as: <TextField></TextField> },
                  { pat: "Pago de vivienda", as: <TextField></TextField> },
                ]}
                headers={[
                  { name: "pat", label: "Destino de los gastos principales" },
                  { name: "as", label: "Monto en CUP" },
                ]}
                idKey="idhogasrgasto"
                title=""
                multiSelect={true}
              />
            ),
            label: "",
            name: "",
            gridValues: { xs: 12, lg: 12, md: 12, sm: 12, xl: 12 },
          },
          {
            type: "component",
            component: () => (
              <Stack direction={"row"}>
                <IconButton>
                  <AddCircleRounded />
                </IconButton>
                <FormControl sx={{ width: 300 }} fullWidth>
                  <InputLabel>Destino de los gastos principales</InputLabel>
                  <Select label={"Jefe del Hogar"}>
                    <MenuItem value={`1`} key={`1`}>
                      <InputLabel>Alimentos</InputLabel>
                    </MenuItem>
                  </Select>
                </FormControl>
              </Stack>
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
                  {
                    pat: "1",
                    as: "Alimentación",
                  },
                  {
                    pat: "2",
                    as: "Ropa y calzado",
                  },
                ]}
                headers={[
                  { name: "pat", label: "No" },
                  { name: "as", label: "Destino de los gastos principales" },
                ]}
                idKey="idhogasrgasto"
                title=""
                multiSelect={true}
              />
            ),
            label: "",
            name: "",
            gridValues: { xs: 12, lg: 12, md: 12, sm: 12, xl: 12 },
          },

          {
            type: "component",
            component: () => (
              <Typography sx={{ mt: 2, mb: 2 }}>
                Proporción del gasto total del hogar que se destina a:
              </Typography>
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
          ...gastosmensualesdelhogar,
        ]}
        title=""
        description=""
        endpointPath="persona"
        showSpecificDescription={false}
        setIdFunction={setid}
        submitFunction={(values) => {
          if (id) modificar("dat_hogargastos", "idhogasrgasto", id, values);
          else crear("dat_hogargastos", values);
        }}
        getByIdFunction={(id) =>
          obtenerDatosPorLlave("dat_hogargastos", "idhogasrgasto", id)
        }
        nextButton={{ text: "Siguiente", action: siguiente }}
        prevButton={{ text: "Anterior", action: anterior }}
        saveButton="Guardar"
      />
    </>
  );
}

export default Gastos;
