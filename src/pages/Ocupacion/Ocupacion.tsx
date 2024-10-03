import { useEffect, useState } from "react";

import GenericForm from "@/_pwa-framework/genforms/components/form-components/form.generic";
import Meta from "@/_pwa-framework/components/Meta";
import NotificationProvider from "@/_pwa-framework/sections/Notifications/provider";
import { TableView } from "@/_pwa-framework/user-solicitudes/view/user-view";
import { Typography } from "@mui/material";
import { crear } from "@/app/user-interfaces/forms/models/controllers";
import { datico } from "@/app/user-interfaces/forms/models/model";
import { getHogar } from "@/app/hogarController/hogar.controller";
import { obtenerMiembros } from "@/app/user-interfaces/forms/models/controllers.miembrohogar";
import { useLiveQuery } from "dexie-react-hooks";
import { useNavigate } from "react-router-dom";

function Ocupacion() {
  const [id, setid] = useState<any>(null);
  const idhogar = getHogar() ?? 0;
  const [trabajando, setTrabajando] = useState<any>([]);
  const [sintrabajar, setSinTrabajar] = useState<any>([]);
  const [ocupaciones, setOcupaciones] = useState<any>([]);
  const [miembros, setMiembros] = useState<any>([]);
  const [listo, setListo] = useState(false);
  const [checkocupaciones, checkSetOcupaciones] = useState<any>([]);

  useLiveQuery(async () => {
    const data = await obtenerMiembros();
    const miembros = data.filter((item) => item.edad > 15);
    setMiembros(miembros);
    const checkocupacion = await tieneOcupacion(miembros);

    checkSetOcupaciones(checkocupacion);
    setListo(miembros.length > 0);
  });

  const navegar = useNavigate();
  const siguiente = () => navegar("/ocupacion/no-vinculado");
  const anterior = () => navegar("/ingresos");
  const notificar = NotificationProvider();

  useEffect(() => {
    if (id) {
      onChangeMiembro();
    }
  }, [id]);
  async function tieneOcupacion(arr: any) {
    const result = await Promise.all(
      arr.map(async (obj: any) => {
        const ocupa = await datico.dat_miembroocupacion
          .where({ idmiembrohogar: [obj.idconcepto.toString()] })
          .count();
        if (ocupa > 0) {
          return obj.idconcepto.toString();
        } else {
          return 0;
        }
      })
    );
    const _result = result.filter((item) => item != 0);
    return _result;
  }
  const obtenerMiembroOcupacion = async () => {
    const datos = await datico.dat_miembroocupacion
      .where({ idmiembrohogar: [id.toString()] })
      .toArray();
    const element = datos.length
      ? { ...datos[0], editMode: true }
      : {
          idmiembrohogar: [id.toString()],
          idocupacion: "",
          idcodigohogar: "",
          idtipoocupacion: [],
          editMode: false,
        };

    return element;
  };

  const submitMiembroOcupacion = async (values: any) => {
    values.idtipoocupacion =
      values.idocupacion === "9328"
        ? values.idtipoocupacion?.filter((tipoOcupacion: any) => {
            return trabajando.find(
              (concepto: any) => concepto.idconcepto === tipoOcupacion
            );
          })
        : values.idtipoocupacion?.filter((tipoOcupacion: any) => {
            return sintrabajar.find(
              (concepto: any) => concepto.idconcepto === tipoOcupacion
            );
          });
    if (values.editMode) {
      await (datico as any)["dat_miembroocupacion"]
        .where("idmiembrohogar")
        .equals([id.toString()])
        .modify({
          idocupacion: values.idocupacion,
          idtipoocupacion:
            values.idocupacion == "9350" ? ["9350"] : values.idtipoocupacion,
          idmiembrohogar: [values.idmiembrohogar[0]],
          idcodigohogar: getHogar(),
        })
        .then(() =>
          notificar({
            type: "success",
            title:
              "La ocupaciones del miembro han sido modificadas correctamente",
            content: "",
          })
        );
    } else {
      crear("dat_miembroocupacion", {
        idocupacion: values.idocupacion,
        idtipoocupacion:
          values.idocupacion == "9350" ? ["9350"] : values.idtipoocupacion,
        idmiembrohogar: [values.idmiembrohogar[0]],
        idcodigohogar: getHogar(),
      });
      notificar({
        type: "success",
        title: "La ocupaciones del miembro han sido adicionada correctamente",
        content: "",
      });
    }
  };

  async function obtenerDatos(idmiembro: any) {
    const data = await datico.dat_miembroocupacion
      .where({ idmiembrohogar: [idmiembro] })
      .toArray();
    return data;
  }
  async function onChangeMiembro() {
    const datos = await obtenerDatos(id);
    if (datos.length) {
      setOcupaciones(datos[0].idtipoocupacion);
    } else {
      setOcupaciones([]);
    }
  }
  const data = useLiveQuery(async () => {
    const prueba = await (datico as any)["nom_concepto"]
      .where("idpadre")
      .equals("9328")
      .toArray();
    return prueba.filter((item: any) => item.idconcepto !== 9350);
  });

  const dataSinTrabajar = useLiveQuery(async () => {
    const prueba = await (datico as any)["nom_concepto"]
      .where("idpadre")
      .equals("9329")
      .toArray();
    return prueba.filter((item: any) => item.idconcepto !== 9350);
  });
  useEffect(() => {
    setTrabajando(data);
    console.log("Trabajando", data);
    setSinTrabajar(dataSinTrabajar);
  }, [data, dataSinTrabajar]);

  const ocupacion = ({
    name,
    setFieldValue,
    setFieldTouched,
    defaultValue,
    formValue,
  }: any) => (
    <TableView
      values={trabajando}
      disabled={false}
      headers={[{ name: "denominacion", label: "Ocupación" }]}
      idKey="idconcepto"
      name={name}
      selectedRows={formValue}
      setFieldValue={setFieldValue}
      setFieldTouched={setFieldTouched}
      multiSelect={true}
      useCheckBox={true}
      defaultValues={defaultValue}
      hideTableHead={true}
    />
  );
  const sinOcupacion = ({
    name,
    setFieldValue,
    setFieldTouched,
    defaultValue,
    formValue,
  }: any) => (
    <TableView
      values={sintrabajar}
      disabled={false}
      headers={[{ name: "denominacion", label: "Ocupación" }]}
      idKey="idconcepto"
      multiSelect={true}
      name={name}
      selectedRows={formValue}
      setFieldValue={setFieldValue}
      setFieldTouched={setFieldTouched}
      useCheckBox={true}
      defaultValues={defaultValue}
      hideTableHead={true}
    />
  );

  return (
    <>
      <Meta title="Controles" />
      {idhogar && listo ? (
        <GenericForm
          name="tesst"
          applyButton={false}
          controls={[
            {
              type: "select",
              name: "idmiembrohogar",
              label: "Miembro del hogar",
              validations: {
                required: {
                  message: "Este campo es obligatorio",
                },
              },
              gridValues: { xs: 12, lg: 8, md: 8, sm: 8, xl: 8 },
              onChange: (e: any) => {
                setid(`${e.target.value}`);
              },
              options: miembros,
              checkValues: checkocupaciones,
            },
            {
              type: "component",
              component: () => (
                <Typography>
                  Se pregunta a qué se dedican los miembros adultos del hogar,
                  sus actividades laborales, de estudios u otras, habituales y
                  tomando de referencia los últimos 6 meses
                </Typography>
              ),
              label: "",
              name: "",
              gridValues: { xs: 12, lg: 12, md: 12, sm: 12, xl: 12 },
              // hidden: (values: any) => values.idmiembrohogar == "",
            },
            {
              type: "radio",
              label: "",
              name: "idocupacion",
              radios: [
                { idconcepto: "9328", denominacion: "Trabajando" },
                { idconcepto: "9329", denominacion: "Sin Trabajar" },
                { idconcepto: "9350", denominacion: "NTNE" },
              ],
              direction: "row",
              validations: {
                required: { message: "Debe seleccionar una opción" },
              },
              labelPlacement: "end",
              gridValues: { xl: 12, lg: 12, md: 12, sm: 12, xs: 12 },
              onChangeCallback: (e, ref) => {
                 const { value } = e.target;
                if (value == "9350")
                  ref.setFieldValue("idtipoocupacion",[]);
                onChangeMiembro();
              },
            },
            {
              type: "component",
              component: ocupacion,
              label: "",
              name: "idtipoocupacion",
              gridValues: { xs: 12, lg: 12, md: 12, sm: 12, xl: 12 },
              hidden: (values: any) => {
                return (
                  values.idocupacion === "9329" ||
                  values.idmiembrohogar == "" ||
                  values.idocupacion === "9350" ||
                  values.idocupacion === "" ||
                  values.idocupacion === false
                );
              },
            },
            {
              type: "component",
              component: sinOcupacion,
              label: "",
              name: "idtipoocupacion",
              gridValues: { xs: 12, lg: 12, md: 12, sm: 12, xl: 12 },
              hidden: (values: any) => {
                return (
                  values.idocupacion === "9328" ||
                  values.idmiembrohogar == "" ||
                  values.idocupacion === "" ||
                  values.idocupacion === "9350" ||
                  values.idocupacion === false
                );
              },
            },
          ]}
          title="Ocupación de los miembros del hogar"
          description=""
          endpointPath="persona"
          showSpecificDescription={false}
          idForEdit={id}
          saveButton="Guardar"
          notifyValidation={(values) => {values.idtipoocupacion =
            values.idocupacion === "9328"
              ? values.idtipoocupacion?.filter((tipoOcupacion: any) => {
                  return trabajando.find(
                    (concepto: any) => concepto.idconcepto === tipoOcupacion
                  );
                })
              : values.idtipoocupacion?.filter((tipoOcupacion: any) => {
                  return sintrabajar.find(
                    (concepto: any) => concepto.idconcepto === tipoOcupacion
                  );
              });
            if (
              values.idtipoocupacion?.length < 1 &&
              values.idocupacion != "9350"
            )
              return "Debe tener al menos una ocupación seleccionada";
          }}
          submitFunction={submitMiembroOcupacion}
          getByIdFunction={obtenerMiembroOcupacion}
          nextButton={{ text: "Siguiente", action: siguiente }}
          prevButton={{ text: "Anterior", action: anterior }}
          nextDisabledFunction={() =>
            checkocupaciones.length != miembros.length
          }
        />
      ) : (
        <Typography variant="h6" p={2}>
          {idhogar
            ? " No existen miembros en el hogar seleccionado"
            : "No existe un hogar seleccionado"}
        </Typography>
      )}
    </>
  );
}

export default Ocupacion;
