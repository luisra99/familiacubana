import GenericForm from "@/_pwa-framework/genforms/components/form-components/form.generic";
import Meta from "@/_pwa-framework/components/Meta";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  crear,
  modificar,
  obtenerDatosPorLlave,
} from "@/app/user-interfaces/forms/models/controllers";
import { useLiveQuery } from "dexie-react-hooks";
import { datico } from "@/app/user-interfaces/forms/models/model";
import { getHogar } from "@/app/hogarController/hogar.controller";
import { obtenerMiembros } from "@/app/user-interfaces/forms/models/controllers.miembrohogar";
import { TableView } from "@/_pwa-framework/user-solicitudes/view/user-view";
import NotificationProvider from "@/_pwa-framework/sections/Notifications/provider";
import { IGenericControls } from "@/_pwa-framework/genforms/types/controls/controls.types";
import { Typography } from "@mui/material";

function Ocupacion() {
  const [id, setid] = useState<any>(null);
  const idhogar = getHogar() ?? 0;
  const [trabajando, setTrabajando] = useState<any>([]);
  const [sintrabajar, setSinTrabajar] = useState<any>([]);
  const [idmiembrohogar, setIdMiembroHogar] = useState<any>(0);
  const [ocupaciones, setOcupaciones] = useState<any>([]);
  const [miembros, setMiembros] = useState<any>([]);

  const navegar = useNavigate();
  const siguiente = () => navegar("/ocupacion/no-vinculado");
  const anterior = () => navegar("/ingresos");
  const notificar = NotificationProvider();

  console.log("miembrosOrlando", miembros);
  console.log("IdMHogar", idmiembrohogar);
  console.log("ocupaciones", ocupaciones);

  const getIdTipoOcupacion = [9333];

  useLiveQuery(async () => {
    const data = await obtenerMiembros();
    setMiembros(data);
  });

  async function unionNomenclador(arr: any) {
    console.log("array", arr);
    const join = await Promise.all(
      arr.map(async (obj: any) => {
        const ocupacion = await datico.nom_concepto.get(
          parseInt(obj?.idocupacion ?? 0)
        );

        return {
          ...obj,
          ocupacion: ocupacion?.denominacion,
        };
      })
    );

    return join;
  }
  async function obtenerDatos(idmiembro: any) {
    const data = await datico.dat_miembroocupacion
      .where({ idmiembrohogar: idmiembro })
      .toArray();
    const result = await unionNomenclador(data);
    console.log("ObtenerDatos", result);
    return result;
  }

  async function onChangeMiembro(id: any) {
    const datos = await obtenerDatos(id);
    if (datos) {
      //let varr = datos[0]?.idtipoocupacion;
      let varr = [9333];
      console.log("varrrrrrrrrrrrrrrrrrrrrrrr", Array.isArray(varr));
      setOcupaciones(varr);
    }
  }

  const data = useLiveQuery(async () => {
    const prueba = await (datico as any)["nom_concepto"]
      .where("idpadre")
      .equals("9328")
      .toArray();

    return prueba;
  });

  const dataSinTrabajar = useLiveQuery(async () => {
    const prueba = await (datico as any)["nom_concepto"]
      .where("idpadre")
      .equals("9329")
      .toArray();
    return prueba;
  });

  useEffect(() => {
    setTrabajando(data);
    setSinTrabajar(dataSinTrabajar);
  }, [data, dataSinTrabajar]);

  const ocupacion = ({ name, setFieldValue }: any) => (
    <TableView
      values={trabajando}
      disabled={false}
      headers={[{ name: "denominacion", label: "Ocupación" }]}
      idKey="idconcepto"
      title=""
      name={name}
      setFieldValue={setFieldValue}
      multiSelect={true}
      useCheckBox={true}
      defaultValues={ocupaciones}
    />
  );
  const sinOcupacion = ({ name, setFieldValue }: any) => (
    <TableView
      values={sintrabajar}
      disabled={false}
      headers={[{ name: "denominacion", label: "Ocupación" }]}
      idKey="idconcepto"
      title=""
      multiSelect={true}
      name={name}
      setFieldValue={setFieldValue}
      useCheckBox={true}
      defaultValues={ocupaciones[0]?.idtipoocupacion}
    />
  );

  const FormularioOcupacion: IGenericControls[] = [
    {
      type: "radio",
      label: "",
      name: "idocupacion",

      defaultValue: "9328",
      radios: [
        { idconcepto: "9328", denominacion: "Trabajando" },
        { idconcepto: "9329", denominacion: "Sin Trabajar" },
      ],
      direction: "row",
      labelPlacement: "end",
      gridValues: { xl: 12, lg: 12, md: 12, sm: 12, xs: 12 },
      disabled: (values) =>
        !values.idmiembrohogar || values.idmiembrohogar == "",
    },
  ];

  return (
    <>
      <Meta title="Controles" />
      {miembros.length && idhogar ? (
        <GenericForm
          name="tesst"
          controls={[
            {
              type: "select",
              name: "idmiembrohogar",
              label: "Miembro del hogar",
              gridValues: { xs: 6, lg: 6, md: 6, sm: 6, xl: 6 },
              onChange: (e: any) => {
                setIdMiembroHogar(`${e.target.value}`);
                onChangeMiembro(`${e.target.value}`);
              },
              options: miembros,
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
              disabled: (values) => values.idmiembrohogar == "",
            },
            ...FormularioOcupacion,
            {
              type: "component",
              component: ocupacion,
              label: "",
              name: "idtipoocupacion",
              gridValues: { xs: 12, lg: 12, md: 12, sm: 12, xl: 12 },
              disabled: (values) =>
                values.idocupacion == "9329" || values.idmiembrohogar == "",
            },
            {
              type: "component",
              component: sinOcupacion,
              label: "",
              name: "idtipoocupacion",
              gridValues: { xs: 12, lg: 12, md: 12, sm: 12, xl: 12 },
              disabled: (values) =>
                values.idocupacion == "9328" || values.idmiembrohogar == "",
            },
          ]}
          title="Ocupación de los miembros del hogar"
          description=" "
          endpointPath="persona"
          showSpecificDescription={false}
          idForEdit={id}
          saveButton="Guardar"
          setIdFunction={setid}
          submitFunction={(values) => {
            if (id) {
              modificar("dat_miembroocupacion", "idmiembroocupacion", id, {
                ...values,

                idcodigohogar: getHogar(),
              });
            } else {
              crear("dat_miembroocupacion", {
                ...values,
                idmiembrohogar: values.idmiembrohogar[0],
                idcodigohogar: getHogar(),
              }).then(() =>
                notificar({
                  type: "success",
                  title: "Adicionar",
                  content:
                    "La ocupaciones del miembro han sido adicionada correctamente",
                })
              );
            }
          }}
          getByIdFunction={(id) =>
            obtenerDatosPorLlave(
              "dat_miembroocupacion",
              "idmiembroocupacion",
              id
            )
          }
          nextButton={{ text: "Siguiente", action: siguiente }}
          prevButton={{ text: "Anterior", action: anterior }}
        />
      ) : (
        <Typography mx={2} my={2}>
          <b>Debe haber un hogar seleccionado..</b>
        </Typography>
      )}
    </>
  );
}

export default Ocupacion;
