import {
  CreateOrModify,
  modificar,
  obtenerDatosPorLlave,
} from "@/app/user-interfaces/forms/models/controllers";

import { Divider } from "@mui/material";
import GenericForm from "@/_pwa-framework/genforms/components/form-components/form.generic";
import Meta from "@/_pwa-framework/components/Meta";
import NotificationProvider from "@/_pwa-framework/sections/Notifications/provider";
import TableView from "@/_pwa-framework/user-solicitudes/view";
import Typography from "@mui/material/Typography";
import { datico } from "@/app/user-interfaces/forms/models/model";
import { getHogar } from "@/app/hogarController/hogar.controller";
import { obtenerMiembros } from "@/app/user-interfaces/forms/models/controllers.miembrohogar";
import { useLiveQuery } from "dexie-react-hooks";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Otros_Datos() {
  const idhogar = getHogar() ?? 0;
  const notificar = NotificationProvider();
  const [miembros, setMiembros] = useState<any>([]);
  const [idmiembrohogar, setIdMiembroHogar] = useState<any>(0);
  const [estrategias, setEstrategias] = useState<any[]>([]);
  const [estrategiasSelected, setEstrategiasSelected] = useState<any[]>([]);
  const [checkDatos, checkSetDatos] = useState<any>([]);

  useEffect(() => {
    obtenerDatosNom().then((estrategias) => setEstrategias(estrategias));
  }, []);
  useEffect(() => {}, [idmiembrohogar]);

  async function obtenerDatosMiembros(id: string) {
    const estrategia = await obtenerDatosPorLlave(
      "dat_miembroestrategias",
      "idmiembrohogar",
      id
    );
    const miembroHogar = await obtenerDatosPorLlave(
      "dat_miembrohogar",
      "idmiembrohogar",
      parseInt(id)
    );
    const situacionSocial = await obtenerDatosPorLlave(
      "dat_miembrosituacionsocial",
      "idmiembrohogar",
      id
    );
    const beneficios = await obtenerDatosPorLlave(
      "dat_miebrobeneficioprogalim",
      "idmiembrohogar",
      id
    );
    const situacionSocialOrganizacion = situacionSocial?.[0]
      ?.idiembrosituacionsocial
      ? await obtenerDatosPorLlave(
          "dat_situacionsocialorg",
          "idsituacionsocial",
          situacionSocial?.[0]?.idiembrosituacionsocial
        )
      : null;

    setEstrategiasSelected(estrategia?.[0]?.idestrategia ?? []);
    return {
      idmiembro: [id.toString()],
      idestrategia: estrategia?.[0]?.idestrategia ?? [],
      apoyolaboresd: miembroHogar?.[0]?.apoyolaboresd ? true : false,
      ayudaprobleconomico:
        miembroHogar?.[0]?.ayudaprobleconomico ? true : false,
      idbeneficioprog: beneficios?.[0]?.idbeneficioprog ?? [],
      idsituacionsocial:
        situacionSocial?.[0]?.idsituacionsocial?.map((item: any) =>
          item.toString()
        ) ?? [],

      idorganismo:
        situacionSocialOrganizacion?.[0]?.idorganismo?.map((item: any) =>
          item.toString()
        ) ?? [],
    };
  }

  async function tieneDatos(arr: any) {
    const result = await Promise.all(
      arr.map(async (obj: any) => {
        const uso = await datico.dat_miembroestrategias
          .where({ idmiembrohogar: obj.idconcepto.toString() })
          .count();
        if (uso > 0) {
          return obj.idconcepto;
        } else {
          return 0;
        }
      })
    );
    const _result = result.filter((item) => item != 0);
    return _result.toString();
  }

  useLiveQuery(async () => {
    const data = await obtenerMiembros();
    setMiembros(data);
    const usito = await tieneDatos(data);
    checkSetDatos(usito);
  });

  //Eviel
  async function obtenerDatos(idmiembro: any) {
    const data = await datico.dat_miembroaditamentos
      .where({ idmiembrohogar: idmiembro.toString() })
      .toArray();
    // const result = await unionNomenclador(data);
    return data;
  }

  async function obtenerDatosNom() {
    const prueba = await (datico as any)["nom_concepto"]
      .where("idpadre")
      .equals("9556")
      .toArray();
    return prueba ?? [];
  }

  const navegar = useNavigate();
  const siguiente = () => navegar("/datos");
  const anterior = () => navegar("/estrategia/alimentos");

  return (
    <>
      <Meta title="Controles" />
      {idhogar ? (
        miembros.length ? (
          <GenericForm
            name="test"
            controls={[
              {
                type: "select",
                name: "idmiembro",
                label: "Miembro del hogar",
                gridValues: { xs: 6, lg: 6, md: 6, sm: 6, xl: 6 },
                options: miembros,
                checkValues: checkDatos,
                validations: {
                  required: { message: "Debe seleccionar un miembro" },
                },
                onChange: (e, refs) => {
                  const { value } = e.target;
                  setIdMiembroHogar(value);
                },
              },
              {
                type: "component",
                component: () => (
                  <Typography mt={3}>
                    <b>
                      Estrategias de solución de problemas que afectan al hogar
                    </b>
                  </Typography>
                ),
                label: "",
                name: "",
                hidden: (values: any) => values.idmiembro == "",
                gridValues: { xs: 12, lg: 12, md: 12, sm: 12, xl: 12 },
              },
              {
                type: "component",
                component: () => <Divider sx={{ mt: 0, mb: 1 }} />,
                label: "",
                name: "",
                hidden: (values: any) => values.idmiembro == "",
                gridValues: { xs: 12, lg: 12, md: 12, sm: 12, xl: 12 },
              },

              {
                type: "component",
                component: () => (
                  <Typography marginTop={2}>
                    Marca la(s) estrategias que utiliza para darle solución de
                    problemas que afectan al hogar
                  </Typography>
                ),
                label: "",
                name: "",
                hidden: (values: any) => values.idmiembro == "",
                gridValues: { xs: 12, lg: 12, md: 12, sm: 12, xl: 12 },
              },
              {
                type: "component",
                component: ({ name, setFieldValue, formValue }: any) => (
                  <TableView
                    values={estrategias}
                    headers={[{ name: "denominacion", label: "Estrategias" }]}
                    idKey="idconcepto"
                    setFieldValue={setFieldValue}
                    useCheckBox={true}
                    multiSelect={true}
                    defaultValues={estrategiasSelected}
                    hideTableHead={true}
                    name={name}
                  />
                ),
                label: "",
                name: "idestrategia",
                hidden: (values: any) => values.idmiembro == 0,
                gridValues: { xs: 12, lg: 12, md: 12, sm: 12, xl: 12 },
              },
              {
                type: "component",
                component: () => (
                  <Typography>
                    <b>Nota aclaratoria:</b> Se pregunta si en los últimos 6
                    meses, se vió en la necesidad de hacer alguna de estas
                    activiadades debido a que no había suficiente dinero para
                    comprar alimentos o satisfacer otras necesidades básicas.
                  </Typography>
                ),
                label: "",
                name: "",
                hidden: (values: any) => values.idmiembro == "",
                gridValues: { xs: 12, lg: 12, md: 12, sm: 12, xl: 12 },
              },
              {
                type: "component",
                component: () => (
                  <Typography mt={3}>
                    <b>Redes de apoyo del hogar</b>
                  </Typography>
                ),
                label: "",
                name: "",
                hidden: (values: any) => values.idmiembro == "",
                gridValues: { xs: 12, lg: 12, md: 12, sm: 12, xl: 12 },
              },
              {
                type: "component",
                component: () => <Divider sx={{ mt: 0, mb: 1 }} />,
                label: "",
                name: "",
                hidden: (values: any) => values.idmiembro == "",
                gridValues: { xs: 12, lg: 12, md: 12, sm: 12, xl: 12 },
              },
              {
                type: "component",
                component: () => (
                  <Typography>
                    Tiene a quien pedir ayuda ( a un familiar y/o amigo fuera
                    del hogar)
                  </Typography>
                ),
                label: "",
                name: "",
                hidden: (values: any) => values.idmiembro == "",
                gridValues: { xs: 12, lg: 12, md: 12, sm: 12, xl: 12 },
              },
              {
                type: "check",
                label:
                  "Si alguien en el hogar requiere apoyo con labores domésticas y de cuidado, por enfermedades u otra razón",
                name: "apoyolaboresd",
                hidden: (values: any) => values.idmiembro == "",
                gridValues: { xs: 12, lg: 12, md: 12, sm: 12, xl: 12 },
              },
              {
                type: "check",
                label: "Ante un problema económico",
                name: "ayudaprobleconomico",
                hidden: (values: any) => values.idmiembro == "",
                gridValues: { xs: 12, lg: 12, md: 12, sm: 12, xl: 12 },
              },
              {
                type: "component",
                component: () => <Divider sx={{ mt: 0, mb: 1 }} />,
                label: "",
                name: "",
                hidden: (values: any) => values.idmiembro == "",
                gridValues: { xs: 12, lg: 12, md: 12, sm: 12, xl: 12 },
              },
              {
                type: "multiselect",
                name: "idbeneficioprog",
                label: "Programas alimentarios",
                multiple: "check",
                url: "9610",
                hidden: (values: any) => values.idmiembro == "",
                gridValues: { xs: 12, lg: 12, md: 12, sm: 12, xl: 12 },
              },
              {
                type: "component",
                component: () => (
                  <Typography>
                    <b>Nota aclaratoria:</b>La información de la situación
                    social no se pregunta, se completa a partir de registros
                    oficiales precedentes, con apoyo del TS .
                  </Typography>
                ),
                label: "",
                name: "",
                hidden: (values: any) => values.idmiembro == "",
                gridValues: { xs: 12, lg: 12, md: 12, sm: 12, xl: 12 },
              },
              {
                type: "multiselect",
                name: "idsituacionsocial",
                label: "Situación social",
                url: "9593",
                hidden: (values: any) => values.idmiembro == "",
                multiple: "check",
                gridValues: { xs: 12, lg: 12, md: 12, sm: 12, xl: 12 },
              },
              {
                type: "multiselect",
                name: "idorganismo",
                label: "Organismo",
                multiple: "check",
                gridValues: { xs: 12, lg: 12, md: 12, sm: 12, xl: 12 },
                url: "9598",
                hidden: (values: any) =>
                  values.idmiembro == 0 ||
                  values.idsituacionsocial.findIndex(
                    (element: any) => element == "9598"
                  ) == -1,
              },
            ]}
            title="Estrategias de solución de problemas, redes de apoyo y programas alimentarios. Situación social"
            endpointPath="persona"
            showSpecificDescription={false}
            nextButton={{ text: "Siguiente", action: siguiente }}
            prevButton={{ text: "Anterior", action: anterior }}
            nextDisabledFunction={() => {
              const miembrosCheck = checkDatos.includes(",")
                ? checkDatos?.split?.(",")?.length
                : checkDatos.length > 0
                  ? 1
                  : 0;
              return miembros?.length !== miembrosCheck;
            }}
            idForEdit={idmiembrohogar}
            saveButton="Guardar"
            setIdFunction={setIdMiembroHogar}
            submitFunction={(values: any) => {
              const {
                idestrategia,
                idmiembro,
                ayudaprobleconomico,
                apoyolaboresd,
                idbeneficioprog,
                idsituacionsocial,
                idorganismo,
              } = values;
              ayudaprobleconomico == true
                ? (values.ayudaprobleconomico = 1)
                : (values.ayudaprobleconomico = 0),
                apoyolaboresd == true
                  ? (values.apoyolaboresd = 1)
                  : (values.apoyolaboresd = 0),
                CreateOrModify(
                  "dat_miembroestrategias",
                  {
                    idmiembrohogar: idmiembro[0],
                  },
                  {
                    idmiembrohogar: idmiembro[0],
                    idestrategia,
                  },
                  "idmiembroestrategia"
                );
              modificar(
                "dat_miembrohogar",
                "idmiembrohogar",
                parseInt(idmiembro[0]),
                {
                  ayudaprobleconomico: values.ayudaprobleconomico,
                  apoyolaboresd: values.apoyolaboresd,
                }
              );
              //dat_miebrobeneficioprogalim
              CreateOrModify(
                "dat_miebrobeneficioprogalim",
                { idmiembrohogar: idmiembro[0] },
                {
                  idbeneficioprog,
                  idmiembrohogar: idmiembro[0],
                },
                "idmiebrobeneficioprogalim"
              );
              CreateOrModify(
                "dat_miembrosituacionsocial",
                {
                  idmiembrohogar: idmiembro[0],
                },
                {
                  idsituacionsocial,
                  idmiembrohogar: idmiembro[0],
                },
                "idiembrosituacionsocial"
              ).then(() => {
                if (idorganismo.length) {
                  obtenerDatosPorLlave(
                    "dat_miembrosituacionsocial",
                    "idmiembrohogar",
                    idmiembro[0]
                  ).then((situacionSocial: any) => {
                    CreateOrModify(
                      "dat_situacionsocialorg",
                      {
                        idsituacionsocial:
                          situacionSocial?.[0]?.idiembrosituacionsocial,
                      },
                      {
                        idsituacionsocial:
                          situacionSocial?.[0]?.idiembrosituacionsocial,
                        idorganismo,
                      },
                      "idsituacionsocialorg"
                    );
                  });
                }
              });
              notificar({
                type: "success",
                title: "Los datos se han adicionado satisfactoriamente",
                content: "",
              });
            }}
            getByIdFunction={obtenerDatosMiembros}
            applyButton={false}
          />
        ) : (
          <Typography variant="h6" p={2}>
            <b>No existen miembros en el hogar seleccionado</b>
          </Typography>
        )
      ) : (
        <Typography variant="h6" p={2}>
          <b>No existe un hogar seleccionado</b>
        </Typography>
      )}
    </>
  );
}

export default Otros_Datos;
