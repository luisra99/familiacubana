import { datico } from "@/app/user-interfaces/forms/models/model";
import { obtenerDatosPorLlave } from "@/app/user-interfaces/forms/models/controllers";

export const obtenerMiembroPorBeneficios = async (id: string) => {
  const datos_polprog = await obtenerDatosPorLlave(
    "dat_polprogsoc",
    "idmiembrohogar",
    id
  );
  return datos_polprog?.length
    ? { ...datos_polprog[0], editMode: true, idmiembrohogar: [id.toString()] }
    : {
        idmiembrohogar: [id.toString()],
        atendido: [],
        problemasalud: [],
        editMode: false,
      };
};

export const obtenerBeneficiosXmiembro = async (id: number, beneficio: any) => {
  const dat_beneficios = await datico.dat_polprogsoc
    .where({ idbeneficio: beneficio.idconcepto, idmiembrohogar: id.toString() })
    .toArray();
  let dat_acceseo: any;
  if (dat_beneficios?.length) {
    dat_acceseo = await datico.dat_estadonoacceso
      .where({
        idbeneficio: beneficio.idconcepto,
        idpolprogsoc: dat_beneficios[0]?.idpolprogsoc,
      })
      .toArray();
  }

  const datos = dat_beneficios?.length
    ? dat_acceseo?.length
      ? {
          conocequeexiste: dat_acceseo[0]?.conocequeexiste,
          entramites: dat_acceseo[0]?.entramites,
          ayudaparaacceder: dat_acceseo[0]?.ayudaparaacceder,
          accede: dat_beneficios[0]?.accede,
          editMode: true,
        }
      : { accede: dat_beneficios[0].accede, editMode: true }
    : {
        idmiembrohogar: [id.toString()],
        idbeneficio: "",
        accede: "",
        conocequeexiste: "",
        entramites: false,
        ayudaparaacceder: false,
        editMode: false,
      };
  return datos;
};
