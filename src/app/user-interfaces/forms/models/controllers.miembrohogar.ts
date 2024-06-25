/** Controlado de la vista hogar */
import { datico as db } from "./model";
import { useLiveQuery } from "dexie-react-hooks";
import { getHogar } from "@/app/hogarController/hogar.controller";

export function obtenerMiembrosHogar(metadata: boolean = false) {
  const idhogar = getHogar();
  return useLiveQuery(() => {    
    const data = db.dat_miembrohogar
      .where({ idcodigohogar: idhogar ?? 0 })
      .toArray();
    return data;
  });
}

export function obtenerMiembrosSelect() {
  const datosMiembros = obtenerMiembrosHogar()?.map((miembro) => {
    const denom = `${miembro.pnombre} ${miembro.snombre} ${miembro.papellido} ${miembro.sapellido}`;
    return {
      idconcepto: miembro.idmiembrohogar,
      denominacion: denom,
    };
  });
  return datosMiembros;
}

export async function obtenerMiembros() {
  const idhogar = getHogar() ?? 0;
  const data = await db.dat_miembrohogar
    .where({ idcodigohogar: idhogar })
    .toArray()
    .then((arr) =>
      arr.map((obj) => {
        const denom = `${obj.pnombre} ${obj.snombre} ${obj.papellido} ${obj.sapellido}`;
        return { idconcepto: obj.idmiembrohogar, denominacion: denom };
      })
    );
  return data;
}
