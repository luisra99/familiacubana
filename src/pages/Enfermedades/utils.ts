import { datico } from "@/app/user-interfaces/forms/models/model";
import { obtenerDatosPorLlave } from "@/app/user-interfaces/forms/models/controllers";

export const miembrosConEnfermedades = async (miembros: any) =>
  await Promise.all(
    miembros?.map(async (obj: any) => {
      const enfermedades = await datico.dat_miembroenfcronicas
        .where({ idmiembrohogar: obj.idconcepto.toString() })
        .count();
      const bajaPrevalencia = await datico.dat_miembroenfbajaprev
        .where({ idmiembrohogar: obj.idconcepto.toString() })
        .count();
      const beneficios = await datico.dat_miembrobeneficios
        .where({ idmiembrohogar: obj.idconcepto.toString() })
        .count();
      if (enfermedades || bajaPrevalencia || beneficios) return obj.idconcepto;
    })
  );

export async function nomenclarEnfermedades(enfermedadesMiembro: any) {
  return await Promise.all(
    enfermedadesMiembro?.map(async (enfermedad: any) => {
      const accede = enfermedad?.accede[0] === "1" ? "Si" : "No";
      const enfermedadMiembro = await datico.nom_concepto.get(
        parseInt(enfermedad?.idtipoenfermedad[0] ?? 0)
      );
      const viasConceptos = await datico.nom_concepto
        .where("idconcepto")
        .anyOf(
          enfermedad?.idtipoviaacceso?.map((idConceptoVia: any) =>
            parseInt(idConceptoVia)
          )
        )
        .toArray();
      const via = viasConceptos
        ?.map((concepto) => concepto.denominacion)
        .join(", ");

      return {
        ...enfermedad,
        patologia: enfermedadMiembro?.denominacion,
        accede,
        via,
      };
    })
  );
}

export async function getEnfermedadesMiembroNomencladas(idMiembro: any) {
  const enfermedadesMiembro = await getEnfermedadesMiembro(idMiembro);
  const enfermedadesNomencladas =
    await nomenclarEnfermedades(enfermedadesMiembro);
  return enfermedadesNomencladas;
}

export const getEnfermedadesQueNoTiene = async (idMiembro: any) => {
  const enfermedades = await obtenerDatosPorLlave(
    "nom_concepto",
    "idpadre",
    "9793"
  ); //Patologías
  const enfermedadesMiembro = await getEnfermedadesMiembro(idMiembro);
  const idEnfermedadesMiembro = enfermedadesMiembro?.map((obj: any) => {
    return parseInt(obj.idtipoenfermedad[0]);
  });

  return enfermedades.filter((obj: any) => {
    return !idEnfermedadesMiembro.includes(obj.idconcepto);
  }); //Enfermedades que no tiene
};

export const getByIdFunctionMiembro = async (idMiembro: string) => {
  const enfermedadesMiembro = await getEnfermedadesMiembro(idMiembro);

  const bajaPrevalenciaMiembro = await obtenerDatosPorLlave(
    "dat_miembroenfbajaprev",
    "idmiembrohogar",
    idMiembro
  );
  const beneficiosMiembro = await obtenerDatosPorLlave(
    "dat_miembrobeneficios",
    "idmiembrohogar",
    idMiembro
  );
  const padeceEnfermedadesCronicas = enfermedadesMiembro.length
    ? "1"
    : bajaPrevalenciaMiembro.length || beneficiosMiembro.length
      ? "2"
      : null;

  return {
    idmiembro: [idMiembro],
    idmiembroenfcronica: padeceEnfermedadesCronicas,
    idenfermedad: bajaPrevalenciaMiembro?.[0]?.idenfermedad ?? [],
    idbeneficio: beneficiosMiembro?.[0]?.idbeneficio ?? [],
    editMode: !!(
      padeceEnfermedadesCronicas ||
      bajaPrevalenciaMiembro?.[0]?.idenfermedad ||
      beneficiosMiembro?.[0]?.idbeneficio
    ),
  };
};

const getEnfermedadesMiembro = async (idMiembro: any) =>
  await datico.dat_miembroenfcronicas
    .where({ idmiembrohogar: idMiembro })
    .toArray();
