import { Grain, Handyman } from "@mui/icons-material";

import { CustomTree } from "@/_pwa-framework/components/tree/tree.component";
import GenericForm from "@/_pwa-framework/genforms/components/form-components/form.generic";
import Meta from "@/_pwa-framework/components/Meta";
import { Typography } from "@mui/material";
import { formulario5 } from "@/app/user-interfaces/forms/forms.config";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  crear,
  modificar,
  obtenerDatosPorLlave,
} from "@/app/user-interfaces/forms/models/controllers";

function Materiales() {
  const navegar = useNavigate();

  const siguiente = () => navegar("/servicios-equipamientos/afectaciones");
  const anterior = () => navegar("/adolecentes");
  const [id, setid] = useState<any>(null);
  return (
    <>
      <Meta title="Controles" />

      <GenericForm
        name="test"
        controls={[
          {
            type: "component",
            component: () => (
              <Typography sx={{ mt: -3 }}>
                <b>Nota aclaratoria:</b>La información solicitada aplica a la
                vivienda o a la parte de ella que ocupa el hogar
              </Typography>
            ),
            label: "",
            name: "",
            gridValues: { xs: 12, lg: 12, md: 12, sm: 12, xl: 12 },
          },
          ...formulario5,

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
        title="Materiales predominates de la vivienda"
        description=""
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
        nextButton={{ text: "Siguiente", action: siguiente }}
        prevButton={{ text: "Anterior", action: anterior }}
      />
    </>
  );
}

export default Materiales;
const folder = [
  {
    value: "nome1",
    label: "Materiales Predominantes",
    children: [
      {
        value: "nom2e",
        label: "Techo",
        children: [
          { value: "a", label: "Hormigón armado o losa prefabricada" },
          { value: "b", label: "Viga y losa" },
          { value: "c", label: "Tejas de barro" },
          { value: "d", label: "Tejas de PVC o plástico, fibrocen, metálicas" },
          { value: "e", label: "Fibroasfalto o cartón techo" },
          { value: "f", label: "Guano" },
          { value: "g", label: "Otro material" },
        ],
      },
      {
        value: "nom3e",
        label: "Soportería y vigas",
        children: [
          { value: "h", label: "Hormigón armado " },
          { value: "i", label: "Acero o metálica" },
          { value: "j", label: "Madera" },
        ],
      },
      {
        value: "nom4e",
        label: "Paredes exteriores",
        children: [
          { value: "k", label: "Hormigón prefabricado" },
          { value: "l", label: " Mampostería, bloques y ladrillos " },
          { value: "m", label: "Madera " },
          { value: "n", label: "Tabla de Palma " },
          { value: "o", label: " Adobe o embarre" },
          { value: "p", label: "Otros " },
        ],
      },
      {
        value: "nom5e",
        label: "Piso",
        children: [
          { value: "q", label: "Mármol, Granito" },
          { value: "r", label: " Losa cerámica, mosaico, baldosas " },
          { value: "s", label: "Cemento Pulido " },
          { value: "t", label: "Tabla de Palma " },
          { value: "u", label: " Madera " },
          { value: "w", label: "Tierra " },
        ],
      },
    ],
  },
];
