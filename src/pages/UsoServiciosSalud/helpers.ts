import { datico } from "@/app/user-interfaces/forms/models/model";
import { getHogar } from "@/app/hogarController/hogar.controller";
import { obtenerDatosPorLlave } from "@/app/user-interfaces/forms/models/controllers";

export const obtenerMiembroPorEncuesta = async (id: string) => {
  const intId = typeof id === "string" ? parseInt(id) : id;
  const datos_encuesta = await obtenerDatosPorLlave(
    "dat_miembroencuesta",
    "idmiembrohogar",
    id
  );
  const datos_hogar = await obtenerDatosPorLlave(
    "dat_hogar",
    "idcodigohogar",
    parseInt(getHogar() ?? "")
  );

  return datos_hogar?.[0]?.problemasalud
    ? datos_encuesta[0]
      ? {
          problemasalud: datos_hogar[0]?.problemasalud,
          atendido: datos_encuesta[0].atendido,
          
          idmiembrohogar: [id.toString()],
        }
      : {
          problemasalud: datos_hogar[0]?.problemasalud,
          atendido: [],
          editMode: false,
          idmiembrohogar: [id.toString()],
        }
    : {
        idmiembrohogar: [id.toString()],
        atendido: [],
        problemasalud: ["9832"],
        editMode: false,
      };
};

export const obtenerMotivoNoAtencion = async (
  id: number,
  motivo: any,
  respuestaMotivos: any,
  setConfiguracionRespuestaMotivos: any
) => {
  const dat_motivos = await datico.dat_motivonoatencion
    .where({ idmotivo: motivo.idconcepto, idmiembrohogar: id.toString() })
    .toArray();
  let datos;
  if (dat_motivos?.length) {
    datos = { idrespuesta: dat_motivos[0].idrespuesta, editMode: true };
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
