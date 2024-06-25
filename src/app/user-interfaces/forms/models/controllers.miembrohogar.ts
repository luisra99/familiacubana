/** Controlado de la vista hogar */
import Dexie from "dexie";
import { datico as db } from "./model";
import { useLiveQuery } from "dexie-react-hooks";
import { getHogar } from "@/app/hogarController/hogar.controller";

export function obtenerMiembrosHogar(metadata: boolean = false) {
  const idhogar = getHogar();
  return useLiveQuery(() => {
    // return db.dat_miembrohogar.toArray();
    const data = db.dat_miembrohogar
      .where({ idcodigohogar: idhogar ?? 0 })
      .toArray(async (arr) => {
        if (metadata) {
          const colorPielPromise = arr.map((obj: any) =>
            obj.idcolorpiel.length
              ? db.nom_concepto.get(parseInt(obj.idcolorpiel[0]))
              : { denominacion: "" }
          );
          return Dexie.Promise.all([Dexie.Promise.all(colorPielPromise)]).then(
            function (promises) {
              arr.forEach(
                (_obj, i) => (_obj.colorPiel = promises[0][i]?.denominacion)
              );
              return arr;
            }
          );
        } else {
          return arr;
        }
      });
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
