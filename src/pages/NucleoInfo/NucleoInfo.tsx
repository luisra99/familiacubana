import { Button, Stack, Typography } from "@mui/material";
import {
  abrevNomenclador,
  cantidadhijos,
  cidentidad,
  datosGeneralesTitle,
  datosmoviles,
  divider,
  embarazada,
  idcolorpiel,
  idorientacionsex,
  idsexo,
  lactando,
  madremenor19,
  nota,
  otrosDatos,
  papellido,
  pnombre,
  registroconsum,
  sapellido,
  scanner,
  snombre,
  titleEscolaridad,
} from "./utils";
import {
  crear,
  descartarMiembro,
  eliminar,
  modificar,
  obtener,
  obtenerDatosPorLlave,
} from "@/app/user-interfaces/forms/models/controllers";
import { getHogar, setJefeHogar } from "@/app/hogarController/hogar.controller";

import CheckCircleRounded from "@mui/icons-material/CheckCircleRounded";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import GenericForm from "@/_pwa-framework/genforms/components/form-components/form.generic";
import { IGenericControls } from "@/_pwa-framework/genforms/types/controls/controls.types";
import Meta from "@/_pwa-framework/components/Meta";
import NotificationProvider from "@/_pwa-framework/sections/Notifications/provider";
import TableView from "@/_pwa-framework/user-solicitudes/view";
import { atomHogarActualJefe } from "@/_pwa-framework/sections/Sidebar/Sidebar";
import { datico as db } from "@/app/user-interfaces/forms/models/model";
import { mode } from "@/_pwa-framework/config";
import { useConfirm } from "material-ui-confirm";
import { useLiveQuery } from "dexie-react-hooks";
import useModalState from "@/_pwa-framework/hooks/form/use-form-manager";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { useState } from "react";

function Miembros() {
  const idhogar = getHogar() ?? 0;
  // hooks
  const [id, setid] = useState<any>(null);
  const [escolaridad, setEscolaridad] = useState<any>([]);
  const [_nivelescolarninguno, setNivelEscolarNinguno] = useState<any>([]);
  const [_nivelescolarprimaria, setNivelEscolarPrimaria] = useState<any>([]);
  const [_nivelescolarsecundaria, setNivelEscolarSecundaria] = useState<any>(
    []
  );
  const [_nivelescolarobrero, setNivelEscolarObrero] = useState<any>([]);
  const [_nivelescolarpreuniversitario, setNivelEscolarPreuniversitario] =
    useState<any>([]);
  const [_nivelescolarpedagogia, setNivelEscolarPedagogia] = useState<any>([]);
  const [_nivelescolartecnicomedio, setNivelEscolarTecnicomedio] =
    useState<any>([]);
  const [_nivelescolartecnicosuperior, setNivelEscolarTecnicosuperior] =
    useState<any>([]);
  const [_nivelescolaruniversitario, setNivelEscolarUniversitario] =
    useState<any>([]);
  const [miembros, setMiembros] = useState<any[]>([]);
  const [parentesco, setParentesco] = useState<any>([]);
  const [parentescoinit, setParentescoInit] = useState<any>([]);
  const [jefeNucleo, setJefeNucleo] = useState<boolean>(false);
  const [cantidadMiembros, setCantidadMiembros] = useState<boolean>(true);
  const [titleForm, setTitleForm] = useState<any>("");
  const [, setHogarActualJefe] = useRecoilState(atomHogarActualJefe);
  // form
  const disabledButton = () => {
    const personasFiltradas = miembros.filter(
      (item: any) => item.parentesco === "JN"
    );
    console.log("filtro", personasFiltradas);
    return !personasFiltradas.length;
  };
  const idnivelescolar: IGenericControls = {
    type: "radio",
    label: "¿Cuál es el último nivel vencido?",
    name: "idnivelescolar",
    radios: escolaridad?.escolaridad,
    gridValues: { xl: 5, lg: 5, md: 5, sm: 12, xs: 12 },
    onChangeCallback: (e, ref) => {
      const { value } = e.target;
      ref.setFieldValue("idnivelescolargrado", "", false);
      ref.setFieldValue("idgradovencido", "", false);
    },
  };
  const nivelescolarninguno: IGenericControls = {
    type: "radio",
    label: "¿Cuál es el grado más alto aprobado?",
    name: "idnivelescolargrado",
    radios: _nivelescolarninguno,
    gridValues: { xl: 5, lg: 5, md: 5, sm: 12, xs: 12 },
    hidden: (values: any) => values.idnivelescolar !== "9696",
  };
  const nivelescolarprimaria: IGenericControls = {
    type: "radio",
    label: "¿Cuál es el grado más alto aprobado?",
    name: "idnivelescolargrado",
    radios: _nivelescolarprimaria,
    gridValues: { xl: 5, lg: 5, md: 5, sm: 12, xs: 12 },
    hidden: (values: any) => values.idnivelescolar !== "9697",
  };
  const nivelescolarsecundaria: IGenericControls = {
    type: "radio",
    label: "¿Cuál es el grado más alto aprobado?",
    name: "idnivelescolargrado",
    radios: _nivelescolarsecundaria,
    gridValues: { xl: 5, lg: 5, md: 5, sm: 12, xs: 12 },
    hidden: (values: any) => values.idnivelescolar !== "9698",
  };
  const nivelescolarobrero: IGenericControls = {
    type: "radio",
    label: "¿Cuál es el grado más alto aprobado?",
    name: "idnivelescolargrado",
    radios: _nivelescolarobrero,
    gridValues: { xl: 5, lg: 5, md: 5, sm: 12, xs: 12 },
    hidden: (values: any) => values.idnivelescolar !== "9699",
  };
  const nivelescolarpreuniversitario: IGenericControls = {
    type: "radio",
    label: "¿Cuál es el grado más alto aprobado?",
    name: "idnivelescolargrado",
    radios: _nivelescolarpreuniversitario,
    gridValues: { xl: 5, lg: 5, md: 5, sm: 12, xs: 12 },
    hidden: (values: any) => values.idnivelescolar !== "9700",
  };
  const nivelescolarpedagogia: IGenericControls = {
    type: "radio",
    label: "¿Cuál es el grado más alto aprobado?",
    name: "idnivelescolargrado",
    radios: _nivelescolarpedagogia,
    gridValues: { xl: 5, lg: 5, md: 5, sm: 12, xs: 12 },
    hidden: (values: any) => values.idnivelescolar !== "9701",
  };
  const nivelescolartecnicomedio: IGenericControls = {
    type: "radio",
    label: "¿Cuál es el grado más alto aprobado?",
    name: "idnivelescolargrado",
    radios: _nivelescolartecnicomedio,
    gridValues: { xl: 5, lg: 5, md: 5, sm: 12, xs: 12 },
    hidden: (values: any) => values.idnivelescolar !== "9702",
  };
  const nivelescolartecnicosuperior: IGenericControls = {
    type: "radio",
    label: "¿Cuál es el grado más alto aprobado?",
    name: "idnivelescolargrado",
    radios: _nivelescolartecnicosuperior,
    gridValues: { xl: 5, lg: 5, md: 5, sm: 12, xs: 12 },
    hidden: (values: any) => values.idnivelescolar !== "9704",
  };
  const nivelescolaruniversitario: IGenericControls = {
    type: "radio",
    label: "¿Cuál es el grado más alto aprobado?",
    name: "idnivelescolargrado",
    radios: _nivelescolaruniversitario,
    gridValues: { xl: 5, lg: 5, md: 5, sm: 12, xs: 12 },
    hidden: (values: any) => values.idnivelescolar !== "9705",
  };
  const primaria: IGenericControls = {
    type: "radio",
    label: "Grado escolar",
    name: "idgradovencido",
    radios: escolaridad?.primaria,
    hidden: (values: any) => values.idnivelescolar !== "9696",
    gridValues: { xl: 2, lg: 2, md: 2, sm: 12, xs: 12 },
  };
  const secundaria: IGenericControls = {
    type: "radio",
    label: "Grado escolar",
    name: "idgradovencido",
    radios: escolaridad?.secundaria,
    hidden: (values: any) => values.idnivelescolargrado !== "9698",
    gridValues: { xl: 2, lg: 2, md: 2, sm: 12, xs: 12 },
  };
  const obrero: IGenericControls = {
    type: "radio",
    label: "Grado escolar",
    name: "idgradovencido",
    radios: escolaridad?.obrero,
    hidden: (values: any) => values.idnivelescolargrado !== "9699",
    gridValues: { xl: 2, lg: 2, md: 2, sm: 12, xs: 12 },
  };
  const preuniversitario: IGenericControls = {
    type: "radio",
    label: "Grado escolar",
    name: "idgradovencido",
    radios: escolaridad?.preuniversitario,
    hidden: (values: any) => values.idnivelescolargrado !== "9700",
    gridValues: { xl: 2, lg: 2, md: 2, sm: 12, xs: 12 },
  };
  const pedagogia: IGenericControls = {
    type: "radio",
    label: "Grado escolar",
    name: "idgradovencido",
    radios: escolaridad?.pedagogia,
    hidden: (values: any) => values.idnivelescolargrado !== "9701",
    gridValues: { xl: 2, lg: 2, md: 2, sm: 12, xs: 12 },
  };
  const tecnicomedio: IGenericControls = {
    type: "radio",
    label: "Grado escolar",
    name: "idgradovencido",
    radios: escolaridad?.tecnicomedio,
    hidden: (values: any) => values.idnivelescolargrado !== "9702",
    gridValues: { xl: 2, lg: 2, md: 2, sm: 12, xs: 12 },
  };
  const tecnicosuperior: IGenericControls = {
    type: "radio",
    label: "Grado escolar",
    name: "idgradovencido",
    radios: escolaridad?.tecnicosuperior,
    hidden: (values: any) => values.idnivelescolargrado !== "9704",
    gridValues: { xl: 2, lg: 2, md: 2, sm: 12, xs: 12 },
  };
  const universitario: IGenericControls = {
    type: "radio",
    label: "Grado escolar",
    name: "idgradovencido",
    radios: escolaridad?.universitario,
    hidden: (values: any) => values.idnivelescolargrado !== "9705",
    gridValues: { xl: 2, lg: 2, md: 2, sm: 12, xs: 12 },
  };
  const idparentesco: IGenericControls = {
    type: "select",
    label: "Parentesco",
    gridValues: { xl: 4, lg: 4, md: 4, sm: 12, xs: 12 },
    name: "idparentesco",
    // url: "9269",
    options: parentesco,
    validations: {
      required: { message: "Este campo es obligatorio" },
    },
  };

  const formulario: IGenericControls[] = [
    datosGeneralesTitle,
    pnombre,
    snombre,
    papellido,
    sapellido,
    cidentidad,
    scanner,
    idcolorpiel,
    nota,
    idparentesco,
    idsexo,
    idorientacionsex,
    divider,
    titleEscolaridad,
    idnivelescolar,
    nivelescolarprimaria,
    nivelescolarsecundaria,
    nivelescolarobrero,
    nivelescolarpreuniversitario,
    nivelescolarpedagogia,
    nivelescolartecnicomedio,
    nivelescolartecnicosuperior,
    primaria,
    secundaria,
    obrero,
    preuniversitario,
    pedagogia,
    tecnicomedio,
    tecnicosuperior,
    universitario,
    divider,
    otrosDatos,
    datosmoviles,
    registroconsum,
    embarazada,
    lactando,
    madremenor19,
    cantidadhijos,
  ];
  // utils
  const { modalActions } = useModalState();
  const navegar = useNavigate();
  const siguiente = () => navegar("/ingresos");
  const anterior = () => navegar("/datos-hogar");
  const notificar = NotificationProvider();
  const confirm = useConfirm();

  // data

  function getAbreviatura(idconcepto?: number, grado?: string) {
    if (typeof idconcepto === "undefined") {
      return "";
    } else {
      if (grado) {
        return `${abrevNomenclador[idconcepto.toString()]} (${grado})`;
      } else {
        return abrevNomenclador[idconcepto.toString()];
      }
    }
  }
  async function validarEstadoHogar() {
    const id = parseInt(String(idhogar));
    const hogarActual = await db.dat_hogar.where({ idcodigohogar: id }).first();
    // console.info(hogarActual);
    if (hogarActual?.idestado != 3 && hogarActual?.idestado != 4) {
      const idestado = cantidadMiembros ? 2 : 1;
      db.dat_hogar
        .where("idcodigohogar")
        .equals(id)
        .modify({ idestado: idestado });
    }
  }
  async function unionNomenclador(arr: any) {
    const join = await Promise.all(
      arr.map(async (obj: any) => {
        // ;
        const colorpiel = await db.nom_concepto.get(
          parseInt(obj?.idcolorpiel[0] ?? 0)
        );
        const nivelescolar = await db.nom_concepto.get(
          parseInt(obj.idnivelescolar ? obj.idnivelescolar : 0)
        );
        const gradoscolar = await db.nom_concepto.get(
          parseInt(obj.idnivelescolargrado ? obj.idnivelescolargrado : 0)
        );
        const gradovencido = await db.nom_concepto.get(
          parseInt(obj.idgradovencido ? obj.idgradovencido : 0)
        );
        const parentesco = await db.nom_concepto.get(
          parseInt(obj?.idparentesco[0] ?? 0)
        );
        const sexo = await db.nom_concepto.get(parseInt(obj?.idsexo[0] ?? 0));
        return {
          ...obj,
          colorpiel: getAbreviatura(colorpiel?.idconcepto),
          nivelescolar: getAbreviatura(nivelescolar?.idconcepto),
          gradoscolar: getAbreviatura(
            gradoscolar?.idconcepto,
            gradovencido?.denominacion
          ),
          parentesco:
            parentesco?.idconcepto == 9270
              ? parentesco?.denominacion
              : getAbreviatura(parentesco?.idconcepto),
          sexo: getAbreviatura(sexo?.idconcepto),
        };
      })
    );
    return join;
  }
  useLiveQuery(async () => {
    // // nomencladores
    async function nomenclador(idpadre: string) {
      const data = await db.nom_concepto.where({ idpadre: idpadre }).toArray();
      return data;
    }
    const data: any = {};
    data["escolaridad"] = await nomenclador("9287");
    data["primaria"] = await nomenclador("9697");
    data["secundaria"] = await nomenclador("9698");
    data["obrero"] = await nomenclador("9699");
    data["preuniversitario"] = await nomenclador("9700");
    data["pedagogia"] = await nomenclador("9701");
    data["tecnicomedio"] = await nomenclador("9702");
    data["tecnicosuperior"] = await nomenclador("9704");
    data["universitario"] = await nomenclador("9705");
    setEscolaridad(data);
    const nivelescolarninguno = data.escolaridad.filter((obj: any) => {
      return obj.idconcepto == 9697;
    });
    const nivelescolarprimaria = data.escolaridad.filter((obj: any) => {
      return obj.idconcepto == 9698 || obj.idconcepto == 9699;
    });
    const nivelescolarsecundaria = data.escolaridad.filter((obj: any) => {
      return (
        obj.idconcepto == 9699 ||
        obj.idconcepto == 9700 ||
        obj.idconcepto == 9701 ||
        obj.idconcepto == 9702
      );
    });
    const nivelescolarobrero = data.escolaridad.filter((obj: any) => {
      return obj.idconcepto == 9702 || obj.idconcepto == 9704;
    });
    const nivelescolarpreuniversitario = data.escolaridad.filter((obj: any) => {
      return obj.idconcepto == 9705;
    });
    const nivelescolarpedagogia = data.escolaridad.filter((obj: any) => {
      return obj.idconcepto == 9705;
    });
    const nivelescolartecnicomedio = data.escolaridad.filter((obj: any) => {
      return obj.idconcepto == 9705;
    });
    const nivelescolartecnicosuperior = data.escolaridad.filter((obj: any) => {
      return obj.idconcepto == 9705;
    });
    const nivelescolaruniversitario = data.escolaridad.filter((obj: any) => {
      return obj.idconcepto == 9705;
    });
    setNivelEscolarNinguno(nivelescolarninguno);
    setNivelEscolarPrimaria(nivelescolarprimaria);
    setNivelEscolarSecundaria(nivelescolarsecundaria);
    setNivelEscolarObrero(nivelescolarobrero);
    setNivelEscolarPreuniversitario(nivelescolarpreuniversitario);
    setNivelEscolarPedagogia(nivelescolarpedagogia);
    setNivelEscolarTecnicomedio(nivelescolartecnicomedio);
    setNivelEscolarTecnicosuperior(nivelescolartecnicosuperior);
    setNivelEscolarUniversitario(nivelescolaruniversitario);
    // miembros
    const miembros: any = await db.dat_miembrohogar
      .where({ idcodigohogar: idhogar })
      .toArray()
      .then((arr) =>
        arr.map((obj) => {
          const nombreyapellidos = `${obj.pnombre} ${obj.snombre ?? ""} ${
            obj.papellido
          } ${obj.sapellido}`;
          return {
            ...obj,
            nombreyapellidos: nombreyapellidos,
            jefehogar: "",
          };
        })
      );
    let jefeHogar = undefined;
    const indexJefeHogar = miembros.findIndex((obj: any) => {
      return obj?.idparentesco[0] == "9270";
    });
    if (indexJefeHogar != -1) {
      jefeHogar = miembros[indexJefeHogar];
      miembros[indexJefeHogar]["jefehogar"] = (
        <CheckCircleRounded color="primary" />
      );
      setJefeNucleo(true);
    } else {
      setJefeNucleo(false);
    }
    let parentesco = await nomenclador("9269");
    setParentesco(parentesco);
    setParentescoInit(parentesco);
    const jefehogar = jefeHogar
      ? `${jefeHogar.pnombre} ${jefeHogar.snombre ?? ""} ${
          jefeHogar.papellido
        } ${jefeHogar.sapellido}`
      : "";
    setJefeHogar(jefehogar);
    setHogarActualJefe(jefehogar);
    let unionMiembros = await unionNomenclador(miembros);
    unionMiembros.sort(
      (a, b) => parseInt(a.idparentesco[0]) - parseInt(b.idparentesco[0])
    );
    unionMiembros = unionMiembros.map((obj) => {
      let registroconsumidor: any = "";
      if (obj.registroconsum[0] == "1") {
        registroconsumidor = <CheckCircleRounded color="primary" />;
      }
      // carnet de identidad
      // extraer los primeros 6 dígitos
      const edad = calcularEdadByCi(obj.cidentidad);
      mode && console.log(`La edad calculada es: ${edad} años`);
      return {
        ...obj,
        registroconsumidor: registroconsumidor,
        edad: edad == 0 ? "M" : edad,
      };
    });
    setCantidadMiembros(unionMiembros.length == 0);
    console.log(
      unionMiembros.map((miembro) => {
        return {
          ...miembro,
          parentesco:
            miembro.parentesco === "Jefe(a) de hogar"
              ? "JN"
              : miembro.parentesco,
        };
      })
    );
    setMiembros(
      unionMiembros.map((miembro) => {
        return {
          ...miembro,
          parentesco:
            miembro.parentesco === "Jefe(a) de hogar"
              ? "JN"
              : miembro.parentesco,
        };
      })
    );
  });

  function getFormularioTable() {
    if (idhogar) {
      return (
        <GenericForm
          title="Información general de los miembros del hogar"
          name="formularioTable"
          endpointPath=""
          controls={[
            {
              type: "component",
              component: () => (
                <Stack
                  direction="row"
                  display={"inline-list-item"}
                  justifyContent="flex-start"
                  sx={{ width: "100%" }}
                >
                  <Button
                    onClick={() => {
                      setTitleForm("Adicionar miembro del hogar");
                      if (jefeNucleo) {
                        const filter = parentesco.filter(
                          (item: any) => item.idconcepto !== 9270
                        );
                        setParentesco(filter);
                      }
                      modalActions.open("formularioMiembro");
                    }}
                    variant="contained"
                  >
                    Adicionar
                  </Button>
                </Stack>
              ),
              label: "",
              name: "",
              gridValues: { xs: 12, lg: 12, md: 12, sm: 12, xl: 12 },
            },
            {
              type: "component",
              component: () => (
                <TableView
                  values={miembros}
                  headers={[
                    // { name: "cidentidad", label: "Ci" },
                    { name: "nombreyapellidos", label: "Nombre y apellidos" },
                    // { name: "jefehogar", label: "Jefe de hogar" },
                    {
                      name: "parentesco",
                      label: "Parentesco",
                      align: "center",
                    },
                    {
                      name: "colorpiel",
                      label: "Color de la piel",
                      align: "center",
                    },
                    {
                      name: "nivelescolar",
                      label: "Nivel Escolar",
                      align: "center",
                    },
                    // { name: "gradoscolar", label: "Grado Aprob" },
                    { name: "edad", label: "Edad", align: "center" },
                    { name: "sexo", label: "Sexo", align: "center" },
                    {
                      name: "registroconsumidor",
                      label: "Reg. Consumidor",
                      align: "center",
                    },
                  ]}
                  idKey="idmiembrohogar"
                  multiSelect={true}
                  rowActions={[
                    {
                      label: "Modificar",
                      action: async (values: any) => {
                        setid(values.idmiembrohogar);
                        setTitleForm("Modificar miembro del hogar");
                        if (jefeNucleo && values.idparentesco[0] !== "9270") {
                          const filter = parentesco.filter(
                            (item: any) => item.idconcepto !== 9270
                          );
                          setParentesco(filter);
                        } else {
                          setParentesco(parentescoinit);
                        }
                        modalActions.open("formularioMiembro");
                      },
                      icon: EditIcon,
                    },
                    {
                      label: "Eliminar",
                      action: (values: any) => {
                        confirm({
                          title: "Eliminar",
                          confirmationText: "Aceptar",
                          cancellationText: "Cancelar",
                          description: `¿Está seguro que desea eliminar el miembro del hogar seleccionado?`,
                        }).then(() => {
                          descartarMiembro(values.idmiembrohogar);
                          eliminar(
                            "dat_miembrohogar",
                            "idmiembrohogar",
                            values.idmiembrohogar
                          ).then(() => {
                            notificar({
                              type: "success",
                              title:
                                "El miembro del hogar ha sido eliminado satisfactoriamente",
                            });
                            // validarEstadoHogar();
                          });
                        });
                      },
                      icon: DeleteIcon,
                    },
                  ]}
                  useCheckBox={false}
                />
              ),
              label: "",
              name: "",
              gridValues: { xs: 12, lg: 12, md: 12, sm: 12, xl: 12 },
            },
          ]}
          hideButtons={true}
        />
      );
    } else {
      return (
        <Typography mx={2} my={2}>
          <b>No existe un hogar seleccionado</b>
        </Typography>
      );
    }
  }

  function getFormularioMiembro() {
    return (
      <GenericForm
        name="formularioMiembro"
        controls={formulario}
        title={titleForm}
        endpointPath="miembro"
        showSpecificDescription={true}
        idForEdit={id}
        setIdFunction={setid}
        modalType="fullWith"
        // descriptionOnCreate="Adicionar"
        // descriptionOnEdit="Modificar"
        submitFunction={(values: any) => {
          if (id) {
            const _values = {
              ...values,
              idcodigohogar: idhogar,
              edad: calcularEdadByCi(values.cidentidad),
            };
            modificar("dat_miembrohogar", "idmiembrohogar", id, _values).then(
              () => {
                notificar({
                  type: "success",
                  title:
                    "Los miembro del hogar ha sido modificado satisfactoriamente",
                  content: "",
                });
                // validarEstadoHogar();
              }
            );
          } else {
            // ;
            const _values = {
              ...values,
              idcodigohogar: idhogar,
              edad: calcularEdadByCi(values.cidentidad),
            };
            crear("dat_miembrohogar", _values).then(() => {
              notificar({
                type: "success",
                title:
                  "El miembro del hogar ha sido adicionado satisfactoriamente",
              });
              validarEstadoHogar();
            });
          }
        }}
        notifyValidation={async (values: any) => {
          const error = await obtener("dat_miembrohogar", {
            cidentidad: values.cidentidad,
          });
          if (error && !values.editMode)
            return "Ya existe una persona registrada con este carnet de identidad";
          const edad = calcularEdadByCi(values.cidentidad);
          console.log(edad, values);
          if (
            edad > 6 &&
            (!values.idnivelescolar || values.idnivelescolar.length < 1)
          )
            return "El campo Datos de Escolaridad es obligatorio para mayores de 6 años";
          // if (condicion) {
          //   lo q pasa si se cumple
          // }
          // else {
          //   lo q pasa sino se cumple
          // }
        }}
        getByIdFunction={async (id) => {
          const arr = await obtenerDatosPorLlave(
            "dat_miembrohogar",
            "idmiembrohogar",
            id
          );
          const obj = { ...arr[0], editMode: true };
          return obj;
        }}
      />
    );
  }

  function getToolBar() {
    if (idhogar) {
      return (
        <Stack
          direction="row"
          mx={"auto"}
          my={2}
          px={3}
          display={"inline-list-item"}
          justifyContent="flex-end"
          sx={{ width: "100%" }}
        >
          <Button
            onClick={anterior}
            variant="contained"
            sx={{ marginRight: "5px" }}
          >
            Anterior
          </Button>
          <Button
            onClick={siguiente}
            variant="contained"
            disabled={disabledButton()}
          >
            Siguiente
          </Button>
        </Stack>
      );
    }
  }

  return (
    <>
      <Meta title="Miembros del hogar" />

      {getFormularioTable()}

      {getFormularioMiembro()}

      {getToolBar()}
    </>
  );
}

export default Miembros;
export function calcularEdadByCi(ci: string) {
  if (ci?.length === 11) {
    let fechaNacStr = ci.substring(0, 6);
    // convertir la cadena de fecha en un objeto Date
    let año = parseInt(fechaNacStr.substring(0, 2)) + 1900;
    let mes = parseInt(fechaNacStr.substring(2, 4)) - 1;
    let día = parseInt(fechaNacStr.substring(4, 6));
    let fechaNac = new Date(año, mes, día);
    let hoy = new Date();
    // calcular la diferencia en años
    let edad = hoy.getFullYear() - fechaNac.getFullYear();
    // ajustar la edad si aún no ha llegado el cumpleaños del año actual
    if (
      hoy.getMonth() < fechaNac.getMonth() ||
      (hoy.getMonth() === fechaNac.getMonth() &&
        hoy.getDate() < fechaNac.getDate())
    ) {
      edad--;
    }
    // siglo XIX  9
    // siglo XX 0-5
    // siglo XXI 6-8
    const siglo = parseInt(ci.at(6) ?? "10");
    if (edad >= 100 && siglo >= 6 && siglo <= 8) {
      edad -= 100;
    }
    return edad;
  } else {
    return 0;
  }
}
