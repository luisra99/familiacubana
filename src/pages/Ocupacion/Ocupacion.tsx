import GenericForm from "@/_pwa-framework/genforms/components/form-components/form.generic";
import Meta from "@/_pwa-framework/components/Meta";
import useModalState from "@/_pwa-framework/hooks/form/use-form-manager";
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
import { obtenerMiembrosSelect } from "@/app/user-interfaces/forms/models/controllers.miembrohogar";
import { TableView } from "@/_pwa-framework/user-solicitudes/view/user-view";
import NotificationProvider from "@/_pwa-framework/sections/Notifications/provider";
import { IGenericControls } from "@/_pwa-framework/genforms/types/controls/controls.types";

function Ocupacion() {
  const { modalActions } = useModalState();
  const [id, setid] = useState<any>(null);

  const [trabajando, setTrabajando] = useState<any>([]);
  const [miembro, setMiembro] = useState<any>(null);
  const [sintrabajar, setSinTrabajar] = useState<any>([]);

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

  const miembros = obtenerMiembrosSelect();

  console.log("miembro", miembros);

  const navegar = useNavigate();

  const siguiente = () => navegar("/autonomia/discapacidad");
  const anterior = () => navegar("/ingresos");

  const notificar = NotificationProvider();

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
    />
  );

  const FormularioOcupacion: IGenericControls[] = [
    {
      type: "radio",
      label:
        " Se pregunta a qué se dedican los miembros adultos del hogar, sus actividades laborales, de estudios u otras, habituales y tomando de referencia los últimos 6 meses",

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
      {miembros && (
        <GenericForm
          name="tesst"
          controls={[
            {
              type: "select",
              name: "idmiembrohogar",
              label: "Miembro del hogar",
              defaultValue: miembro,
              gridValues: { xs: 6, lg: 6, md: 6, sm: 6, xl: 6 },
              onChange: (e: any) => {
                setMiembro(`${e.target.value}`);
              },
              options: miembros,
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
      )}
    </>
  );
}

export default Ocupacion;
