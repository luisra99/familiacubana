import { IGenericControls } from "@/_pwa-framework/genforms/types/controls/controls.types";

export const nombre: IGenericControls = {
  type: "text",
  label: "Nombre",
  name: "pnombre",
  pattern: /[A-z]/,
  gridValues: { xs: 6, lg: 6, md: 6, sm: 6, xl: 6 },
};

export const primerApellido: IGenericControls = {
  type: "text",
  label: "Primer apellido",
  name: "papellido",
  pattern: /[A-z]/,
  gridValues: { xs: 6, lg: 6, md: 6, sm: 6, xl: 6 },
};

export const segundoApellido: IGenericControls = {
  type: "text",
  label: "Segundo apellido",
  name: "sapellido",
  pattern: /[A-z]/,
  gridValues: { xs: 6, lg: 6, md: 6, sm: 6, xl: 6 },
};

export const segundoNombre: IGenericControls = {
  type: "text",
  label: "Segundo nombre",
  name: "snombre",
  pattern: /[A-z]/,
  gridValues: { xs: 6, lg: 6, md: 6, sm: 6, xl: 6 },
};

export const CI: IGenericControls = {
  type: "text",
  label: "Carnet de identidad",
  name: "cidentidad",
  gridValues: { xs: 6, lg: 6, md: 6, sm: 6, xl: 6 },
  pattern: /[0-9]/,
};

export const Edad: IGenericControls = {
  type: "text",
  label: "Edad",
  gridValues: { xs: 6, lg: 6, md: 6, sm: 6, xl: 6 },
  name: "edad",
  pattern: /[]/,
  validations: { length: { value: 2, message: "Edad estimada en su CI" } },
};

export const colorDePiel: IGenericControls = {
  type: "select",
  label: "Color de piel",
  name: "idcolorpiel",
  gridValues: { xs: 6, lg: 6, md: 6, sm: 6, xl: 6 },
  url: "9280",
};

export const EscanerCI: IGenericControls = {
  type: "text",
  label: "Escanear Qr del carnet de identidad",
  gridValues: { xs: 6, lg: 6, md: 6, sm: 6, xl: 6 },
  name: "dirscan",
};

export const FotoCi: IGenericControls = {
  type: "text",
  label: "Foto del carnet de identidad",
  name: "fotocarne",
  gridValues: { xs: 6, lg: 6, md: 6, sm: 6, xl: 6 },
};

export const Sexo: IGenericControls = {
  type: "select",
  label: "Sexo",
  name: "idsexo",
  gridValues: { xs: 6, lg: 6, md: 6, sm: 6, xl: 6 },
  url: "9284",
};

export const parentesco: IGenericControls = {
  type: "select",
  label: "Parentesco",
  gridValues: { xs: 12, lg: 6, md: 12, sm: 12, xl: 12 },
  name: "idparentesco",
  url: "9269",
};

export const orientacionSexual: IGenericControls = {
  type: "select",
  label: "Orientación sexual",
  gridValues: { xs: 6, lg: 6, md: 6, sm: 6, xl: 6 },
  name: "idorientacionsex",
  url: "",
};

export const nivelDeEstudio: IGenericControls = {
  type: "radio",
  label: "¿Cuál es el nivel de estudio más alto que terminó?",
  gridValues: { xs: 6, lg: 6, md: 6, sm: 6, xl: 4 },
  name: "idnivelescolar",
  radios: [
    { idconcepto: "opt1", denominacion: "Ninguno" },
    { idconcepto: "opt2", denominacion: "Primaria" },
    { idconcepto: "opt3", denominacion: "Secundaria básica" },
    { idconcepto: "opt4", denominacion: "Obrero calificado" },
    { idconcepto: "opt5", denominacion: "Preuniversitario" },
    { idconcepto: "opt6", denominacion: "Pedagogía nivel medio" },
    { idconcepto: "opt7", denominacion: "Técnico medio" },
    { idconcepto: "opt8", denominacion: "Técnico superior" },
    { idconcepto: "opt9", denominacion: "Universitario" },
  ],
};

export const Ninguno: IGenericControls = {
  type: "radio",
  label: "¿Cual es el grado de estudio más alto que aprobó?",
  gridValues: { xs: 6, lg: 6, md: 6, sm: 6, xl: 4 },
  name: "idgradovencido1",
  radios: [{ idconcepto: "o1", denominacion: "Primaria" }],
  hidden: (values: any) => values.idnivelescolar !== "opt1",
};

export const Primaria: IGenericControls = {
  type: "radio",
  label: "¿Cual es el grado de estudio más alto que aprobó?",
  gridValues: { xs: 6, lg: 6, md: 6, sm: 6, xl: 4 },
  name: "idgradovencido1",
  radios: [
    { idconcepto: "o2", denominacion: "Secundaria básica" },
    { idconcepto: "o3", denominacion: "Obrero calificado" },
  ],
  hidden: (values: any) => values.idnivelescolar !== "opt2",
};

export const secundariaBasica: IGenericControls = {
  type: "radio",
  label: "¿Cual es el grado de estudio más alto que aprobó?",
  gridValues: { xs: 6, lg: 6, md: 6, sm: 6, xl: 4 },
  name: "idgradovencido1",
  radios: [
    { idconcepto: "o4", denominacion: "Preuniversitario" },
    { idconcepto: "o5", denominacion: "Obrero calificado" },
    { idconcepto: "o6", denominacion: "Pedagogía nivel medio" },
  ],
  hidden: (values: any) => values.idnivelescolar !== "opt3",
};

export const Obrerocalificado: IGenericControls = {
  type: "radio",
  label: "¿Cual es el grado de estudio más alto que aprobó?",
  gridValues: { xs: 6, lg: 6, md: 6, sm: 6, xl: 4 },
  name: "idgradovencido1",
  radios: [],
  hidden: (values: any) => values.idnivelescolar !== "",
};

export const Preuniversitario: IGenericControls = {
  type: "radio",
  label: "¿Cual es el grado de estudio más alto que aprobó?",
  gridValues: { xs: 6, lg: 6, md: 6, sm: 6, xl: 4 },
  name: "idgradovencido1",
  radios: [{ idconcepto: "o7", denominacion: "Universidad" }],
  hidden: (values: any) => values.idnivelescolar !== "opt5",
};

export const Pedagogíanivelmedio: IGenericControls = {
  type: "radio",
  label: "¿Cual es el grado de estudio más alto que aprobó?",
  gridValues: { xs: 6, lg: 6, md: 6, sm: 6, xl: 4 },
  name: "idgradovencido1",
  radios: [
    { idconcepto: "o8", denominacion: "Técnico superior" },
    { idconcepto: "o9", denominacion: "Universidad" },
  ],
  hidden: (values: any) => values.idnivelescolar !== "opt6",
};

export const Tecnicomedio: IGenericControls = {
  type: "radio",
  label: "¿Cual es el grado de estudio más alto que aprobó?",
  gridValues: { xs: 6, lg: 6, md: 6, sm: 6, xl: 4 },
  name: "idgradovencido1",
  radios: [{ idconcepto: "o10", denominacion: "Universidad" }],
  hidden: (values: any) => values.idnivelescolar !== "opt7",
};

export const Tecnicosuperior: IGenericControls = {
  type: "radio",
  label: "¿Cual es el grado de estudio más alto que aprobó?",
  gridValues: { xs: 6, lg: 6, md: 6, sm: 6, xl: 4 },
  name: "idgradovencido1",
  radios: [{ idconcepto: "o11", denominacion: "Universidad" }],
  hidden: (values: any) => values.idnivelescolar !== "opt8",
};

export const Universitario: IGenericControls = {
  type: "radio",
  label: "¿Cual es el grado de estudio más alto que aprobó?",
  gridValues: { xs: 6, lg: 6, md: 6, sm: 6, xl: 4 },
  name: "idgradovencido1",
  radios: [],
  hidden: (values: any) => values.idnivelescolar !== "",
};

export const gradoPrimaria: IGenericControls = {
  type: "radio",
  label: "Grado",
  gridValues: { xs: 6, lg: 6, md: 6, sm: 6, xl: 4 },
  name: "idgrado",
  radios: [
    { idconcepto: "op1", denominacion: "1" },
    { idconcepto: "op2", denominacion: "2 " },
    { idconcepto: "op3", denominacion: "3 " },
    { idconcepto: "op4", denominacion: "4" },
    { idconcepto: "op5", denominacion: "5" },
    { idconcepto: "op6", denominacion: "6" },
  ],
  hidden: (values: any) =>
    values.idgradovencido1 !== "o1" || values.idnivelescolar !== "opt1",
};

export const gradoSecundaria: IGenericControls = {
  type: "radio",
  label: "Grado",
  gridValues: { xs: 6, lg: 6, md: 6, sm: 6, xl: 4 },
  name: "idgrado",
  radios: [
    { idconcepto: "op7", denominacion: "7" },
    { idconcepto: "op8", denominacion: "8 " },
    { idconcepto: "op9", denominacion: "9 " },
  ],
  hidden: (values: any) =>
    values.idgradovencido1 !== "o2" || values.idnivelescolar !== "opt2",
};

export const gradoObreroCalificado: IGenericControls = {
  type: "radio",
  label: "Grado",
  gridValues: { xs: 6, lg: 6, md: 6, sm: 6, xl: 4 },
  name: "idgrado",
  radios: [
    { idconcepto: "op10", denominacion: "1" },
    { idconcepto: "op11", denominacion: "2 " },
    { idconcepto: "op12", denominacion: "3 " },
    { idconcepto: "op13", denominacion: "4 " },
  ],
  hidden: (values: any) => values.idgradovencido1 !== "o3",
};

export const gradoPreuniversitario: IGenericControls = {
  type: "radio",
  label: "Grado",
  gridValues: { xs: 6, lg: 6, md: 6, sm: 6, xl: 4 },
  name: "idgrado",
  radios: [
    { idconcepto: "op14", denominacion: "10" },
    { idconcepto: "op15", denominacion: "11" },
    { idconcepto: "op16", denominacion: "12" },
  ],
  hidden: (values: any) => values.idgradovencido1 !== "o4",
};

export const gradoPedagogiaNivelMedio: IGenericControls = {
  type: "radio",
  label: "Grado",
  gridValues: { xs: 6, lg: 6, md: 6, sm: 6, xl: 4 },
  name: "idgrado",
  radios: [
    { idconcepto: "op17", denominacion: "1 " },
    { idconcepto: "op18", denominacion: "2 " },
    { idconcepto: "op19", denominacion: "3 " },
    { idconcepto: "op20", denominacion: "4 " },
  ],
  hidden: (values: any) => values.idgradovencido1 !== "o5",
};

export const gradoTecnicoMedio: IGenericControls = {
  type: "radio",
  label: "Grado",
  gridValues: { xs: 6, lg: 6, md: 6, sm: 6, xl: 4 },
  name: "idgrado",
  radios: [
    { idconcepto: "op21", denominacion: "1 " },
    { idconcepto: "op22", denominacion: "2 " },
    { idconcepto: "op23", denominacion: "3 " },
  ],
  hidden: (values: any) => values.idgradovencido1 !== "o6",
};

export const gradoUniversitario: IGenericControls = {
  type: "radio",
  label: "Grado",
  gridValues: { xs: 6, lg: 6, md: 6, sm: 6, xl: 4 },
  name: "idgrado",
  radios: [
    { idconcepto: "op24", denominacion: "1 " },
    { idconcepto: "op25", denominacion: "2 " },
    { idconcepto: "op26", denominacion: "3 " },
    { idconcepto: "op27", denominacion: "4 " },
    { idconcepto: "op28", denominacion: "5 " },
    { idconcepto: "op29", denominacion: "6 " },
    { idconcepto: "op30", denominacion: "Técnico superior " },
  ],
  hidden: (values: any) =>
    values.idgradovencido1 !== "o7" || values.idgradovencido1 !== "opt1",
};

export const registroDeConsumidores: IGenericControls = {
  type: "select",
  label: "¿Miembro en el registro de consumidores?",
  gridValues: { xs: 12, lg: 6, md: 12, sm: 12, xl: 12 },
  name: "registroconsum",
  options: [
    { idconcepto: "opt1", denominacion: "Si" },
    { idconcepto: "opt2", denominacion: "No" },
  ],
};

export const datosMoviles: IGenericControls = {
  type: "select",
  label: "¿Tiene plan de datos en el teléfono móvil?",
  gridValues: { xs: 12, lg: 6, md: 12, sm: 12, xl: 12 },
  name: "datosmoviles",
  options: [
    { idconcepto: "opt1", denominacion: "Si" },
    { idconcepto: "opt2", denominacion: "No" },
  ],
};

export const embarazada: IGenericControls = {
  type: "select",
  label: "Se encuentra embarazada",
  gridValues: { xs: 3, lg: 3, md: 3, sm: 3, xl: 3 },
  name: "estaembarazada",
  hidden: (values: any) => values.idsexo != "9285",
  options: [
    { idconcepto: "opt1", denominacion: "Si" },
    { idconcepto: "opt2", denominacion: "No" },
  ],
};

export const lactando: IGenericControls = {
  type: "select",
  label: "Se encuentra lactando",
  gridValues: { xs: 3, lg: 3, md: 3, sm: 3, xl: 3 },
  name: "lactando",
  options: [
    { idconcepto: "opt1", denominacion: "Si" },
    { idconcepto: "opt2", denominacion: "No" },
  ],
  hidden: (values: any) => values.idsexo != "9285",
};

export const madreantes: IGenericControls = {
  type: "select",
  label: "Fue madre antes de los 19",
  gridValues: { xs: 3, lg: 3, md: 3, sm: 3, xl: 3 },
  name: "madremenor19",
  options: [
    { idconcepto: "opt1", denominacion: "Si" },
    { idconcepto: "opt2", denominacion: "No" },
  ],
  hidden: (values: any) => values.idsexo != "9285",
};

export const cantidadHijos: IGenericControls = {
  type: "text",
  label: "Cantidad de hijos",
  pattern: /[0-9]/,
  gridValues: { xs: 3, lg: 3, md: 3, sm: 3, xl: 3 },
  name: "cantidadHijos",
  validations: {
    length: { value: 2, message: "Cantidad de Hijos" },
  },
  hidden: (values: any) => values.idsexo != "9285",
};
