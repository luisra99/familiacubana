import { FamiliaCubana, datico } from "./model";

import { getHogar } from "@/app/hogarController/hogar.controller";
import { mode } from "@/_pwa-framework/config";
import { obtenerMiembrosPorHogar } from "./controllers.miembrohogar";

export async function obtenerDatosPorLlave(
  tabla: keyof FamiliaCubana,
  llave: string,
  id: any
): Promise<any[]> {
  await datico.open();
  const data = await (datico as any)[tabla].where(llave).equals(id).toArray();
  mode && console.log("obtenerDatosPorLlave", data);
  return data;
}
export async function obtener(
  tabla: keyof FamiliaCubana,
  args: any
): Promise<any> {
  await datico.open();
  const data = await (datico as any)[tabla].where(args).first();
  return data;
}
export async function obtenerDatosPorLlaveEnHogarActual(
  tabla: keyof FamiliaCubana,
  llave: string,
  id: string,
  hogarKey: string
): Promise<any[]> {
  await datico.open();
  const data = await (datico as any)[tabla]
    .where(llave)
    .equals(id)
    .toArray()
    .filter((dato: any) => dato[hogarKey] == getHogar());
  return data;
}
export async function obtenerPrimeroPorLlaveEnHogarActual(
  tabla: keyof FamiliaCubana,
  llave: string,
  id: string,
  hogarKey: string
): Promise<any> {
  await datico.open();
  mode && console.log("obtenerPrimeroPorLlaveEnHogarActual");
  mode && console.table({ tabla, llave, id, hogarKey });
  const data = await (datico as any)[tabla].where({ [llave]: id }).toArray();
  mode && console.log("obtenerPrimeroPorLlaveEnHogarActual", data);
  return data.filter((item: any) => item[hogarKey] == getHogar()) ?? {};
}

export async function crear(
  tabla: keyof FamiliaCubana,
  data: any
): Promise<any> {
  try {
    const tx = await datico.transaction("rw", tabla, async () => {
      return await (datico as any)[tabla].put(data);
    });
    await tx.complete;
    return tx;
  } catch (error) {
    console.error("Error en crear", error);
  }
}
export async function eliminar(
  tabla: keyof FamiliaCubana,
  idKey: string,
  id: any
): Promise<any> {
  console.log("Eliminando", tabla, idKey, id);
  try {
    const tx = await datico.transaction("rw", tabla, async () => {
      return await (datico as any)[tabla].where({ [idKey]: id }).delete();
    });
    await tx.complete;
    console.info("Eliminado correctamente", tabla);
    return tx;
  } catch (error) {
    console.error("Error en eliminar en", tabla, error);
  }
}

export async function modificar(
  tabla: keyof FamiliaCubana,
  idKey: string,
  id: any,
  values: any
): Promise<any> {
  try {
    const tx = await datico.transaction("rw", tabla, async () => {
      return await (datico as any)[tabla]
        .where(idKey)
        .equals(id)
        .modify(values);
    });
    await tx.complete;
    return tx;
  } catch (error) {
    console.error("Error en modificar", error);
  }
}
export async function CreateOrModify(
  tabla: keyof FamiliaCubana,
  params: Record<string, any>,
  values: any,
  idKey: string
) {
  try {
    const tx = await datico.transaction("rw", tabla, async () => {
      const data = await (datico as any)[tabla].where(params).first();
      console.log("Luis", data);
      if (data) {
        return await (datico as any)[tabla]
          .where(idKey)
          .equals(data[idKey])
          .modify(values);
      } else {
        return await (datico as any)[tabla].put(values);
      }
    });
    await tx.complete;
    return tx;
  } catch (error) {
    console.error("Error en crear o modificar", error);
  }
}

export async function deleteIfExist(
  tabla: keyof FamiliaCubana,
  params: Record<string, any>,
  idKey: string
) {
  try {
    const data = await (datico as any)[tabla].where(params).first();
    if (data) {
      const tx = await datico.transaction("rw", tabla, async () => {
        return await (datico as any)[tabla]
          .where(idKey)
          .equals(data[idKey])
          .delete();
      });
      await tx.complete;
      return tx;
    }
  } catch (error) {
    console.error("Error en delete if exist", error);
  }
}
export async function deleteRowsIfExist(
  tabla: keyof FamiliaCubana,
  params: Record<string, any>,
  idKey: string
) {
  try {
    const data = await (datico as any)[tabla].where(params).toArray();
    if (data) {
      data.forEach(async (element: any) => {
        const tx = await datico.transaction("rw", tabla, async () => {
          return await (datico as any)[tabla]
            .where(idKey)
            .equals(element[idKey])
            .delete();
        });
        await tx.complete;
        return tx;
      });
    }
  } catch (error) {
    console.error("Error en delete if exist", error);
  }
}

export async function vistaMobiliarioBasicoEquipo() {
  datico.open().then(function () {
    return datico.transaction(
      "rw",
      datico.dat_hogar,
      datico.dat_hogarmobiliarioequipos,
      async function (tx) {
        const bandsWithDetails: any[] = [];

        let hogar = await tx.table("dat_hogar").toArray();
        for (let casa of await tx
          .table("dat_hogarmobiliarioequipos")
          .toArray()) {
          const home = hogar.find((g) => g.id === casa.idcodigohogar);
          try {
            const place = await tx
              .table("dat_hogarmobiliarioequipos")
              .where("idcodigohogar")
              .anyOf(casa.idcodigohogar)
              .toArray();
            bandsWithDetails.push({
              direccion: home.direccion,
              idhogarmobiliario: casa.idhogarmobiliario,
              cantidad: casa.cantidad,
              idmobiliarioequipo: casa.idmobiliarioequipo,
              estado: casa.estado,

              ...place,
            });
          } catch (error: any) {
            console.error(error);
          }
        }
      }
    );
  });
}

export async function vistaHogarAfectacionVivienda() {
  datico.open().then(function () {
    return datico.transaction(
      "rw",
      datico.dat_hogar,
      datico.dat_afectacionmatvivienda,
      async function (tx) {
        const bandsWithDetails: any[] = [];

        let hogar = await tx.table("dat_hogar").toArray();
        for (let casa of await tx
          .table("dat_afectacionmatvivienda")
          .toArray()) {
          const home = hogar.find((g) => g.id === casa.idcodigohogar);
          try {
            const place = await tx
              .table("dat_afectacionmatvivienda")
              .where("idcodigohogar")
              .anyOf(casa.idcodigohogar)
              .toArray();
            bandsWithDetails.push({
              direccion: home.direccion,
              idafectacionematerialesvivienda:
                casa.idafectacionematerialesvivienda,
              idafectacion: casa.idafectacion,

              ...place,
            });
          } catch (error: any) {
            console.error(error);
          }
        }
      }
    );
  });
}

export async function vistaSeguridadAlimentaria() {
  datico.open().then(function () {
    return datico.transaction(
      "rw",
      datico.dat_hogar,
      datico.dat_hogardiversidadalimentaria,
      async function (tx) {
        const bandsWithDetails: any[] = [];

        let hogar = await tx.table("dat_hogar").toArray();
        for (let casa of await tx
          .table("dat_hogardiversidadalimentaria")
          .toArray()) {
          const home = hogar.find((g) => g.id === casa.idcodigohogar);
          try {
            const place = await tx
              .table("dat_hogardiversidadalimentaria")
              .where("idcodigohogar")
              .anyOf(casa.idcodigohogar)
              .toArray();
            bandsWithDetails.push({
              direccion: home.direccion,
              idhogardiversidadalimentaria: casa.idhogardiversidadalimentaria,
              losencontro: casa.losencontro,
              legustan: casa.legustan,
              frecuencia: casa.frecuencia,

              ...place,
            });
          } catch (error: any) {
            console.error(error);
          }
        }
      }
    );
  });
}

export async function vistaLocalesVivienda() {
  datico.open().then(function () {
    return datico.transaction(
      "rw",
      datico.dat_hogar,
      datico.dat_localesvivienda,
      async function (tx) {
        const bandsWithDetails: any[] = [];

        let hogar = await tx.table("dat_hogar").toArray();
        for (let casa of await tx.table("dat_localesvivienda").toArray()) {
          const home = hogar.find((g) => g.id === casa.idcodigohogar);
          try {
            const place = await tx
              .table("dat_localesvivienda")
              .where("idcodigohogar")
              .anyOf(casa.idcodigohogar)
              .toArray();
            bandsWithDetails.push({
              direccion: home.direccion,
              cantudormir: casa.cantudormir,
              cantedormir: casa.cantedormir,
              tipousococina: casa.tipousococina,
              cantidadcocina: casa.cantidadcocina,
              idcombustible: casa.idcombustible,
              tienesanitario: casa.tienesanitario,
              idtipousoservicio: casa.idtipousoservicio,
              idtiposanitario: casa.idtiposanitario,

              ...place,
            });
          } catch (error: any) {
            console.error(error);
          }
        }
      }
    );
  });
}

export async function vistaDatosEntrevista() {
  datico.open().then(function () {
    return datico.transaction(
      "rw",
      datico.dat_hogar,
      datico.dat_caracterizacion,
      async function (tx) {
        const bandsWithDetails: any[] = [];

        let hogar = await tx.table("dat_hogar").toArray();
        for (let casa of await tx.table("dat_caracterizacion").toArray()) {
          const home = hogar.find((g) => g.id === casa.idcodigohogar);
          try {
            const place = await tx
              .table("dat_caracterizacion")
              .where("idcodigohogar")
              .anyOf(casa.idcodigohogar)
              .toArray();
            bandsWithDetails.push({
              direccion: home.direccion,
              fechaentrevista: casa.fechaentrev,
              fecharegistro: casa.fregistro,
              identrevistador: casa.identrevistador,
              hinicio: casa.hinicio,
              hfin: casa.hfin,
              tipo: casa.tipo,

              ...place,
            });
          } catch (error: any) {
            console.error(error);
          }
        }
      }
    );
  });
}

export async function vistaDatosDelHogar() {
  datico.open().then(function () {
    return datico.transaction(
      "rw",
      datico.dat_unidaddealojamiento,
      datico.dat_hogar,
      async function (tx) {
        const bandsWithDetails: any[] = [];

        let alojamiento = await tx.table("dat_unidaddealojamiento").toArray();
        for (let casa of await tx.table("dat_hogar").toArray()) {
          const aloja = alojamiento.find(
            (g) => g.id === casa.idunidaddealojamiento
          );

          const house = await tx
            .table("dat_hogar")
            .where("idunidaddealojamiento")
            .anyOf(casa.idunidaddealojamiento)
            .toArray();

          bandsWithDetails.push({
            direccion: aloja.direccion + 1,
            codigo: casa.codigo,
            jefehogar: casa.jefeDelHogar,
            cantMiembros: casa.cantidadDeMiembros,
            idhogar: casa.idcodigohogar,
            ...house,
          });
        }
      }
    );
  });
}

export async function crearNomenclador(
  idpadre: any,
  idconcepto: any,
  denominacion: any,
  hijos?: any
): Promise<void> {
  try {
    await datico
      .open()
      .then(() =>
        (datico as any).nom_concepto.put(
          { idpadre, idconcepto, denominacion, hijos },
          idconcepto
        )
      );
  } catch (error) {
    console.error("Error al guardar el nomenclador:", error);
  }
}

export async function vistaIngresos(): Promise<[]> {
  const casa = await (datico as any)["dat_miembrofuentesingresos"].toArray();
  let conceptos = await (datico as any)["nom_concepto"].toArray();
  casa.map((casa: any) =>
    conceptos.map((concepto: any) => {
      if (Number(casa.idmoneda[0]) === concepto.idconcepto) {
        casa.idmoneda[0] = concepto["denominacion"];
      }
      if (Number(casa.idfuente[0]) === concepto.idconcepto) {
        casa.idfuente[0] = concepto["denominacion"];
      }
    })
  );
  return casa;
}

export async function descartarHogares(idhogar: any) {
  const miembros = await obtenerMiembrosPorHogar(idhogar);
  miembros.forEach(async ({ idconcepto }: any) => {
    await descartarMiembro(idconcepto);
    eliminar("dat_miembrohogar", "idmiembrohogar", idconcepto);
  });
  console.log("Descartar hogares", idhogar);
  eliminar("dat_unidaddealojamiento", "idunidaddealojamiento", idhogar);
  eliminar("dat_hogar", "idcodigohogar", idhogar);
  eliminar("dat_miembrohogar", "idcodigohogar", idhogar.toString());
  eliminar("dat_estadoconstvivienda", "idcodigohogar", idhogar.toString());
  eliminar("dat_afectacionmatvivienda", "idcodigohogar", idhogar.toString());
  eliminar("dat_ubicacionlocales", "idcodigohogar", idhogar.toString());
  eliminar("dat_ubicacionsanitaria", "idcodigohogar", idhogar.toString());
  eliminar("dat_localesvivienda", "idcodigohogar", idhogar.toString());
  eliminar("dat_seviciosvivienda", "idcodigohogar", idhogar.toString());
  eliminar("dat_hogarmobiliarioequipos", "idcodigohogar", idhogar);
  eliminar("dat_hogarmobiliarioequipos", "idcodigohogar", idhogar.toString());
  eliminar(
    "dat_hogardiversidadalimentaria",
    "idcodigohogar",
    idhogar.toString()
  );
  eliminar("dat_hogargastos", "idcodigohogar", idhogar.toString());
  eliminar("dat_hogarestrategias", "idcodigohogar", idhogar.toString());
  eliminar("dat_caracterizacion", "idcodigohogar", idhogar.toString());

  // eliminar("dat_manejosdesechos", "idcodigohogar", idhogar);
  // eliminar("dat_miebrobeneficioprogalim", "idcodigohogar", idhogar);
  // eliminar("dat_miembrobeneficios", "idcodigohogar", idhogar);
  // eliminar("dat_miembrodiscapacidad", "idcodigohogar", idhogar);
  // eliminar("dat_miembroencuesta", "idcodigohogar", idhogar);
  // eliminar("dat_miembroenfbajaprev", "idcodigohogar", idhogar);
  // eliminar("dat_miembroestrategias", "idcodigohogar", idhogar);
  // eliminar("dat_miembrofuentesingresos", "idcodigohogar", idhogar.toString());
  // eliminar("dat_miembroocupacion", "idcodigohogar", idhogar.toString());
  // eliminar("dat_miembropogramas", "idcodigohogar", idhogar);
  // eliminar("dat_miembrosituacionsocial", "idcodigohogar", idhogar);
  // eliminar("dat_motivonoatencion", "idcodigohogar", idhogar);
  // eliminar("dat_nvinculacionmiembro", "idcodigohogar", idhogar);
  // eliminar("dat_remuneraciones", "idcodigohogar", idhogar);
  // eliminar("dat_situacnnaj", "idcodigohogar", idhogar);

  // eliminar("dat_atributo", "idmiembrohogar", idMiembro.toString());
  // eliminar("dat_polprogsoc", "idcodigohogar", idhogar);
  // eliminar("dat_estadonoacceso","idhogar",idhogar)
  // //eliminar("dat_detallesconcepto","idhogar",idhogar)
  // //eliminar("dat_estructura","idhogar",idhogar)
  // //eliminar("dat_matrizrelacional","idhogar",idhogar)
  // //eliminar("dat_nnasitdelictiva","idhogar",idhogar)
  // //eliminar("dat_rolconcepto","idhogar",idhogar)
  // //eliminar("dat_situacionsocialorg","idhogar",idhogar)
  // //eliminar("dat_tiposayuda","idhogar",idhogar)
  // //eliminar("dat_viasacceso","idhogar",idhogar)
  // //eliminar("dat_zonavulnerable","idhogar",idhogar)
}

export async function descartarMiembro(idMiembro: any) {
  console.log("Descartar miembro", idMiembro);

  eliminar(
    "dat_miembrofuentesingresos",
    "idmiembrohogar",
    idMiembro.toString()
  );
  eliminar("dat_miembroocupacion", "idmiembrohogar", [idMiembro.toString()]);
  eliminar("dat_remuneraciones", "idmiembrohogar", idMiembro.toString());
  eliminar("dat_quiencuida", "idmiembrohogar", idMiembro.toString());
  eliminar("dat_nvinculacionmiembro", "idmiembrohogar", idMiembro.toString());
  eliminar("dat_nnaocupacion", "idmiembrohogar", [idMiembro.toString()]);
  eliminar("dat_situacnnaj", "idmiembrohogar", [idMiembro.toString()]);
  eliminar("dat_miembroaditamentos", "idmiembrohogar", idMiembro);
  eliminar("dat_miembrogradoautonomia", "idmiembrohogar", idMiembro.toString());
  eliminar("dat_miembroenfcronicas", "idmiembrohogar", idMiembro.toString());
  eliminar("dat_miembrobeneficios", "idmiembrohogar", idMiembro.toString());
  eliminar("dat_miembroenfbajaprev", "idmiembrohogar", idMiembro.toString());
  eliminar("dat_viasacceso", "idmiembrohogar", idMiembro.toString());
  eliminar("dat_motivonoatencion", "idmiembrohogar", idMiembro.toString());
  eliminar("dat_hogar", "idmiembrohogar", idMiembro.toString());
  eliminar("dat_miembroencuesta", "idmiembrohogar", idMiembro.toString());
  eliminar("dat_estadonoacceso", "idmiembrohogar", idMiembro.toString());
  eliminar("dat_polprogsoc", "idmiembrohogar", idMiembro.toString());
  eliminar("dat_situacionsocialorg", "idmiembrohogar", idMiembro.toString());
  eliminar(
    "dat_miembrosituacionsocial",
    "idmiembrohogar",
    idMiembro.toString()
  );
  eliminar(
    "dat_miebrobeneficioprogalim",
    "idmiembrohogar",
    idMiembro.toString()
  );
  eliminar("dat_miembrohogar", "idmiembrohogar", idMiembro);
  eliminar("dat_miembroestrategias", "idmiembrohogar", idMiembro.toString());

  eliminar("dat_causadesvnnaj", "idmiembrohogar", [idMiembro.toString()]);
  console.log("[idMiembro.toString()]", [idMiembro.toString()]);
  eliminar("dat_nnasitdelictiva", "idmiembrohogar", [idMiembro.toString()]);
  // eliminar("dat_caracterizacion", "idmiembrohogar", [idMiembro.toString()]);
  // eliminar("dat_unidaddealojamiento", "idmiembrohogar", idMiembro.toString());
  //eliminar("dat_matrizrelacional", "idmiembrohogar", idMiembro.toString());
  //eliminar("dat_rolconcepto", "idmiembrohogar", idMiembro.toString());
  // eliminar("dat_tiposayuda", "idmiembrohogar", idMiembro.toString());
  // eliminar("dat_zonavulnerable", "idmiembrohogar", idMiembro.toString());
  // eliminar("dat_detallesconcepto", "idmiembrohogar", idMiembro.toString());
  // eliminar("dat_afectacionmatvivienda", "idmiembrohogar", idMiembro.toString());
  // eliminar("dat_estadoconstvivienda", "idmiembrohogar", idMiembro.toString());
  // eliminar("dat_atributo", "idmiembrohogar", idMiembro.toString());
  // eliminar("dat_miembrodiscapacidad", "idmiembro", idMiembro);
  // eliminar("dat_miembrodiscapacidad", "idmiembrohogar", idMiembro);
  // eliminar("dat_miembropogramas", "idmiembrohogar", idMiembro);  ver este cual es
  //eliminar("dat_estructura", "idmiembrohogar", idMiembro.toString());
}
