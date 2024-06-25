import { FilePresent, HelpCenter, RemoveRedEye } from "@mui/icons-material";

import { ISpeedDialActions } from "@/_pwa-framework/speedDial/types";

export const actions: ISpeedDialActions = [
  {
    icon: HelpCenter,
    name: "Ayuda",
    action: () => console.log("Función del dial"),
  },
  {
    icon: RemoveRedEye,
    name: "Observaciones",
    action: () => console.log("Función del dial"),
  },
  {
    icon: FilePresent,
    name: `ICS_H`,
    action: () => console.log("Función del dial"),
  },
  {
    icon: FilePresent,
    name: "Guia",
    action: () => console.log("Función del dial"),
  },
  {
    icon: FilePresent,
    name: "Estado de la caracterización",
    action: () => console.log("Función del dial"),
    modal: "estadoEntrevista",
  },
];
