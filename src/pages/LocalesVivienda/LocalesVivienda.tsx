import {
  crear,
  modificar,
  obtenerDatosPorLlave,
} from "@/app/user-interfaces/forms/models/controllers";

import { Divider } from "@mui/material";
import GenericForm from "@/_pwa-framework/genforms/components/form-components/form.generic";
import Meta from "@/_pwa-framework/components/Meta";
import NotificationProvider from "@/_pwa-framework/sections/Notifications/provider";
import Typography from "@mui/material/Typography";
import { getHogar } from "@/app/hogarController/hogar.controller";
import { obtenerLocalesViviendas } from "./helpers";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function LocalesVivienda() {
  const idhogar = getHogar() ?? 0;
  const [id, setid] = useState<any>(idhogar ?? null);
  const [cant, setCant] = useState(0);

  const notificar = NotificationProvider();
  const navegar = useNavigate();
  const siguiente = () => navegar("/servicios-equipamientos/servicios");
  const anterior = () => navegar("/servicios-equipamientos/afectaciones");

  function getPage() {
    if (idhogar) {
      return (
        <GenericForm
          name="1"
          controls={[
            {
              type: "component",
              component: () => (
                <Typography>
                  <b>Nota aclaratoria:</b>La información solicitada aplica a la
                  vivienda o a la parte de ella que ocupa el hogar.
                </Typography>
              ),
              label: "",
              name: "",
              gridValues: { xs: 12, lg: 12, md: 12, sm: 12, xl: 12 },
            },
            {
              type: "component",
              component: () => (
                <Typography>
                  <b>Dormitorios</b>
                </Typography>
              ),
              label: "",
              name: "",
              gridValues: { xs: 12, lg: 12, md: 12, sm: 12, xl: 12 },
            },
            {
              type: "component",
              component: () => <Divider sx={{ mb: 2 }} />,
              label: "",
              name: "",
              gridValues: { xs: 12, lg: 12, md: 12, sm: 12, xl: 12 },
            },
            {
              type: "text",
              label: "Piezas utilizadas para dormir",
              name: "cantudormir",
              pattern: /[0-9]/,
              gridValues: { xs: 12, lg: 6, md: 6, sm: 6, xl: 6 },
              validations: {
                length: { value: 1, message: "Cantidad de Cuartos" },
                required: { message: "Este campo es obligatorio" },
              },
            },
            {
              type: "text",
              label: "Piezas exclusivas de tipo dormitorios",
              name: "cantedormir",
              pattern: /[0-9]/,
              gridValues: { xs: 12, lg: 6, md: 6, sm: 6, xl: 6 },
              validations: {
                max: {
                  reference: "cantudormir",
                  value: 1,
                  message:
                    "La cantidad no puede ser mayor que las piezas utilizadas para dormir",
                },
                required: {
                  message: "Este campo es obligatorio",
                },
              },
            },
            {
              type: "component",
              component: () => (
                <Typography mt={2}>
                  <b>Cocina</b>
                </Typography>
              ),
              label: "",
              name: "",
              gridValues: { xs: 12, lg: 12, md: 12, sm: 12, xl: 12 },
            },
            {
              type: "component",
              component: () => <Divider sx={{ mb: 2 }} />,
              label: "",
              name: "",
              gridValues: { xs: 12, lg: 12, md: 12, sm: 12, xl: 12 },
            },
            {
              type: "radio",
              label: "",
              name: "tipousococina",
              url: "10229",
              direction: "row",
              labelPlacement: "end",
              gridValues: { xs: 10, lg: 4, md: 4, sm: 4, xl: 4 },
              onChangeCallback: (e, ref) => {
                const { value } = e.target;
                value == "10231" &&
                  ref.setFieldValue("cantidadcocina", "", true);
              },
            },
            {
              type: "number",
              label: "Cantidad",
              name: "cantidadcocina",
              gridValues: { xs: 4, lg: 2, md: 2, sm: 2, xl: 2 },
              format: "units",
              hidden: (values: any) => values.tipousococina != "10230",
              validations: {
                required: {
                  message: "",
                  when: {
                    name: "tipousococina",
                    expression: (value: any) => {
                      return value === "10230";
                    },
                  },
                },
              },
            },
            {
              type: "component",
              component: () => <Divider sx={{ mb: -5 }} />,
              label: "",
              name: "",
              gridValues: { xs: 12, lg: 12, md: 12, sm: 12, xl: 12 },
            },
            {
              type: "multiselect",
              name: "idtipoubicacion",
              label: "Local para cocinar",
              multiple: "check",
              url: "9752",
              gridValues: { xs: 12, lg: 6, md: 6, sm: 6, xl: 6 },
              validations: {
                min: {
                  value: 1,
                  message: "Este campo es obligatorio",
                },
              },
            },
            {
              type: "select",
              name: "idcombustible",
              label: "Combustible más usado para cocinar",
              gridValues: { xs: 12, lg: 6, md: 6, sm: 6, xl: 6 },
              url: "9461",
              validations: {
                required: {
                  message: "Este campo es obligatorio",
                },
              },
            },
            {
              type: "radio",
              label: "¿Tiene servicios sanitario?",
              name: "tienesanitario",
              radios: [
                { idconcepto: "1", denominacion: "Sí" },
                { idconcepto: "2", denominacion: "No" },
              ],
              direction: "row",
              labelPlacement: "start",
              onChangeCallback: (e, ref) => {
                const { value } = e.target;
                value == "2" &&
                  ref.setFieldValue("idtipousoservicio", [], true) &&
                  ref.setFieldValue("cantidad", "", true) &&
                  ref.setFieldValue("inodoro", "", true) &&
                  ref.setFieldValue("letrina", "", true);
              },
            },

            {
              type: "component",
              component: () => <Divider sx={{ mb: 2 }} />,
              label: "",
              name: "",
              gridValues: { xs: 12, lg: 12, md: 12, sm: 12, xl: 12 },
            },

            {
              type: "select",
              label: "Escoja la opción",
              name: "idtipousoservicio",
              url: "10226",
              gridValues: { xs: 7, lg: 6, md: 6, sm: 6, xl: 6 },
              hidden: (values: any) => values.tienesanitario !== "1",
              onChange: (event, ref) => {
                const { value } = event.target;
                console.log(value);
                if (value !== "10227") ref.setFieldValue("cantidad", "", true);
              },
              validations: {
                required: {
                  message: "Este campo es obligatorio",
                  when: {
                    name: "tienesanitario",
                    expression: (value) => value === "1",
                  },
                },
              },
            },
            {
              type: "number",
              label: "Cantidad",
              name: "cantidad",
              format: "other",
              gridValues: { xs: 5, sm: 2, lg: 2, md: 2, xl: 2 },
              hidden: (values: any) =>
                values.tienesanitario !== "1" ||
                values.idtipousoservicio?.[0] !== "10227",
              validations: {
                required: {
                  message: "",
                  when: {
                    name: "idtipousoservicio",
                    expression: (value: any) => {
                      return value[0] === "10227";
                    },
                  },
                },
              },
            },

            {
              type: "multiselect",
              label: "Inodoro",
              name: "inodoro",
              multiple: "check",
              url: "10223",
              gridValues: { xs: 12, sm: 6 },
              hidden: (values: any) => values.tienesanitario !== "1",
              validations: {
                required: {
                  message: "Este campo es obligatorio",
                  when: {
                    name: "tienesanitario",
                    expression: (value) => value === "1",
                  },
                },
              },
            },
            {
              type: "multiselect",
              label: "Letrina",
              name: "letrina",
              multiple: "check",
              url: "10223",
              gridValues: { xs: 12, sm: 6 },
              hidden: (values: any) => values.tienesanitario !== "1",
              validations: {
                required: {
                  message: "Este campo es obligatorio",
                  when: {
                    name: "tienesanitario",
                    expression: (value) => value === "1",
                  },
                },
              },
            },
          ]}
          title="Locales de la vivienda"
          description=""
          nextButton={{ text: "Siguiente", action: siguiente }}
          prevButton={{ text: "Anterior", action: anterior }}
          endpointPath="persona"
          showSpecificDescription={false}
          idForEdit={id}
          saveButton="Guardar"
          getByIdFunction={async () => {
            const dato = await obtenerLocalesViviendas(id);

            return dato;
          }}
          submitFunction={async (values: any) => {
            const existelocalesvivienda = await obtenerDatosPorLlave(
              "dat_localesvivienda",
              "idcodigohogar",
              id
            );

            const valores = {
              cantudormir: values.cantudormir,
              cantedormir: values.cantedormir,
              tipousococina: values.tipousococina,
              cantidadcocina: values.cantidadcocina,
              cantidadsanitario: values.cantidad,
              idcombustible: values.idcombustible,
              tienesanitario: values.tienesanitario,
              idtipousoservicio: values.idtipousoservicio,
              idcodigohogar: id,
            };

            const cocina =
              (values.tipousococina == "10230" &&
                !!values.cantidadcocina?.length) ||
              (values.tipousococina == "10231" && !values.cantidadcocina?.length );
            const sanitario =
              (values.tienesanitario == "1" &&
                values.idtipousoservicio?.[0] == "10227" &&
                !!values.cantidad?.length) ||
              (values.tienesanitario == "1" &&
                values.idtipousoservicio?.[0] == "10228" &&
                !values.cantidad?.length) ||
              (values.tienesanitario == "1" &&
                values.idtipousoservicio?.[0] == "10226") ||
              values.tienesanitario == "2";

            if (values.tipousococina !== "" && values.tienesanitario !== "") {
              if (cocina && sanitario) {
                if (!existelocalesvivienda?.length) {
                  await crear("dat_localesvivienda", valores).then(
                    (idlocalesvivienda: any) => {
                      values.inodoro?.length &&
                        crear("dat_ubicacionsanitaria", {
                          idlocalesvivienda,
                          idtiposanitario: "10221",
                          idubicacion: values.inodoro,
                          idcodigohogar: id,
                        });
                      values.letrina?.length &&
                        crear("dat_ubicacionsanitaria", {
                          idlocalesvivienda,
                          idtiposanitario: "10222",
                          idubicacion: values.letrina,
                          idcodigohogar: id,
                        });
                      crear("dat_ubicacionlocales", {
                        idlocalesvivienda,
                        idtipoubicacion: values.idtipoubicacion,
                        idcodigohogar: id,
                      });
                      notificar({
                        type: "success",
                        title:
                          "Se han adicionado los locales de la vivienda satisfactoriamente",
                        content: "",
                      });
                    }
                  );
                } else {
                  const _idlocalesvivienda =
                    existelocalesvivienda[0]?.idlocalesvivienda;
                  const existeubicacionsanitaria = await obtenerDatosPorLlave(
                    "dat_ubicacionsanitaria",
                    "idlocalesvivienda",
                    _idlocalesvivienda
                  );
                  const existeubicacionlocales = await obtenerDatosPorLlave(
                    "dat_ubicacionlocales",
                    "idlocalesvivienda",
                    _idlocalesvivienda
                  );
                  modificar(
                    "dat_localesvivienda",
                    "idcodigohogar",
                    id,
                    valores
                  );
                  existeubicacionsanitaria?.length
                    ? values.inodoro?.length
                      ? modificar(
                          "dat_ubicacionsanitaria",
                          "idlocalesvivienda",
                          _idlocalesvivienda,
                          {
                            idtiposanitario: "10221",
                            idubicacion: values.inodoro,
                            idcodigohogar: id,
                          }
                        )
                      : crear("dat_ubicacionsanitaria", {
                          idlocalesvivienda: _idlocalesvivienda,
                          idtiposanitario: "10221",
                          idubicacion: values.inodoro,
                          idcodigohogar: id,
                        })
                    : values.inodoro?.length &&
                      crear("dat_ubicacionsanitaria", {
                        idlocalesvivienda: _idlocalesvivienda,
                        idtiposanitario: "10221",
                        idubicacion: values.inodoro,
                        idcodigohogar: id,
                      });
                  values.letrina?.length
                    ? modificar(
                        "dat_ubicacionsanitaria",
                        "idlocalesvivienda",
                        _idlocalesvivienda,
                        {
                          idtiposanitario: "10222",
                          idubicacion: values.letrina,
                          idcodigohogar: id,
                        }
                      )
                    : crear("dat_ubicacionsanitaria", {
                        idlocalesvivienda: _idlocalesvivienda,
                        idtiposanitario: "10222",
                        idubicacion: values.letrina,
                        idcodigohogar: id,
                      });
                  !existeubicacionlocales?.length
                    ? crear("dat_ubicacionlocales", {
                        idlocalesvivienda: _idlocalesvivienda,
                        idtipoubicacion: values.idtipoubicacion,
                        idcodigohogar: id,
                      })
                    : modificar(
                        "dat_ubicacionlocales",
                        "idlocalesvivienda",
                        _idlocalesvivienda,
                        {
                          idtipoubicacion: values.idtipoubicacion,
                          idcodigohogar: id,
                        }
                      );

                  notificar({
                    type: "success",
                    title:
                      "Se ha adicionado los locales de la vivienda satisfactoriamente",
                    content: "",
                  });
                }
              } else {
                console.log(
                  values,
                  values.tienesanitario == "1" &&
                    values.idtipousoservicio?.[0] == "10227" &&
                    !!values.cantidad?.length,
                  values.tienesanitario == "1" &&
                    values.idtipousoservicio?.[0] == "10228" &&
                    !values.cantidad?.length,
                  values.tienesanitario == "1" &&
                    values.idtipousoservicio?.[0] == "10226",
                  values.tienesanitario == "2"
                );
                notificar({
                  type: "error",
                  title: "Faltan cantidades por definir",
                  content: "",
                });
              }
            } else {
              notificar({
                type: "error",
                title:
                  "Le falta por definir el uso de la cocina o el servicio sanitario ",
                content: "",
                // "Le falta por definir el uso de la cocina o el servicio sanitario",
              });
            }
          }}
          applyButton={false}
        />
      );
    } else {
      return (
        <Typography variant="h5" p={2}>
          {idhogar
            ? " No existen miembros en el hogar seleccionado"
            : "No existe un hogar seleccionado"}
        </Typography>
      );
    }
  }

  return (
    <>
      <Meta title="Controles" />
      {getPage()}
    </>
  );
}

export default LocalesVivienda;
