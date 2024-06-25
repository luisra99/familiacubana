import { Button, Stack, Typography, Divider } from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import GenericForm from "@/_pwa-framework/genforms/components/form-components/form.generic";
import Meta from "@/_pwa-framework/components/Meta";
import TableView from "@/_pwa-framework/user-solicitudes/view";
import useModalState from "@/_pwa-framework/hooks/form/use-form-manager";
import NotificationProvider from "@/_pwa-framework/sections/Notifications/provider";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { getHogar } from "@/app/hogarController/hogar.controller";

import {
  crear,
  eliminar,
  modificar,
  obtenerDatosPorLlave,
} from "@/app/user-interfaces/forms/models/controllers";

import { datico as db } from "@/app/user-interfaces/forms/models/model";
import { useLiveQuery } from "dexie-react-hooks";

import { IGenericControls } from "@/_pwa-framework/genforms/types/controls/controls.types";

function Miembros() {
  const idhogar = getHogar() ?? 0;
  // hooks
  const [id, setid] = useState<any>(null);
  const [escolaridad, setEscolaridad] = useState<any>(null);
  const [miembros, setMiembros] = useState<any>([]);
  const [titleForm, setTitleForm] = useState<any>("");
  // form
  const pnombre: IGenericControls = {
    type: "text",
    label: "Nombre",
    name: "pnombre",
    pattern: /[A-z]/,
    gridValues: { xl: 6, lg: 6, md: 6, sm: 12, xs: 12 },
    // validations: { required: { message: "Campo obligatorio" } },
  };
  const snombre: IGenericControls = {
    type: "text",
    label: "Segundo nombre",
    name: "snombre",
    pattern: /[A-z]/,
    gridValues: { xl: 6, lg: 6, md: 6, sm: 12, xs: 12 },
  };
  const papellido: IGenericControls = {
    type: "text",
    label: "Primer apellido",
    name: "papellido",
    pattern: /[A-z]/,
    gridValues: { xl: 6, lg: 6, md: 6, sm: 12, xs: 12 },
  };
  const sapellido: IGenericControls = {
    type: "text",
    label: "Segundo apellido",
    name: "sapellido",
    pattern: /[A-z]/,
    gridValues: { xl: 6, lg: 6, md: 6, sm: 12, xs: 12 },
  };
  const cidentidad: IGenericControls = {
    type: "text",
    label: "Carnet de identidad",
    name: "cidentidad",
    gridValues: { xl: 4, lg: 4, md: 4, sm: 12, xs: 12 },
    pattern: /[0-9]/,
  };
  const edad: IGenericControls = {
    type: "number",
    label: "Edad",
    gridValues: { xl: 4, lg: 4, md: 4, sm: 12, xs: 12 },
    name: "edad",
    format: "other",
    // validations: { length: { value: 0, message: "Edad incorrecta" } },
  };
  const idcolorpiel: IGenericControls = {
    type: "select",
    label: "Color de piel",
    name: "idcolorpiel",
    gridValues: { xl: 4, lg: 4, md: 4, sm: 12, xs: 12 },
    url: "9280",
  };
  const idnivelescolar: IGenericControls = {
    type: "radio",
    label: "¿Cuál es el nivel de estudio más alto que terminó?",
    name: "idnivelescolar",
    radios: escolaridad?.escolaridad,
    gridValues: { xl: 6, lg: 6, md: 6, sm: 12, xs: 12 },
  };
  const primaria: IGenericControls = {
    type: "radio",
    label: "Grado",
    name: "idgradovencido",
    radios: escolaridad?.primaria,
    disabled: (values) => values.idnivelescolar !== "9697",
    gridValues: { xl: 6, lg: 6, md: 6, sm: 12, xs: 12 },
  };
  const secundaria: IGenericControls = {
    type: "radio",
    label: "Grado",
    name: "idgradovencido",
    radios: escolaridad?.secundaria,
    disabled: (values) => values.idnivelescolar !== "9698",
    gridValues: { xl: 6, lg: 6, md: 6, sm: 12, xs: 12 },
  };
  const obrero: IGenericControls = {
    type: "radio",
    label: "Grado",
    name: "idgradovencido",
    radios: escolaridad?.obrero,
    disabled: (values) => values.idnivelescolar !== "9699",
    gridValues: { xl: 6, lg: 6, md: 6, sm: 12, xs: 12 },
  };
  const preuniversitario: IGenericControls = {
    type: "radio",
    label: "Grado",
    name: "idgradovencido",
    radios: escolaridad?.preuniversitario,
    disabled: (values) => values.idnivelescolar !== "9700",
    gridValues: { xl: 6, lg: 6, md: 6, sm: 12, xs: 12 },
  };
  const pedagogia: IGenericControls = {
    type: "radio",
    label: "Grado",
    name: "idgradovencido",
    radios: escolaridad?.pedagogia,
    disabled: (values) => values.idnivelescolar !== "9701",
    gridValues: { xl: 6, lg: 6, md: 6, sm: 12, xs: 12 },
  };
  const tecnicomedio: IGenericControls = {
    type: "radio",
    label: "Grado",
    name: "idgradovencido",
    radios: escolaridad?.tecnicomedio,
    disabled: (values) => values.idnivelescolar !== "9702",
    gridValues: { xl: 6, lg: 6, md: 6, sm: 12, xs: 12 },
  };
  const tecnicosuperior: IGenericControls = {
    type: "radio",
    label: "Grado",
    name: "idgradovencido",
    radios: escolaridad?.tecnicosuperior,
    disabled: (values) => values.idnivelescolar !== "9704",
    gridValues: { xl: 6, lg: 6, md: 6, sm: 12, xs: 12 },
  };
  const universitario: IGenericControls = {
    type: "radio",
    label: "Grado",
    name: "idgradovencido",
    radios: escolaridad?.universitario,
    disabled: (values) => values.idnivelescolar !== "9705",
    gridValues: { xl: 6, lg: 6, md: 6, sm: 12, xs: 12 },
  };
  const idparentesco: IGenericControls = {
    type: "select",
    label: "Parentesco",
    gridValues: { xl: 4, lg: 4, md: 4, sm: 12, xs: 12 },
    name: "idparentesco",
    url: "9269",
  };
  const idsexo: IGenericControls = {
    type: "select",
    label: "Sexo",
    name: "idsexo",
    gridValues: { xl: 4, lg: 4, md: 4, sm: 12, xs: 12 },
    url: "9284",
  };
  const idorientacionsex: IGenericControls = {
    type: "select",
    label: "Orientación sexual",
    gridValues: { xl: 4, lg: 4, md: 4, sm: 12, xs: 12 },
    name: "idorientacionsex",
    url: "10210",
  };
  const registroconsum: IGenericControls = {
    type: "select",
    label: "¿Miembro en el registro de consumidores?",
    gridValues: { xl: 6, lg: 6, md: 6, sm: 12, xs: 12 },
    name: "registroconsum",
    options: [
      { idconcepto: "1", denominacion: "Sí" },
      { idconcepto: "2", denominacion: "No" },
    ],
  };
  const datosmoviles: IGenericControls = {
    type: "select",
    label: "¿Tiene plan de datos en el teléfono móvil?",
    gridValues: { xl: 6, lg: 6, md: 6, sm: 12, xs: 12 },
    name: "datosmoviles",
    options: [
      { idconcepto: "1", denominacion: "Sí" },
      { idconcepto: "2", denominacion: "No" },
    ],
  };
  const embarazada: IGenericControls = {
    type: "select",
    label: "¿Se encuentra embarazada?",
    gridValues: { xl: 3, lg: 3, md: 3, sm: 12, xs: 12 },
    name: "estaembarazada",
    disabled: (values) => values.idsexo != "9285",
    options: [
      { idconcepto: "1", denominacion: "Sí" },
      { idconcepto: "2", denominacion: "No" },
    ],
  };
  const lactando: IGenericControls = {
    type: "select",
    label: "¿Se encuentra lactando?",
    gridValues: { xl: 3, lg: 3, md: 3, sm: 12, xs: 12 },
    name: "lactando",
    options: [
      { idconcepto: "1", denominacion: "Sí" },
      { idconcepto: "2", denominacion: "No" },
    ],
    disabled: (values) => values.idsexo != "9285",
  };
  const madremenor19: IGenericControls = {
    type: "select",
    label: "¿Fue madre antes de los 19?",
    gridValues: { xl: 3, lg: 3, md: 3, sm: 12, xs: 12 },
    name: "madremenor19",
    options: [
      { idconcepto: "1", denominacion: "Sí" },
      { idconcepto: "2", denominacion: "No" },
    ],
    disabled: (values) => values.idsexo != "9285",
  };
  const cantidadhijos: IGenericControls = {
    type: "text",
    label: "Cantidad de hijos",
    pattern: /[0-9]/,
    gridValues: { xl: 3, lg: 3, md: 3, sm: 12, xs: 12 },
    name: "cantidadhijos",
    disabled: (values) => values.idsexo != "9285",
  };
  const formulario: IGenericControls[] = [
    {
      type: "component",
      component: () => (
        <Typography>
          <b>Datos generales</b>
        </Typography>
      ),
      label: "",
      name: "",
      gridValues: { xs: 12, lg: 12, md: 12, sm: 12, xl: 12 },
    },
    pnombre,
    snombre,
    papellido,
    sapellido,
    cidentidad,
    edad,
    idcolorpiel,
    {
      type: "component",
      component: () => <Divider sx={{ mt: 0, mb: 1 }} />,
      label: "",
      name: "",
      gridValues: { xs: 12, lg: 12, md: 12, sm: 12, xl: 12 },
    },
    {
      type: "component",
      component: () => (
        <Typography>
          <b>Datos de escolaridad</b>
        </Typography>
      ),
      label: "",
      name: "",
      gridValues: { xs: 12, lg: 12, md: 12, sm: 12, xl: 12 },
    },
    idnivelescolar,
    primaria,
    secundaria,
    obrero,
    preuniversitario,
    pedagogia,
    tecnicomedio,
    tecnicosuperior,
    universitario,
    {
      type: "component",
      component: () => <Divider sx={{ mt: 0, mb: 1 }} />,
      label: "",
      name: "",
      gridValues: { xs: 12, lg: 12, md: 12, sm: 12, xl: 12 },
    },
    {
      type: "component",
      component: () => (
        <Typography>
          <b>Otros datos</b>
          <br></br>
          Nota aclaratoria:
          <br></br>. El parentesco se establece con relación al jefe o la jefa
          de hogar
          <br></br>. Si al preguntar el sexo la persona no responde femenino o
          masculino selecciona la opción correspondiente a Orientación sexual
        </Typography>
      ),
      label: "",
      name: "",
      gridValues: { xs: 12, lg: 12, md: 12, sm: 12, xl: 12 },
    },
    idparentesco,
    idsexo,
    idorientacionsex,
    embarazada,
    lactando,
    madremenor19,
    cantidadhijos,
    datosmoviles,
    registroconsum,
  ];
  // utils
  const { modalActions } = useModalState();
  const navegar = useNavigate();
  const siguiente = () => navegar("/ingresos");
  const anterior = () => navegar("/datos-hogar");
  const notificar = NotificationProvider();
  // data
  async function unionNomenclador(arr: any) {
    const join = await Promise.all(
      arr.map(async (obj: any) => {
        // console.log(obj);
        const colorpiel = await db.nom_concepto.get(
          parseInt(obj?.idcolorpiel[0] ?? 0)
        );
        const nivelescolar = await db.nom_concepto.get(
          parseInt(obj.idnivelescolar ? obj.idnivelescolar : 0)
        );
        const gradoscolar = await db.nom_concepto.get(
          parseInt(obj.idgradovencido ? obj.idgradovencido : 0)
        );
        const parentesco = await db.nom_concepto.get(
          parseInt(obj?.idparentesco[0] ?? 0)
        );
        const sexo = await db.nom_concepto.get(parseInt(obj?.idsexo[0] ?? 0));
        return {
          ...obj,
          colorpiel: colorpiel?.denominacion,
          nivelescolar: nivelescolar?.denominacion,
          gradoscolar: gradoscolar?.denominacion,
          parentesco: parentesco?.denominacion,
          sexo: sexo?.denominacion,
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
    // miembros
    const miembros = await db.dat_miembrohogar
      .where({ idcodigohogar: idhogar })
      .toArray()
      .then((arr) =>
        arr.map((obj) => {
          const nombreyapellidos = `${obj.pnombre} ${obj.snombre} ${obj.papellido} ${obj.sapellido}`;
          return { ...obj, nombreyapellidos: nombreyapellidos };
        })
      );
    const unionMiembros = await unionNomenclador(miembros);
    console.log(unionMiembros);
    setMiembros(unionMiembros);
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
                    { name: "cidentidad", label: "Ci" },
                    { name: "nombreyapellidos", label: "Nombre y apellidos" },
                    { name: "jefehogar", label: "Jefe de hogar" },
                    { name: "parentesco", label: "Parentesco" },
                    { name: "colorpiel", label: "Color de la piel" },
                    { name: "nivelescolar", label: "Nivel Escolar" },
                    { name: "gradoscolar", label: "Grado Aprob" },
                    { name: "edad", label: "Edad" },
                    { name: "sexo", label: "Sexo" },
                  ]}
                  idKey="idmiembrohogar"
                  title=""
                  multiSelect={true}
                  rowActions={[
                    {
                      label: "Modificar",
                      action: (values: any) => {
                        // console.log(values);
                        setid(values.idmiembrohogar);
                        setTitleForm("Adicionar miembro del hogar");
                        modalActions.open("formularioMiembro");
                      },
                      icon: EditIcon,
                    },
                    {
                      label: "Eliminar",
                      action: (values: any) =>
                        eliminar(
                          "dat_miembrohogar",
                          "idmiembrohogar",
                          values.idmiembrohogar
                        ),
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
          <b>No hay un hogar seleccionado...</b>
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
        submitFunction={(values) => {
          if (id) {
            modificar("dat_miembrohogar", "idmiembrohogar", id, values).then(
              () => {
                notificar({
                  type: "success",
                  title: "Miembro del hogar",
                  content: "Ha sido modificado correctamente",
                });
              }
            );
          } else {
            console.log(values);
            const _values = {
              ...values,
              idcodigohogar: idhogar,
            };
            crear("dat_miembrohogar", _values).then(() =>
              notificar({
                type: "success",
                title: "Miembro del hogar",
                content: "Ha sido adicionado correctamente",
              })
            );
          }
        }}
        getByIdFunction={async (id) =>
          obtenerDatosPorLlave("dat_miembrohogar", "idmiembrohogar", id)
        }
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
          <Button onClick={siguiente} variant="contained">
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
