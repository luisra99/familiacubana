import { AbstractEntity } from "@/app/models/model";

export class nom_tipoconcepto extends AbstractEntity {
  constructor(
    public idtipoconcepto: number,
    public denominacion: string,
    public descripcion: number,
    public fhasta: string,
    public idtipo: number,
    public idgeneral?: string
  ) {
    super(idgeneral);
  }
}

export class dat_atributo extends AbstractEntity {
  constructor(
    public idatributo: number,
    public denomicacion: string,
    public tipo: number,
    public idtipoconcepto?: number,
    public idgeneral?: string
  ) {
    super(idgeneral);
  }
}

export class dat_detallesconcepto extends AbstractEntity {
  constructor(
    public iddetalles: number,
    public dato: string,
    public idtipoconcepto?: number,
    public idatributo?: number,
    public idgeneral?: string
  ) {
    super(idgeneral);
  }
}

export class dat_rolconcepto extends AbstractEntity {
  constructor(
    public idrolconcepto: number,
    public rol: string,
    public idtipoconcepto?: number,
    public idgeneral?: string
  ) {
    super(idgeneral);
  }
}

export class nom_concepto extends AbstractEntity {
  constructor(
    public idconcepto: number,
    public idpadre: number,
    public denominacion: string,
    public nivel: number,
    public fechafin: string,
    public codigo: string,
    public visible: number,
    public idestructura: string,
    public orden: string,
    public idtipoconcepto?: number,
    public idgeneral?: string
  ) {
    super(idgeneral);
  }
}

export class dat_matrizrelacional extends AbstractEntity {
  constructor(
    public idrelacion: number,
    public fechafin: string,
    public idestructura: number,
    public idconceptorelacionado?: number,
    public idconceptopadre?: number,
    public idconceptopadrerel?: number,
    public idtipoconcepto?: number,
    public idgeneral?: string
  ) {
    super(idgeneral);
  }
}
