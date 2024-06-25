/** Controlado de la vista hogar */
import { datico as db } from "./model";
import { useLiveQuery } from "dexie-react-hooks";

export function obtenerBeneficios() {
  return useLiveQuery(async () => {
    const prueba = await (db as any)["nom_concepto"]
      .where("idpadre")
      .equals("9442")
      .toArray();
    return prueba;
  });
}

export async function crearHogar(values: any) {
  const idunidaddealojamiento = await db.dat_unidaddealojamiento.put(values);
  db.dat_hogar.put({ ...values, idunidaddealojamiento: idunidaddealojamiento });
}
