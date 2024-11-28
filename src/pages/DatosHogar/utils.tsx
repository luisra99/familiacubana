import { Chip } from "@mui/material";
import { IGenericControls } from "@/_pwa-framework/genforms/types/controls/controls.types";
import { datico as db } from "@/app/user-interfaces/forms/models/model";

export async function unionUnidadAlojamiento(arr: any) {
  const join = await Promise.all(
    arr.map(async (obj: any) => {
      const unidaddealojamiento = await db.dat_unidaddealojamiento.get(
        obj.idunidaddealojamiento
      );
      const miembros = await db.dat_miembrohogar
        .where({ idcodigohogar: obj.idcodigohogar.toString() })
        .toArray();
      const cantmiembros = miembros.length;
      const jefeHogar = miembros.find((obj) => {
        return obj?.idparentesco[0] == "9270";
      });
      const jefehogar = jefeHogar ? (
        `${jefeHogar.pnombre} ${
          jefeHogar.papellido
        }`
      ) : (
        <span style={{ color: "red" }}>Pendiente a definir...</span>
      );
      return {
        ...obj,
        ...unidaddealojamiento,
        numero: obj.idcodigohogar,
        detalles: (
          <p style={{ textAlign: "left", width: "max-content" }}>
            <b>Dirección: </b>
            {unidaddealojamiento?.direccion}
            <br />
            <b>Jefe Hogar: </b> {jefehogar}
          </p>
        ),
        cantmiembros: cantmiembros > 0 ? cantmiembros : "",
        jefehogar: jefehogar,
        estado: estados[obj.idestado],
        idEstado: parseInt(obj.idestado),
        estadotext: (
          <Chip
            label={estados[parseInt(obj.idestado)]}
            color={estadoscolor[parseInt(obj.idestado)]}
            // variant="outlined"
          />
        ),
      };
    })
  );
  return join;
}
export const circunscripcion: IGenericControls = {
  type: "text",
  label: "Circunscripción",
  gridValues: { xl: 6, lg: 6, md: 6, sm: 12, xs: 12 },
  name: "circunscripcion",
  pattern: /^[0-9]+$/,
  validations: {
    required: { message: "Este campo es obligatorio" },
    regex: {
      value: /^(?!0)[1-9]\d{0,2}$/,
      message: "Válido para número de 1 a 3 cifras",
    },
  },
};

export const cdr: IGenericControls = {
  type: "text",
  label: "CDR",
  gridValues: { xl: 6, lg: 6, md: 6, sm: 12, xs: 12 },
  name: "cdr",
  pattern: /^[0-9]+$/,
  validations: {
    required: { message: "Este campo es obligatorio" },
    regex: {
      value: /^(?!0)[1-9]\d{0,2}$/,
      message: "Válido para número de 1 a 3 cifras",
    },
  },
};

export const direccion: IGenericControls = {
  type: "text",
  label: "Dirección",
  gridValues: { xl: 12, lg: 12, md: 12, sm: 12, xs: 12 },
  name: "direccion",
  multiline: { minRows: 1 },
  validations: {
    required: { message: "Este campo es obligatorio" },
  },
  // pattern: /^[a-zA-Z0-9]+$/,
};

export const zonaresidencial: IGenericControls = {
  type: "select",
  name: "idzonaresidencia",
  label: "Zona de residencia",
  gridValues: { xl: 4, lg: 4, md: 4, sm: 12, xs: 12 },
  url: "9289",
  validations: {
    required: { message: "Este campo es obligatorio" },
  },
};

export const tipovivienda: IGenericControls = {
  type: "select",
  name: "idtipovivienda",
  label: "Tipo de vivienda",
  gridValues: { xl: 4, lg: 4, md: 4, sm: 12, xs: 12 },
  url: "9292",
  validations: {
    required: { message: "Este campo es obligatorio" },
  },
};

export const asentamiento: IGenericControls = {
  type: "text",
  name: "idasentamiento",
  label: "Asentamiento",
  gridValues: { xl: 4, lg: 4, md: 4, sm: 12, xs: 12 },
};

export const planturquino: IGenericControls = {
  type: "select",
  label: "Plan turquino",
  name: "planturquino",
  gridValues: { xl: 4, lg: 4, md: 4, sm: 12, xs: 12 },
  options: [
    { idconcepto: "1", denominacion: "Sí" },
    { idconcepto: "2", denominacion: "No" },
  ],
  validations: {
    required: { message: "Este campo es obligatorio" },
  },
};

const estados: any = {
  "1": "Creado",
  "2": "En elaboración",
  "3": "Caracterizado",
};
const estadoscolor: any = { 1: "success", 2: "warning", 3: "info" };
