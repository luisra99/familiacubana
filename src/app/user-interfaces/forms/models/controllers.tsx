import { getHogar } from "@/app/hogarController/hogar.controller";
import { FamiliaCubana, datico } from "./model";

export async function obtenerDatosPorLlave(
  tabla: keyof FamiliaCubana,
  llave: string,
  id: string
): Promise<any[]> {
  await datico.open();
  const data = await (datico as any)[tabla].where(llave).equals(id).toArray();
  // console.log("obtenerDatosPorLlave", data);
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
  console.log("obtenerDatosPorLlaveEnHogarActual", data);
  return data;
}
export async function obtenerPrimeroPorLlaveEnHogarActual(
  tabla: keyof FamiliaCubana,
  llave: string,
  id: string,
  hogarKey: string
): Promise<any> {
  await datico.open();
  const data = await (datico as any)[tabla].where(llave).equals(id).toArray();
  return {};
  return data.filter((item: any) => item[hogarKey] == getHogar()) ?? {};
}

export async function crear(
  tabla: keyof FamiliaCubana,
  data: any
): Promise<string> {
  return await datico.open().then(() => {
    return (datico as any)[tabla].put(data);
  });
}
export async function eliminar(
  tabla: keyof FamiliaCubana,
  idKey: string,
  id: string
): Promise<string> {
  return await datico
    .open()
    .then(() => (datico as any)[tabla].where(idKey).equals(id).delete());
}
export async function modificar(
  tabla: keyof FamiliaCubana,
  idKey: string,
  id: string,
  values: any
): Promise<string> {
  return await datico
    .open()
    .then(() => (datico as any)[tabla].where(idKey).equals(id).modify(values));
  // .finally(() => datico.close());
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
        console.log("RAULotravezmasaun", hogar);

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
          console.log("RAUL8", bandsWithDetails);
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
        console.log("RAULotravezmasaun", hogar);

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
          console.log("RAUL6", bandsWithDetails);
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
        console.log("RAULotravezmasaun", hogar);

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
          console.log("RAUL5", bandsWithDetails);
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
        console.log("RAULotravezmas", hogar);

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
          console.log("RAUL4", bandsWithDetails);
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
        console.log("RAULotravez", hogar);

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
          console.log("RAUL3", bandsWithDetails);
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
        console.log("RAUL", alojamiento);

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
        console.log("RAUL2", bandsWithDetails);
      }
    );
  });
}

export async function crearNomenclador(
  idpadre: any,
  idconcepto: any,
  denominacion: any
): Promise<void> {
  try {
    await datico
      .open()
      .then(() =>
        (datico as any).nom_concepto.put(
          { idpadre, idconcepto, denominacion },
          idconcepto
        )
      );
    console.log("Nomenclador guardado exitosamente");
  } catch (error) {
    console.error("Error al guardar el nomenclador:", error);
  }
}

//  export async function crearNomenclador(idPadre: any, idConcepto: any, denominacion: any): Promise<void> {
//   try {
//     await datico.open();
//     await (datico as any).nom_concepto.put({ idPadre, idConcepto, denominacion }, idConcepto);
//     console.log('Nomenclador guardado exitosamente');
//   } catch (error) {
//     console.error('Error al guardar el nomenclador:', error);
//   }
//}

export async function vistaIngresos(): Promise<[]> {
  const casa = await (datico as any)["dat_miembrofuentesingresos"].toArray();
  // console.log("casas", casa);
  let conceptos = await (datico as any)["nom_concepto"].toArray();
  // console.log("conceptos", conceptos);
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
  // for (let casa of await tx
  //     .table("dat_miembrofuentesingresos")
  //     .toArray()) {
  //     console.log("raulito9", casa);
  //     try {
  //       const place = tx
  //         .table("dat_miembrofuentesingresos")
  //         .where("idmiembrofuentesingresos")
  //         .anyOf(casa.idpadre)
  //         .toArray();
  //       bandsWithDetails.push({
  //         denominacion:  hogar?.filter(
  //           (elemento: any) => elemento.idconcepto === Number(casa.idmoneda[0])
  //         )[0]['denominacion'],
  //         Moneda: casa.idmoneda,
  //         MontoMensual: casa.moneda,
  //         FuenteProcedencia: casa.idfuente,
  //         Cual: casa.esotrafuente,
  //         ...place,
  //       });

  //     } catch (error: any) {
  //       console.error(error);
  //     }
  //     return bandsWithDetails;
  //     // console.log('raulito9', home);
  //     console.log("RAUL9", bandsWithDetails);
  //   }
  // console.log('prueba',prueba)

  // return datico.transaction(
  //   "rw",
  //   datico.nom_concepto,
  //   datico.dat_miembrofuentesingresos,
  //   async function (tx) {
  //     const bandsWithDetails: any[] = [];
  //     let hogar = await tx.table("nom_concepto").toArray();
  //     console.log("RAULotravezmasaununavezmas", hogar);

  //     for (let casa of await tx
  //       .table("dat_miembrofuentesingresos")
  //       .toArray()) {
  //       console.log("raulito9", casa);
  //       try {
  //         const place = tx
  //           .table("dat_miembrofuentesingresos")
  //           .where("idmiembrofuentesingresos")
  //           .anyOf(casa.idpadre)
  //           .toArray();
  //         bandsWithDetails.push({
  //           denominacion:  hogar?.filter(
  //             (elemento: any) => elemento.idconcepto === Number(casa.idmoneda[0])
  //           )[0]['denominacion'],
  //           Moneda: casa.idmoneda,
  //           MontoMensual: casa.moneda,
  //           FuenteProcedencia: casa.idfuente,
  //           Cual: casa.esotrafuente,
  //           ...place,
  //         });

  //       } catch (error: any) {
  //         console.error(error);
  //       }
  //       return bandsWithDetails;
  //       // console.log('raulito9', home);
  //       console.log("RAUL9", bandsWithDetails);
  //     }

  //   }
  // );
  // });
}
