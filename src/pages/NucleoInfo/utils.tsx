import { Divider, Typography } from "@mui/material";

import { IGenericControls } from "@/_pwa-framework/genforms/types/controls/controls.types";
import { parseQrToCi } from "@/utils/parse/qr-to-ci";
import { calcularEdadByCi } from "./NucleoInfo";

export const pnombre: IGenericControls = {
  type: "text",
  label: "Nombre",
  name: "pnombre",
  pattern: /[A-z]/,
  gridValues: { xl: 6, lg: 6, md: 6, sm: 12, xs: 12 },
  validations: { required: { message: "Este campo es obligatorio" } },
};
export const snombre: IGenericControls = {
  type: "text",
  label: "Segundo nombre",
  name: "snombre",
  pattern: /[A-z]/,
  gridValues: { xl: 6, lg: 6, md: 6, sm: 12, xs: 12 },
};
export const papellido: IGenericControls = {
  type: "text",
  label: "Primer apellido",
  name: "papellido",
  pattern: /[A-z]/,
  gridValues: { xl: 6, lg: 6, md: 6, sm: 12, xs: 12 },
  validations: { required: { message: "Este campo es obligatorio" } },
};
export const sapellido: IGenericControls = {
  type: "text",
  label: "Segundo apellido",
  name: "sapellido",
  pattern: /[A-z]/,
  gridValues: { xl: 6, lg: 6, md: 6, sm: 12, xs: 12 },
  validations: { required: { message: "Este campo es obligatorio" } },
};
export const cidentidad: IGenericControls = {
  type: "text",
  label: "Carnet de identidad",
  name: "cidentidad",
  gridValues: { xl: 5, lg: 5, md: 5, sm: 11, xs: 11 },
  pattern: /[0-9]/,
  validations: {
    required: { message: "Campo obligatorio" },
    regex: {
      value: /[0-9]{2}(?:0[0-9]|1[0-2])(?:0[1-9]|[12][0-9]|3[01])[0-9]{5}/,
      message: "Número inválido",
    },
    length: { value: 11, message: "Este campo es obligatorio" },
  },
};
export const edad: IGenericControls = {
  type: "number",
  label: "Edad",
  gridValues: { xl: 4, lg: 4, md: 4, sm: 12, xs: 12 },
  name: "edad",
  format: "other",
};
export const idcolorpiel: IGenericControls = {
  type: "select",
  label: "Color de piel",
  name: "idcolorpiel",
  gridValues: { xl: 6, lg: 6, md: 6, sm: 12, xs: 12 },
  url: "9280",
  validations: {
    required: { message: "Este campo es obligatorio" },
  },
};
export const nota: IGenericControls = {
  type: "component",
  component: () => (
    <Typography>
      <span>Nota aclaratoria:</span>
      <br></br>. El parentesco se establece con relación al jefe(a) de hogar
      <br></br>. Si al preguntar el sexo la persona no responde femenino o
      masculino selecciona la opción correspondiente en{" "}
      <i>Orientación sexual</i>
      <br></br>.  Si es posible, respetuosamente, indagar qué otro elige y  escribir en el campo de las observaciones
    </Typography>
  ),
  label: "",
  name: "",
  gridValues: { xs: 12, lg: 12, md: 12, sm: 12, xl: 12 },
};
export const divider: IGenericControls = {
  type: "component",
  component: () => <Divider sx={{ mt: 0, mb: 1 }} />,
  label: "",
  name: "",
  gridValues: { xs: 12, lg: 12, md: 12, sm: 12, xl: 12 },
};
export const otrosDatos: IGenericControls = {
  type: "component",
  component: () => (
    <Typography>
      <b>Otros datos</b>
    </Typography>
  ),
  label: "",
  name: "",
  gridValues: { xs: 12, lg: 12, md: 12, sm: 12, xl: 12 },
};
export const titleEscolaridad: IGenericControls = {
  type: "component",
  component: () => (
    <Typography>
      <b>Datos de escolaridad</b>
    </Typography>
  ),
  label: "",
  name: "",
  gridValues: { xs: 12, lg: 12, md: 12, sm: 12, xl: 12 },
};
export const scanner: IGenericControls = {
  type: "scanner",
  name: "scan",
  closeOnScan: true,
  label: "scan",
  parseFunction: parseQrToCi,
};
export const datosGeneralesTitle: IGenericControls = {
  type: "component",
  component: () => (
    <Typography>
      <b>Datos generales</b>
    </Typography>
  ),
  label: "",
  name: "",
  gridValues: { xs: 12, lg: 12, md: 12, sm: 12, xl: 12 },
};
export const abrevNomenclador: any = {
  // parentesco
  "9270": "JN",
  "9271": "P",
  "9272": "M",
  "9273": "H",
  "9274": "N",
  "9275": "HE",
  "9276": "S",
  "9277": "NY",
  "9278": "OF",
  "9279": "NF",
  "10239": "E",
  // color piel
  "9281": "B",
  "9282": "N",
  "9283": "M",
  // sexo
  "9285": "F",
  "9286": "M",
  // escolaridad
  "9696": "N",
  "9697": "P",
  "9698": "SB",
  "9699": "OC",
  "9700": "PU",
  "9701": "PNM",
  "9702": "TM",
  "9704": "TS",
  "9705": "U",
};
export const idsexo: IGenericControls = {
  type: "select",
  label: "Sexo",
  name: "idsexo",
  gridValues: { xl: 4, lg: 4, md: 4, sm: 12, xs: 12 },
  url: "9284",
  validations: { required: { message: "Este campo es obligatorio" } },
};
export const idorientacionsex: IGenericControls = {
  type: "select",
  label: "Orientación sexual",
  gridValues: { xl: 4, lg: 4, md: 4, sm: 12, xs: 12 },
  name: "idorientacionsex",
  url: "10210",
};
export const registroconsum: IGenericControls = {
  type: "select",
  label: "¿Miembro en el registro de consumidores?",
  gridValues: { xl: 6, lg: 6, md: 6, sm: 12, xs: 12 },
  name: "registroconsum",
  options: [
    { idconcepto: "1", denominacion: "Sí" },
    { idconcepto: "2", denominacion: "No" },
  ],
  validations: {
    required: { message: "Este campo es obligatorio" },
  },
};
export const datosmoviles: IGenericControls = {
  type: "select",
  label: "¿Tiene plan de datos en el teléfono móvil?",
  gridValues: { xl: 6, lg: 6, md: 6, sm: 12, xs: 12 },
  name: "datosmoviles",
  options: [
    { idconcepto: "1", denominacion: "Sí" },
    { idconcepto: "2", denominacion: "No" },
  ],
  validations: {required: {message:"Este campo es obligatorio"}}
};
export const embarazada: IGenericControls = {
  type: "select",
  label: "¿Se encuentra embarazada?",
  gridValues: { xl: 3, lg: 3, md: 3, sm: 12, xs: 12 },
  name: "estaembarazada",
  hidden: (values: any) => values.idsexo != "9285",
  options: [
    { idconcepto: "1", denominacion: "Sí" },
    { idconcepto: "2", denominacion: "No" },
  ],
  validations: {required:{message:"Este campo es obligatorio", when:{name:"idsexo", expression:(value)=>value[0]=="1"}}}
};
export const lactando: IGenericControls = {
  type: "select",
  label: "¿Se encuentra lactando?",
  gridValues: { xl: 3, lg: 3, md: 3, sm: 12, xs: 12 },
  name: "lactando",
  options: [
    { idconcepto: "1", denominacion: "Sí" },
    { idconcepto: "2", denominacion: "No" },
  ],
  hidden: (values: any) => values.idsexo != "9285",
  validations: {required:{message:"Este campo es obligatorio", when:{name:"idsexo", expression:(value)=>value[0]=="1"}}}
};
export const madremenor19: IGenericControls = {
  type: "select",
  label: "¿Fue madre antes de los 19?",
  gridValues: { xl: 3, lg: 3, md: 3, sm: 12, xs: 12 },
  name: "madremenor19",
  options: [
    { idconcepto: "1", denominacion: "Sí" },
    { idconcepto: "2", denominacion: "No" },
  ],
  hidden: (values: any) => {
    const edad = calcularEdadByCi(values.cidentidad);  
    console.log("SEXO",values.idsexo,"edad ", edad);
    return values.idsexo?.[0] != "9285" || (values.idsexo?.[0] == "9285" &&  (edad < 19 || edad > 25))
  },
  validations: { required: { message: "Este campo es obligatorio", when: { name: "idsexo", expression: (value) => value[0] == "1" } } },
  
};
export const cantidadhijos: IGenericControls = {
  type: "text",
  label: "Cantidad de hijos menores de 17 años",
  pattern: /[0-9]/,
  gridValues: { xl: 3, lg: 3, md: 3, sm: 12, xs: 12 },
  name: "cantidadhijos",
  hidden: (values: any) => values.idsexo != "9285",
 // validations: {required:{message:"Este campo es obligatorio", when:{name:"idsexo", expression:(value)=>value[0]=="1"}}}
};
