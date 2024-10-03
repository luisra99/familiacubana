import { Divider, Typography } from "@mui/material";
import { controles, obtenerServiciosVivienda } from "./helpers";

import GenericForm from "@/_pwa-framework/genforms/components/form-components/form.generic";
import Meta from "@/_pwa-framework/components/Meta";
import NotificationProvider from "@/_pwa-framework/sections/Notifications/provider";
import { crear } from "@/app/user-interfaces/forms/models/controllers";
import { getHogar } from "@/app/hogarController/hogar.controller";
import useModalState from "@/_pwa-framework/hooks/form/use-form-manager";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function ServiciosVivienda() {
  const idhogar = getHogar() ?? 0;
  const { modalActions } = useModalState();
  const [id, setid] = useState<any>(idhogar ?? null);
  const notificar = NotificationProvider();
  const navegar = useNavigate();

  const siguiente = () => navegar("/servicios-equipamientos/mobiliario");
  const anterior = () => navegar("/servicios-equipamientos/locales");

  function getPage() {
    if (idhogar) {
      return (
        <GenericForm
          name="2"
          controls={[
            {
              type: "component",
              component: () => (
                <Typography>
                  <b>Servicio de agua</b>
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
              type: "select",
              label: "Instalación por red de acueducto",
              name: "idinstalacionacueducto",
              gridValues: { xs: 12, lg: 4, md: 4, sm: 12, xl: 4 },
              url: "9649",
              validations: {
                required: { message: "Este campo es obligatorio" },
              },
            },
            {
              type: "select",
              label: "Frecuencia de suministro del agua",
              name: "idfrecsumagua",
              gridValues: { xs: 12, lg: 4, md: 4, sm: 12, xl: 4 },
              url: "9650",
              validations: {
                required: { message: "Este campo es obligatorio" },
              },
            },
            {
              type: "select",
              label: "Procedencia principal del agua",
              name: "idprocedenciaagua",
              gridValues: { xs: 12, lg: 4, md: 4, sm: 12, xl: 4 },
              url: "9651",
              validations: {
                required: { message: "Este campo es obligatorio" },
              },
            },
            {
              type: "component",
              component: () => (
                <Typography>
                  <b>Nota aclaratoria: </b>Escoger la procedencia principal del
                  agua que se consume.
                </Typography>
              ),
              label: "",
              name: "",
              gridValues: { xs: 12, lg: 12, md: 12, sm: 12, xl: 12 },
            },
            {
              type: "component",
              component: () => (
                <Typography sx={{ mt: 2 }}>
                  <b>Otros servicios</b>
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
              type: "select",
              label: "Sistema de Desagüe",
              name: "iddesague",
              gridValues: { xs: 12, lg: 4, md: 4, sm: 12, xl: 4 },
              url: "9646",
              validations: {
                required: { message: "Este campo es obligatorio" },
              },
            },
            {
              type: "multiselect",
              label: "Manejo de desechos",
              name: "idtipomanejo",
              url: "9647",
              multiple: "check",
              gridValues: { xs: 12, lg: 4, md: 4, sm: 12, xl: 4 },
              validations: {
                min: { value: 1, message: "Este campo es obligatorio" },
              },
            },
            {
              type: "select",
              label: "Electricidad",
              name: "idelectricidad",
              gridValues: { xs: 12, lg: 4, md: 4, sm: 12, xl: 4 },
              url: "9648",
              validations: {
                required: { message: "Este campo es obligatorio" },
              },
            },
            {
              type: "component",
              component: () => (
                <Typography sx={{ mt: 2 }}>
                  <b>Acceso a redes</b>
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
              type: "select",
              label: "¿Servicio de internet en el hogar(nauta Hogar)?",
              name: "nautahogar",
              options: [
                { idconcepto: "1", denominacion: "Si" },
                { idconcepto: "0", denominacion: "No" },
              ],
              gridValues: { xs: 12, lg: 12, md: 12, sm: 12, xl: 12 },
              validations: {
                required: { message: "Este campo es obligatorio" },
              },
            },
          ]}
          title="Servicios de la vivienda"
          description=""
          endpointPath="persona"
          nextButton={{ text: "Siguiente", action: siguiente }}
          prevButton={{ text: "Anterior", action: anterior }}
          showSpecificDescription={false}
          idForEdit={id}
          saveButton="Guardar"
          setIdFunction={setid}
          submitFunction={(values: any) => {
            const {
              idcodigohogar,
              iddesague,
              idelectricidad,
              idfrecsumagua,
              idinstalacionacueducto,
              idprocedenciaagua,
              idtipomanejo,
              nautahogar,
            } = values;

            crear("dat_seviciosvivienda", {
              idcodigohogar,
              iddesague,
              idelectricidad,
              idfrecsumagua,
              idinstalacionacueducto,
              idprocedenciaagua,
              idtipomanejo,
              nautahogar,
            }).then(() =>
              notificar({
                type: "success",
                title:
                  "Se han adicionado los servicios a la vivienda satisfactoriamente",
                content: "",
              })
            );
          }}
          getByIdFunction={(id) => obtenerServiciosVivienda(id)}
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
      {idhogar ? (
        <GenericForm
          name="2"
          controls={controles}
          title="Servicios de la vivienda"
          description=""
          endpointPath="persona"
          nextButton={{ text: "Siguiente", action: siguiente }}
          prevButton={{ text: "Anterior", action: anterior }}
          showSpecificDescription={false}
          idForEdit={id}
          saveButton="Guardar"
          setIdFunction={setid}
          submitFunction={(values: any) => {
            const {
              idcodigohogar,
              iddesague,
              idelectricidad,
              idfrecsumagua,
              idinstalacionacueducto,
              idprocedenciaagua,
              idtipomanejo,
              nautahogar,
            } = values;

            crear("dat_seviciosvivienda", {
              idcodigohogar,
              iddesague,
              idelectricidad,
              idfrecsumagua,
              idinstalacionacueducto,
              idprocedenciaagua,
              idtipomanejo,
              nautahogar,
            }).then(() =>
              notificar({
                type: "success",
                title:
                  "Se han adicionado los servicios a la vivienda satisfactoriamente",
                content: "",
              })
            );
          }}
          getByIdFunction={(id) => obtenerServiciosVivienda(id)}
          applyButton={false}
        />
      ) : (
        <Typography variant="h5" p={2}>
          No existe un hogar seleccionado
        </Typography>
      )}
      );
    </>
  );
}

export default ServiciosVivienda;
