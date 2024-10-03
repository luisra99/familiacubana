import { FilePresent, HelpCenter } from "@mui/icons-material";

import { ISpeedDialActions } from "@/_pwa-framework/speedDial/types";

export const actions: ISpeedDialActions = [
  {
    icon: HelpCenter,
    name: "Ayuda",
    action: () => {
      window.open(
        "/documentos/Manual de Usuario de prueba del Sistema de Caracterización de la Familia Cubana.pdf"
      );
    },
  },

  {
    icon: FilePresent,
    name: `ICS_H`,
    action: () => {
      window.open("/documentos/Bases_D2_ICS_H.pdf");
    },
  },
  {
    icon: FilePresent,
    name: "Guia",
    action: () => {
      window.open("/documentos/Bases_D3_Guia_ICS_H.pdf");
    },
  },
  {
    icon: FilePresent,
    name: "Estado de la caracterización",
    action: () => console.log("Estado de la caracterización"),
    modal: "estadoEntrevista",
  },
];
