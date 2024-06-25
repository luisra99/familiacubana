import {
  MySubClassedDexie,
  conf_dispositivos,
  conf_estadofuncionalidad,
  dat_afectacionmatvivienda,
  dat_caracterizacion,
  dat_causadesvnnaj,
  dat_estadoconstvivienda,
  dat_estadonoacceso,
  dat_estructura,
  dat_hogar,
  dat_hogardiversidadalimentaria,
  dat_hogarestrategias,
  dat_hogargastos,
  dat_hogarmobiliarioequipos,
  dat_localesvivienda,
  dat_miebrobeneficioprogalim,
  dat_miembroaditamentos,
  dat_miembrobeneficios,
  dat_miembrodiscapacidad,
  dat_miembroencuesta,
  dat_miembroenfcronicas,
  dat_miembroestrategias,
  dat_miembrofuentesingresos,
  dat_miembrogradoautonomia,
  dat_miembrohogar,
  dat_miembroocupacion,
  dat_miembropogramas,
  dat_miembrosituacionsocial,
  dat_motivonoatencion,
  dat_nnaocupacion,
  dat_nnasitdelictiva,
  dat_nvinculacionmiembro,
  dat_polprogsoc,
  dat_seviciosvivienda,
  dat_situacnnaj,
  dat_tiposayuda,
  dat_ubicacionlocales,
  dat_unidaddealojamiento,
  dat_viasacceso,
  dat_zonavulnerable,
  datico,
} from "./model";

import { useLiveQuery } from "dexie-react-hooks";

/**const crearUnidadAlojamiento =(unidad:dat_unidaddealojamiento)=>{
  openDatabase()
  datico.dat_unidaddealojamiento.add(unidad)


}
**/
//test

/**
 * Delete the entire database
 */
export async function borrarBaseDato() {
  await datico.delete();
}

/**
 * Open a  database
 */
export async function abrirBaseDato(datico: MySubClassedDexie) {
  await datico.open();
}

export async function limpiarTabalas(datico: MySubClassedDexie) {
  await Promise.all([datico.dat_unidaddealojamiento.clear()]);
}

/**
 * Delete all data
 */
export async function dborrarData(datico: MySubClassedDexie) {
  return await datico.dat_unidaddealojamiento.clear();
}

/**Funciones personalizadas para llenar cada tabla en su respectiva pantalla */

export async function crearUnidadAlojamiento(
  datico: MySubClassedDexie,
  unidad: dat_unidaddealojamiento
): Promise<string> {
  console.log("Funcion eviel raul");
  return await datico
    .open()
    .then(() => datico.dat_unidaddealojamiento.put(unidad));
}

export async function crearHogar(
  datico: MySubClassedDexie,
  hogar: dat_hogar
): Promise<string> {
  console.log("Hogar");
  return await datico.open().then(() => datico.dat_hogar.put(hogar));
}

export async function crearDatosEstructura(
  datico: MySubClassedDexie,
  estructura: dat_estructura
): Promise<string> {
  console.log("Estructura");
  return await datico.open().then(() => datico.dat_estructura.put(estructura));
}

export async function crearZonaVulnerable(
  datico: MySubClassedDexie,
  zona: dat_zonavulnerable
): Promise<string> {
  console.log("Zona Vulnerable");
  return await datico.open().then(() => datico.dat_zonavulnerable.put(zona));
}

export async function crearCaracterizacion(
  datico: MySubClassedDexie,
  carcterizacion: dat_caracterizacion
): Promise<string> {
  console.log("Caracterización");
  return await datico
    .open()
    .then(() => datico.dat_caracterizacion.put(carcterizacion));
}

export async function crearLocalesVivienda(
  datico: MySubClassedDexie,
  locales: dat_localesvivienda
): Promise<string> {
  console.log("Locales y Viviendas");
  return await datico
    .open()
    .then(() => datico.dat_localesvivienda.put(locales));
}

export async function crearUbicacionLocales(
  datico: MySubClassedDexie,
  ubicaciones: dat_ubicacionlocales
): Promise<string> {
  console.log("Ubicaciones y Locales");
  return await datico
    .open()
    .then(() => datico.dat_ubicacionlocales.put(ubicaciones));
}

export async function crearHogarDiversidadAlimentaria(
  datico: MySubClassedDexie,
  hogar: dat_hogardiversidadalimentaria
): Promise<string> {
  console.log("Hogar Diversidad Alimentaria");
  return await datico
    .open()
    .then(() => datico.dat_hogardiversidadalimentaria.put(hogar));
}

export async function crearconfDispositivos(
  datico: MySubClassedDexie,
  dispositivos: conf_dispositivos
): Promise<string> {
  console.log("Conf Dispositivos");
  return await datico
    .open()
    .then(() => datico.conf_dispositivos.put(dispositivos));
}

export async function crearconfEstadoFuncionalidad(
  datico: MySubClassedDexie,
  funcionalidad: conf_estadofuncionalidad
): Promise<string> {
  console.log("Crear Estado Funcionalidad");
  return await datico
    .open()
    .then(() => datico.conf_estadofuncionalidad.put(funcionalidad));
}

export async function creardatServicioVivienda(
  datico: MySubClassedDexie,
  servicio: dat_seviciosvivienda
): Promise<string> {
  console.log("Servicio Vivienda");
  return await datico
    .open()
    .then(() => datico.dat_seviciosvivienda.put(servicio));
}

export async function crearMiembroEstrategias(
  datico: MySubClassedDexie,
  miembroes: dat_miembroestrategias
): Promise<string> {
  console.log("CMiembro Estrategia");
  return await datico
    .open()
    .then(() => datico.dat_miembroestrategias.put(miembroes));
}

export async function crearAfectacionMatVivienda(
  datico: MySubClassedDexie,
  afectacion: dat_afectacionmatvivienda
): Promise<string> {
  console.log("Afectacion Mat Vivienda");
  return await datico
    .open()
    .then(() => datico.dat_afectacionmatvivienda.put(afectacion));
}

export async function crearEstadoConstVivienda(
  datico: MySubClassedDexie,
  estado: dat_estadoconstvivienda
): Promise<string> {
  console.log("Estado Const Vivienda");
  return await datico
    .open()
    .then(() => datico.dat_estadoconstvivienda.put(estado));
}

export async function crearHogarMobiliariosEquipo(
  datico: MySubClassedDexie,
  equipo: dat_hogarmobiliarioequipos
): Promise<string> {
  console.log("Hogar Mobiliario Equipos");
  return await datico
    .open()
    .then(() => datico.dat_hogarmobiliarioequipos.put(equipo));
}

export async function crearHogarGastos(
  datico: MySubClassedDexie,
  gastos: dat_hogargastos
): Promise<string> {
  console.log("Hogar Gastos");
  return await datico.open().then(() => datico.dat_hogargastos.put(gastos));
}

export async function crearMiembroEncuestas(
  datico: MySubClassedDexie,
  encuestas: dat_miembroencuesta
): Promise<string> {
  console.log("Miembro Encuestas");
  return await datico
    .open()
    .then(() => datico.dat_miembroencuesta.put(encuestas));
}

export async function crearMotivacionAtencion(
  datico: MySubClassedDexie,
  atencion: dat_motivonoatencion
): Promise<string> {
  console.log("Motivacion Atencion");
  return await datico
    .open()
    .then(() => datico.dat_motivonoatencion.put(atencion));
}

export async function crearMiembroHogar(
  datico: MySubClassedDexie,
  miembroh: dat_miembrohogar
): Promise<string> {
  console.log("Miembro Hogar");
  return await datico.open().then(() => datico.dat_miembrohogar.put(miembroh));
}

export async function crearMiembroGradoAutonomia(
  datico: MySubClassedDexie,
  miembroga: dat_miembrogradoautonomia
): Promise<string> {
  console.log("Miembro Grado Autonomia");
  return await datico
    .open()
    .then(() => datico.dat_miembrogradoautonomia.put(miembroga));
}

export async function crearTiposAyuda(
  datico: MySubClassedDexie,
  tipos: dat_tiposayuda
): Promise<string> {
  console.log("Tipos Ayuda");
  return await datico.open().then(() => datico.dat_tiposayuda.put(tipos));
}

export async function crearMiembroDiscapacidad(
  datico: MySubClassedDexie,
  miembrodis: dat_miembrodiscapacidad
): Promise<string> {
  console.log("Miembro Discapacidad");
  return await datico
    .open()
    .then(() => datico.dat_miembrodiscapacidad.put(miembrodis));
}

export async function crearMiembroAditamentos(
  datico: MySubClassedDexie,
  miembroadi: dat_miembroaditamentos
): Promise<string> {
  console.log("Miembro Aditamento");
  return await datico
    .open()
    .then(() => datico.dat_miembroaditamentos.put(miembroadi));
}

export async function crearMiembroBeneficios(
  datico: MySubClassedDexie,
  miembrobene: dat_miembrobeneficios
): Promise<string> {
  console.log("Miembro Beneficios");
  return await datico
    .open()
    .then(() => datico.dat_miembrobeneficios.put(miembrobene));
}

export async function crearMiembroenfCronicas(
  datico: MySubClassedDexie,
  miembrocro: dat_miembroenfcronicas
): Promise<string> {
  console.log("Miembro Enf Cronicas");
  return await datico
    .open()
    .then(() => datico.dat_miembroenfcronicas.put(miembrocro));
}

export async function crearViasAcceso(
  datico: MySubClassedDexie,
  vias: dat_viasacceso
): Promise<string> {
  console.log("Miembro Enf Cronicas");
  return await datico.open().then(() => datico.dat_viasacceso.put(vias));
}

export async function crearMiembroFuentesIngresos(
  datico: MySubClassedDexie,
  fuentes: dat_miembrofuentesingresos
): Promise<string> {
  console.log("Miembro Fuentes Ingresos");
  return await datico
    .open()
    .then(() => datico.dat_miembrofuentesingresos.put(fuentes));
}

export async function crearMiembroOcupacion(
  datico: MySubClassedDexie,
  miembroocu: dat_miembroocupacion
): Promise<string> {
  console.log("Miembro Ocupacion");
  return await datico
    .open()
    .then(() => datico.dat_miembroocupacion.put(miembroocu));
}

export async function crearDatPolProgSoc(
  datico: MySubClassedDexie,
  dato: dat_polprogsoc
): Promise<string> {
  console.log("Dato Pol Prog Soc");
  return await datico.open().then(() => datico.dat_polprogsoc.put(dato));
}

export async function crearSituacionNNaj(
  datico: MySubClassedDexie,
  situ: dat_situacnnaj
): Promise<string> {
  console.log("Situacion NNaj");
  return await datico.open().then(() => datico.dat_situacnnaj.put(situ));
}

export async function crearNNaOcupacion(
  datico: MySubClassedDexie,
  nnacupaciontu: dat_nnaocupacion
): Promise<string> {
  console.log("NNa Ocupacion");
  return await datico
    .open()
    .then(() => datico.dat_nnaocupacion.put(nnacupaciontu));
}

export async function crearMiebroBeneficioProgalim(
  datico: MySubClassedDexie,
  beneficio: dat_miebrobeneficioprogalim
): Promise<string> {
  console.log("Miembro Beneficio Progalim");
  return await datico
    .open()
    .then(() => datico.dat_miebrobeneficioprogalim.put(beneficio));
}

export async function crearMiembroSituacionSocial(
  datico: MySubClassedDexie,
  social: dat_miembrosituacionsocial
): Promise<string> {
  console.log("Miembro Situacion Social");
  return await datico
    .open()
    .then(() => datico.dat_miembrosituacionsocial.put(social));
}

export async function crearHogarEstrategias(
  datico: MySubClassedDexie,
  estrategias: dat_hogarestrategias
): Promise<string> {
  console.log("Hogar Estrategias");
  return await datico
    .open()
    .then(() => datico.dat_hogarestrategias.put(estrategias));
}

export async function crearMiembroPogramas(
  datico: MySubClassedDexie,
  programas: dat_miembropogramas
): Promise<string> {
  console.log("Miembro Programas");
  return await datico
    .open()
    .then(() => datico.dat_miembropogramas.put(programas));
}

export async function crearNVinculacionMiembro(
  datico: MySubClassedDexie,
  vinculacion: dat_nvinculacionmiembro
): Promise<string> {
  console.log("NVinculacion Miembro");
  return await datico
    .open()
    .then(() => datico.dat_nvinculacionmiembro.put(vinculacion));
}

export async function crearEstadoNoAcceso(
  datico: MySubClassedDexie,
  estado: dat_estadonoacceso
): Promise<string> {
  console.log("Estado No Acceso");
  return await datico.open().then(() => datico.dat_estadonoacceso.put(estado));
}

export async function crearCausadesvnnaj(
  datico: MySubClassedDexie,
  causa: dat_causadesvnnaj
): Promise<string> {
  console.log("Causa Desvnnaj");
  return await datico.open().then(() => datico.dat_causadesvnnaj.put(causa));
}

export async function crearNNasitdelictiva(
  datico: MySubClassedDexie,
  delictiva: dat_nnasitdelictiva
): Promise<string> {
  console.log("NNasitdelictiva");
  return await datico
    .open()
    .then(() => datico.dat_nnasitdelictiva.put(delictiva));
}

/**
 * Read a dato
 */
export async function leerDato(datico: MySubClassedDexie, archivo: any) {
  return await datico.dat_unidaddealojamiento.get(archivo);
}

// Tablas enlazadas funcionando

export async function obtenerdatosalojamientohogar() {
  console.log("Ejecutado");
  datico.open();
  const prueba = useLiveQuery(async () => {
    const prueba = await datico.dat_hogar.toArray();
    return prueba;
  });
  console.log("Datos Indexados de alojamientos - hogar", prueba);
  return prueba;
}
