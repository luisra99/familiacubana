import Dexie, { Table } from "dexie";

import cuid from "cuid";
import {
  dat_atributo,
  dat_detallesconcepto,
  dat_matrizrelacional,
  dat_rolconcepto,
  nom_concepto,
  nom_tipoconcepto,
} from "./nomencladores";

//* Abstract entity model with `idgeneral` property initialization
// * and `equals` method for entity comparisons.
export abstract class AbstractEntity {
  constructor(public idgeneral?: string) {
    idgeneral ? (this.idgeneral = idgeneral) : (this.idgeneral = cuid());
  }
  equals(e1: AbstractEntity, e2: AbstractEntity) {
    return e1.idgeneral == e2.idgeneral;
  }
}

//formulario3 DB - Unidad de Alojamiento
export class dat_unidaddealojamiento extends AbstractEntity {
  constructor(
    public idunidaddealojamiento: number,
    public circunscripcion: string,
    public cdr: string,
    public direccion: string,
    public geolocalizacion: string,
    public idzonaresidencia: any,
    public idtipovivienda: any,
    public idasentamiento: any,
    public planturquino: boolean,
    public zonavulnerable: boolean,
    public idzonavulnerable: any,
    public idestructura: number
  ) {
    super();
  }
}

//formulario  - Datos del Hogar
export class dat_hogar extends AbstractEntity {
  circunscripcion: string | undefined;
  constructor(
    public idcodigohogar: number,    
    public nautahogar: boolean,
    public propgastossld: number,
    public propgastosmed: number,
    public ayudaprob: number,
    public apoyolab: number,
    public observaciones: string,
    public idsituacionalegal: number,
    public idestado: number,
    public idtipogasto: number,
    public idunidaddealojamiento: number
  ) {
    super();
  }
}

// Datos Estructura
export class dat_estructura extends AbstractEntity {
  constructor(
    public idestructura: number,
    public idgeneral?: string
  ) {
    super(idgeneral);
  }
}

// Datos Zona Vulneraable
export class dat_zonavulnerable extends AbstractEntity {
  constructor(
    public idzonavulnerable: number,
    public idgeneral?: string
  ) {
    super(idgeneral);
  }
}

// Datos Caracterización
export class dat_caracterizacion extends AbstractEntity {
  constructor(
    public idcaracterizacion: number,
    public fechaentrev: string,
    public fregistro: string,
    public identrevistador: number,
    public hinicio: string,
    public hfin: string,
    public tipo: number,
    public idmiembrohogar?: string,
    public idcodigohogar?: string,
    public idgeneral?: string
  ) {
    super(idgeneral);
  }
}

// Datos Locales de Vivienda
export class dat_localesvivienda extends AbstractEntity {
  constructor(
    public idlocalesvivienda: number,
    public cantudormir: number,
    public cantedormir: number,
    public tipousococina: boolean,
    public cantidadcocina: number,
    public idcombustible: number,
    public tienesanitario: boolean,
    public idtipousoservicio: boolean,
    public idtiposanitario: number,
    public idcodigohogar?: string,
    public idgeneral?: string
  ) {
    super(idgeneral);
  }
}

// Datos Ubicacion Locales
export class dat_ubicacionlocales extends AbstractEntity {
  constructor(
    public idubicacionlocal: number,
    public idtipoubicacion: number,
    public idlocalesvivienda?: number,
    public idgeneral?: string
  ) {
    super(idgeneral);
  }
}

// Datos Hogar Diversidad Alimentaria
export class dat_hogardiversidadalimentaria extends AbstractEntity {
  constructor(
    public idhogardiversidadalimentaria: number,
    public losencontro: boolean,
    public legustan: boolean,
    public frecuencia: number,
    public idcodigohogar?: number,
    public idgeneral?: string,
    public idtipoalimento?: number,
  ) {
    super(idgeneral);
  }
}

// Datos Configuracion de Dispositivos
export class conf_dispositivos extends AbstractEntity {
  constructor(
    public iddispositivo: number,
    public idestructura?: number,
    public idgeneral?: string
  ) {
    super(idgeneral);
  }
}

// Datos Configuracion de Estado de Funcionalidad
export class conf_estadofuncionalidad extends AbstractEntity {
  constructor(
    public idhogarfunciconalidades: number,
    public idfuncionalidad: number,
    public idestado: number,
    public idcodigohogar?: number,
    public idgeneral?: string
  ) {
    super(idgeneral);
  }
}

// Datos Servicios de la Vivienda
export class dat_seviciosvivienda extends AbstractEntity {
  constructor(
    public idserviciosvivienda: number,
    public idinstalacionacueducto: number,
    public idfrecsumagua: number,
    public idprocedenciaagua: number,
    public iddesague: number,
    public idelectricidad: number,
    public idcodigohogar?: number,
    public idgeneral?: string
  ) {
    super(idgeneral);
  }
}

// Datos Miembros Estrategias
export class dat_miembroestrategias extends AbstractEntity {
  constructor(
    public idmiembroestrategia: number,
    public idestrategia: number,
    public idcodigohogar?: number,
    public idmiembrohogar?: number,
    public idgeneral?: string
  ) {
    super(idgeneral);
  }
}

// Datos Afectacion Material Vivienda
export class dat_afectacionmatvivienda extends AbstractEntity {
  constructor(
    public idafectacionemat: number,
    public idafectacion: number,
    public idcodigohogar?: number,
    public idgeneral?: string
  ) {
    super(idgeneral);
  }
}

// Datos Estado de Construccion de la Vivienda
export class dat_estadoconstvivienda extends AbstractEntity {
  constructor(
    public idestadoconstvivienda: number,
    public idestadoconst: number,
    public idcodigohogar?: number,
    public idgeneral?: string
  ) {
    super(idgeneral);
  }
}

// Datos Hogar Mobiliarios Equipos
export class dat_hogarmobiliarioequipos extends AbstractEntity {
  constructor(
    public idhogarmobiliario: number,
    public cantidad: number,
    public idmobiliarioequipo: number,
    public estado: number,
    public idcodigohogar?: number,
    public idgeneral?: string
  ) {
    super(idgeneral);
  }
}

// Datos Hogar Gastos
export class dat_hogargastos extends AbstractEntity {
  constructor(
    public idhogasrgasto: number,
    public iddestino: number,
    public montocup: number,
    public pesogasto: number,
    public proporciongasto: number,
    public idcodigohogar?: number,
    public idgeneral?: string
  ) {
    super(idgeneral);
  }
}

// Datos Miembro Encuesta
export class dat_miembroencuesta extends AbstractEntity {
  constructor(
    public idmiembroencuesta: number,
    public problemasalud: number,
    public atendido: boolean,
    public idcodigohogar?: number,
    public idmiembrohogar?: number,
    public idgeneral?: string
  ) {
    super(idgeneral);
  }
}

// Datos Motivo Atencion
export class dat_motivonoatencion extends AbstractEntity {
  constructor(
    public idmotivonoatencion: number,
    public idmotivo: number,
    public idmiembrohogar?: number,
    public idgeneral?: string
  ) {
    super(idgeneral);
  }
}

// Datos Miembros del Hogae
export class dat_miembrohogar extends AbstractEntity {  
  constructor(
    public idmiembrohogar: number,
    public pnombre: string,
    public snombre: string,
    public papellido: string,
    public sapellido: string,
    public cidentidad: number,
    public edad: number,
    public idcolorpiel: number,
    public dirscan: string,
    public fotocarne: string,
    public idsexo: number,
    public idparentesco: any,
    public idorientacionsex: number,
    public idnivelescolar: number,
    public idnivelescolargrado: number,
    public idgradovencido: number,
    public registroconsum: boolean,
    public idpamunicipionac: number,
    public datosmoviles: boolean,
    public estaembarazada: boolean,
    public lactando: boolean,
    public madremenor19: boolean,
    public redesapoyo: number,
    public certificado: boolean,
    public idcodigohogar?: number,
    public idgeneral?: string
  ) {
    super(idgeneral);
  }
}

// Datos Miembro de Autonomia
export class dat_miembrogradoautonomia extends AbstractEntity {
  constructor(
    public idmiembrogradoautonomia: number,
    public idautonomia: number,
    public idcodigohogar?: number,
    public idmiembrohogar?: number,
    public idgeneral?: string
  ) {
    super(idgeneral);
  }
}

// Datos Tipos de Ayuda
export class dat_tiposayuda extends AbstractEntity {
  constructor(
    public idtiposayuda: number,
    public idayuda: number,
    public idmiembrogradoautonomia?: number,
    public idgeneral?: string
  ) {
    super(idgeneral);
  }
}

// Datos Miembros de Discapacidad
export class dat_miembrodiscapacidad extends AbstractEntity {
  constructor(
    public idmiembrodiscapacidad: number,
    public iddiscapacidad: number,
    public idcodigohogar?: number,
    public idmiembro?: number,
    public idgeneral?: string
  ) {
    super(idgeneral);
  }
}

// Datos Miembros Aditamentos
export class dat_miembroaditamentos extends AbstractEntity {
  constructor(
    public idmiembroaditamentos: number,
    public idaditamento: number,
    public disponeadit: boolean,
    public idcodigohogar?: number,
    public idmiembrohogar?: number,
    public idgeneral?: string
  ) {
    super(idgeneral);
  }
}

// Datos Miembros Beneficios
export class dat_miembrobeneficios extends AbstractEntity {
  constructor(
    public idmiembrobeneficios: number,
    public idbeneficio: number,
    public idmiembrohogar?: number,
    public idgeneral?: string
  ) {
    super(idgeneral);
  }
}

// Datos Miembros Enfermedades Crónicas
export class dat_miembroenfcronicas extends AbstractEntity {
  constructor(
    public idmiembroenfcronica: number,
    public idenfermedad: number,
    public accede: boolean,
    public idtipoenfermedad: number,
    public idcodigohogar?: number,
    public idmiembrohogar?: number,
    public idgeneral?: string
  ) {
    super(idgeneral);
  }
}

// Datos Vía de Acceso
export class dat_viasacceso extends AbstractEntity {
  constructor(
    public idviacceso: number,
    public idtipoviaacceso: number,
    public idmiembroenfcronica?: number,
    public idgeneral?: string
  ) {
    super(idgeneral);
  }
}

// Datos Miembros Fuentes de Ingreso
export class dat_miembrofuentesingresos extends AbstractEntity {
  constructor(
    public idmiembrofuentesingresos: number,
    public montomensual: number,
    public esotrafuente: string,
    public idmoneda: number,
    public idfuente: number,
    public idcodigohogar?: number,
    public idmiembrohogar?: number,
    public idgeneral?: string
  ) {
    super(idgeneral);
  }
}

// Datos Miembro de Ocupacion
export class dat_miembroocupacion extends AbstractEntity {
  constructor(
    public idmiembroocupacion: number,
    public idocupacion: number,
    public idtipoocupacion: number,
    public idcodigohogar?: number,
    public idmiembrohogar?: number,
    public idgeneral?: string
  ) {
    super(idgeneral);
  }
}
// Datos dat_polprogsoc
export class dat_polprogsoc extends AbstractEntity {
  constructor(
    public idpolprogsoc: number,
    public idbeneficio: number,
    public accede: boolean,
    public idmiembrohogar?: number,
    public idgeneral?: string
  ) {
    super(idgeneral);
  }
}
// Datos dat_situacnnaj
export class dat_situacnnaj extends AbstractEntity { // cambiada
  constructor(
    public idsituacnnaj: number,//esta
    public idsituacioneduc: number,//esta 
    public idcodigohogar?: number,//esta
    public idmiembrohogar?: number,//esta ok
    public idcuidadoprimerainf?: number,
    public idcuidadohogar?: number,
    public idsne?: number,
    public idetp?: number,
    public idgeneral?: string
  ) {
    super(idgeneral);
  }
}

// Datos dat_nnaocupacion
export class dat_nnaocupacion extends AbstractEntity {
  constructor(
    public idcodigohogar: number,
    public idmiembrohogar: number,
    public idnnaocupacion: number,
    public idtipoactividad: number,
    public idcanthoras: number,
    public idhorario: number,
    public autorizadomtss: number,
    public idsituacnnaj?: number,
    public idgeneral?: string
  ) {
    super(idgeneral);
  }
}

// Datos dat_miebrobeneficioprogalim
export class dat_miebrobeneficioprogalim extends AbstractEntity {
  constructor(
    public idmiebrobeneficioprogalim: number,
    public idbeneficioprog: number,
    public idmiembrohogar?: number,
    public idgeneral?: string
  ) {
    super(idgeneral);
  }
}

// Datos Miembros Situacion Social
export class dat_miembrosituacionsocial extends AbstractEntity {
  constructor(
    public idiembrosituacionsocial: number,
    public idsituacionsocial: number,
    public idcodigohogar?: number,
    public idmiembrohogar?: number,
    public idgeneral?: string
  ) {
    super(idgeneral);
  }
}

// Datos Hogares Estrategias
export class dat_hogarestrategias extends AbstractEntity {
  constructor(
    public idhogarestrategia: number,
    public idestrategia: number,
    public dias: number,
    public idcodigohogar?: number,
    public idgeneral?: string
  ) {
    super(idgeneral);
  }
}

// Datos Miembo Programas
export class dat_miembropogramas extends AbstractEntity {
  constructor(
    public idmiembroprograma: number,
    public idprograma: number,
    public idcodigohogar?: number,
    public idmiembrohogar?: number,
    public idgeneral?: string
  ) {
    super(idgeneral);
  }
}

// Datos dat_nvinculacionmiembro
export class dat_nvinculacionmiembro extends AbstractEntity {
  constructor(
    public idnvinculacionmiembro: number,
    public tipo: number,
    public idcausa: number,
    public idmotivocuida: number,
    public idmotivodecision: number,
    public idremuneraciones: number,
    public idcodigohogar?: number,
    public idmiembrohogar?: number,
    public idmiembroocupacion?: number,
    public idgeneral?: string
  ) {
    super(idgeneral);
  }
}

// Datos Estado No Acceso
// Datos Estado No Acceso
export class dat_estadonoacceso extends AbstractEntity {
  constructor(
    public idcausanoacceso: number,
    public idcausa: number,
    public idrespuesta?: number,
    public idpolprogsoc?: number,
    public idgeneral?: string
  ) {
    super(idgeneral);
  }
}

// Datos dat_causadesvnnaj
export class dat_causadesvnnaj extends AbstractEntity {
  constructor(
    public idcausadesvnnaj: number,
    public idcausadesv: number,
    public otrascausas: string,
    public idsituacnnaj?: number,
    public idgeneral?: string
  ) {
    super(idgeneral);
  }
}

// Datos dat_nnasitdelictiva
export class dat_nnasitdelictiva extends AbstractEntity {
  constructor(
    public idnnasitdelictiva: number,
    public idtiposituacion: number,
    public idsituacnnaj?: number,
    public idgeneral?: string
  ) {
    super(idgeneral);
  }
}

export class dat_manejosdesechos extends AbstractEntity {
  constructor(
    public idmanejodesechos: number,
    public idtipomanejos: number,
    public idcodigohogar?: number,
    public idgeneral?: string
  ) {
    super(idgeneral);
  }
}

export class FamiliaCubana extends Dexie {
  dat_unidaddealojamiento!: Table<dat_unidaddealojamiento>;
  dat_hogar!: Table<dat_hogar>;
  dat_estructura!: Table<dat_estructura>;
  dat_zonavulnerable!: Table<dat_zonavulnerable>;
  dat_caracterizacion!: Table<dat_caracterizacion>;
  dat_localesvivienda!: Table<dat_localesvivienda>;
  dat_ubicacionlocales!: Table<dat_ubicacionlocales>;
  dat_hogardiversidadalimentaria!: Table<dat_hogardiversidadalimentaria>;
  conf_dispositivos!: Table<conf_dispositivos>;
  conf_estadofuncionalidad!: Table<conf_estadofuncionalidad>;
  dat_seviciosvivienda!: Table<dat_seviciosvivienda>;
  dat_miembroestrategias!: Table<dat_miembroestrategias>;
  dat_afectacionmatvivienda!: Table<dat_afectacionmatvivienda>;
  dat_estadoconstvivienda!: Table<dat_estadoconstvivienda>;
  dat_hogarmobiliarioequipos!: Table<dat_hogarmobiliarioequipos>;
  dat_hogargastos!: Table<dat_hogargastos>;
  dat_miembroencuesta!: Table<dat_miembroencuesta>;
  dat_motivonoatencion!: Table<dat_motivonoatencion>;
  dat_miembrohogar!: Table<dat_miembrohogar>;
  dat_miembrogradoautonomia!: Table<dat_miembrogradoautonomia>;
  dat_tiposayuda!: Table<dat_tiposayuda>;
  dat_miembrodiscapacidad!: Table<dat_miembrodiscapacidad>;
  dat_miembroaditamentos!: Table<dat_miembroaditamentos>;
  dat_miembrobeneficios!: Table<dat_miembrobeneficios>;
  dat_miembroenfcronicas!: Table<dat_miembroenfcronicas>;
  dat_viasacceso!: Table<dat_viasacceso>;
  dat_miembrofuentesingresos!: Table<dat_miembrofuentesingresos>;
  dat_miembroocupacion!: Table<dat_miembroocupacion>;
  dat_polprogsoc!: Table<dat_polprogsoc>;
  dat_situacnnaj!: Table<dat_situacnnaj>;
  dat_nnaocupacion!: Table<dat_nnaocupacion>;
  dat_miebrobeneficioprogalim!: Table<dat_miebrobeneficioprogalim>;
  dat_miembrosituacionsocial!: Table<dat_miembrosituacionsocial>;
  dat_hogarestrategias!: Table<dat_hogarestrategias>;
  dat_miembropogramas!: Table<dat_miembropogramas>;
  dat_nvinculacionmiembro!: Table<dat_nvinculacionmiembro>;
  dat_estadonoacceso!: Table<dat_estadonoacceso>;
  dat_causadesvnnaj!: Table<dat_causadesvnnaj>;
  dat_nnasitdelictiva!: Table<dat_nnasitdelictiva>;
  nom_tipoconcepto!: Table<nom_tipoconcepto>;
  dat_atributo!: Table<dat_atributo>;
  dat_detallesconcepto!: Table<dat_detallesconcepto>;
  dat_rolconcepto!: Table<dat_rolconcepto>;
  nom_concepto!: Table<nom_concepto>;
  dat_matrizrelacional!: Table<dat_matrizrelacional>;
  dat_manejosdesechos!: Table<dat_manejosdesechos>;

  constructor() {
    super("FamiliaCubana");
    this.version(1).stores({
      dat_unidaddealojamiento:
        "++idunidaddealojamiento, circunscripcion, cdr, direccion, geolocalizacion, idzonaresidencia, idtipovivienda, idasentamiento, planturquino, zonavulnerable, idzonavulnerable, idestructura",
      dat_hogar:
        "++idcodigohogar, nautahogar, propgastossld, propgastosmed, ayudaprob, apoyolab, observaciones, idsituacionalegal, idestado, idtipogasto, idunidaddealojamiento",
      dat_estructura: "++idestructura, idgeneral",
      dat_zonavulnerable: "++idzonavulnerable, idgeneral",
      dat_caracterizacion:
        "++idcaracterizacion, fechaentrev, fregistro, identrevistador, hinicio, hfin, tipo, idcodigohogar, idmiembrohogar, idgeneral",
      dat_localesvivienda:
        "++idlocalesvivienda, cantudormir, cantedormir, tipousococina, cantidadcocina, idcombustible, tienesanitario, idtipousoservicio, idtiposanitario, idcodigohogar, idgeneral",
      dat_ubicacionlocales:
        "++idubicacionlocal, idtipoubicacion, idlocalesvivienda, idgeneral",
      dat_hogardiversidadalimentaria:
        "++idhogardiversidadalimentaria, losencontro, legustan, frecuencia, idcodigohogar, idtipoalimento, idgeneral",
      conf_dispositivos: "++iddispositivo, idestructura, idgeneral",
      conf_estadofuncionalidad:
        "++idhogarfunciconalidades, idfuncionalidad, idestado, idcodigohogar, idgeneral",
      dat_seviciosvivienda:
        "++idserviciosvivienda, idinstalacionacueducto, idfrecsumagua, idprocedenciaagua,iddesague,idelectricidad, idcodigohogar, idgeneral",
      dat_miembroestrategias:
        "++idmiembroestrategia, idestrategia, idcodigohogar, idmiembrohogar, idgeneral",
      dat_afectacionmatvivienda:
        "++idafectacionemat, idafectacion, idcodigohogar, idgeneral",
      dat_estadoconstvivienda:
        "++idestadoconstvivienda, idestadoconst, idcodigohogar, idgeneral",
      dat_hogarmobiliarioequipos:
        "++idhogarmobiliario, cantidad, idmobiliarioequipo, estado, idcodigohogar, idgeneral",
      dat_hogargastos:
        "++idhogasrgasto, iddestino, montocup, pesogasto, proporciongasto, idcodigohogar, idgeneral",
      dat_miembroencuesta:
        "++idmiembroencuesta, problemasalud, atendido,idcodigohogar, idmiembrohogar, idgeneral",
      dat_motivonoatencion:
        "++idmotivonoatencion, idmotivo, idcodigohogar, idmiembrohogar, idgeneral",
      dat_miembrohogar:
        "++idmiembrohogar, pnombre, snombre, papellido, sapellido, cidentidad, edad, idcolorpiel, dirscan, fotocarne, idsexo, idparentesco, idorientacionsex, idnivelescolar, idnivelescolargrado, idgradovencido, registroconsum, idpamunicipionac, datosmoviles, estaembarazada, lactando, madremenor19, redesapoyo, certificado, idcodigohogar, idgeneral",
      dat_miembrogradoautonomia:
        "++idmiembrogradoautonomia, idautonomia, idcodigohogar, idmiembrohogar, idgeneral",
      dat_tiposayuda:
        "++idtiposayuda, idayuda, idcodigohogar, idmiembrogradoautonomia, idgeneral",
      dat_miembrodiscapacidad:
        "++idmiembrodiscapacidad, iddiscapacidad, idcodigohogar, idmiembro, idgeneral",
      dat_miembroaditamentos:
        "++idmiembroaditamentos, idaditamento, disponeadit,idcodigohogar, idmiembrohogar, idgeneral",
      dat_miembrobeneficios:
        "++idmiembrobeneficios, idbeneficio,idcodigohogar, idmiembrohogar, idgeneral",
      dat_miembroenfcronicas:
        "++idmiembroenfcronica, idenfermedad, accede, idtipoenfermedad, idcodigohogar, idmiembrohogar, idgeneral",
      dat_viasacceso:
        "++idviacceso, idtipoviaacceso, idcodigohogar, idmiembroenfcronica, idgeneral",
      dat_miembrofuentesingresos:
        "++idmiembrofuentesingresos, montomensual, esotrafuente, idmoneda, idfuente, idcodigohogar, idmiembrohogar, idgeneral",
        dat_miembroocupacion:
        "++idmiembroocupacion, idocupacion, idtipoocupacion, idcodigohogar, idmiembrohogar, idgeneral",
      dat_polprogsoc:
        "++idpolprogsoc, idbeneficio, accede, idcodigohogar, idmiembrohogar, idgeneral",
        dat_situacnnaj:
        "++idsituacnnaj, idsituacioneduc, idcodigohogar, idmiembrohogar,idcuidadoprimerainf,idcuidadohogar,idsne,idetp, idgeneral",
      dat_nnaocupacion:
        "++idnnaocupacion,idmiembrohogar, idtipoactividad, idcanthoras, idhorario, autorizadomtss, idsituacnnaj, idgeneral",      
      dat_miebrobeneficioprogalim:
        "++idmiebrobeneficioprogalim, idbeneficioprog, idcodigohogar, idmiembrohogar, idgeneral",
      dat_miembrosituacionsocial:
        "++idiembrosituacionsocial, idsituacionsocial, idcodigohogar, idmiembrohogar, idgeneral",
      dat_hogarestrategias:
        "++idhogarestrategia, idestrategia, dias, idcodigohogar, idgeneral",
      dat_miembropogramas:
        "++idmiembroprograma, idprograma, idcodigohogar, idmiembrohogar, idgeneral",
      dat_nvinculacionmiembro: 
      "++idnvinculacionmiembro,tipo,idcausa,idmotivocuida,idmotivodecision,idremuneraciones,idcodigohogar,idmiembrohogar,idmiembroocupacion,idgeneral",
      nom_tipoconcepto:
        "++idtipoconcepto, denominacion, descripcion, fhasta, idtipo",
      dat_atributo: "++idatributo, denomicacion, tipo, idtipoconcepto",
      dat_detallesconcepto: "++iddetalles, dato, idtipoconcepto, idatributo",
      dat_rolconcepto: "++idrolconcepto, rol, idtipoconcepto",
      nom_concepto:
        "++idconcepto, idpadre, denominacion, nivel, fechafin, codigo, visible, idestructura, orden, idtipoconcepto",
      dat_matrizrelacional:
        "++idrelacion, fechafin, idestructura, idconceptorelacionado, idconceptopadre, idconceptopadrerel, idtipoconcepto",
      dat_manejosdesechos:
        "++idmanejodesechos, idtipomanejos, idcodigohogar, idgeneral",
        dat_estadonoacceso:
        " ++idcausanoacceso,idcausa,idrespuesta,idpolprogsoc,idgeneral",
    });
  }
}
export const datico = new FamiliaCubana();
