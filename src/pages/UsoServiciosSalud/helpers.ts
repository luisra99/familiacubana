import { datico } from "@/app/user-interfaces/forms/models/model";
import { getHogar } from "@/app/hogarController/hogar.controller";
import { obtenerDatosPorLlave } from "@/app/user-interfaces/forms/models/controllers";

export const obtenerMiembroPorEncuesta = async (id: string) => {
  const datos_hogar = await obtenerDatosPorLlave(
    "dat_hogar",
    "idcodigohogar",
    parseInt(getHogar() ?? "")
  );

  if (id == "0") {
    return {
      problemasalud: datos_hogar[0]?.problemasalud,
      atendido: [],
      editMode: false,
      idmiembrohogar: [],
    };
  }
  const datos_encuesta = await obtenerDatosPorLlave(
    "dat_miembroencuesta",
    "idmiembrohogar",
    id
  );

  console.log("raul", datos_hogar, datos_encuesta);
  return datos_hogar?.[0]?.problemasalud
    ? datos_encuesta[0]
      ? {
          problemasalud: ["9832"],
          atendido: datos_encuesta[0].atendido,
          idmiembrohogar: [datos_encuesta[0].idmiembrohogar],
        }
      : {
          problemasalud: ["9832"],
          atendido: [],
          editMode: false,
          idmiembrohogar: [id],
        }
    : {
        idmiembrohogar: [id],
        atendido: [],
        problemasalud: ["9832"],
        editMode: false,
      };
};

export const obtenerMotivoNoAtencion = async (
  id: string,
  motivo: any,
  respuestaMotivos: any,
  setConfiguracionRespuestaMotivos: any
) => {
  const dat_motivos = await datico.dat_motivonoatencion
    .where({ idmotivo: motivo.idconcepto, idmiembrohogar: id.toString() })
    .toArray();
  let datos;
  if (dat_motivos?.length) {
    datos = { idrespuesta: [dat_motivos[0].idrespuesta], editMode: true };
    setConfiguracionRespuestaMotivos((prev: any) => {
      prev[motivo.idconcepto] = {
        ...prev[motivo.idconcepto],

        idmotivo: motivo.idconcepto,
        idrespuesta: `${dat_motivos[0].idrespuesta}`,
      };
      return prev;
    });
  } else {
    setConfiguracionRespuestaMotivos((prev: any) => {
      delete prev[motivo.idconcepto];
      return prev;
    });
    datos = {
      idrespuesta: "",
      editMode: false,
    };
  }

  return datos;
};
