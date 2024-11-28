import { HEADER, NAV } from "./config-layout";

import AccountPopover from "./common/account-popover";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import PropTypes from "prop-types";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import { bgBlur } from "../../theme/css";
import { useResponsive } from "../../hooks/use-responsive";
import { useTheme } from "@mui/material/styles";
import { useState } from "react";

export default function Header({ onOpenNav }: any) {
  const theme = useTheme();

  const [anchorEl, setAnchorEl] = useState<any>(null);
  const open = Boolean(anchorEl);
  const handleClick = (e: any) =>
    setAnchorEl({ target: e.currentTarget, x: e.pageX, y: e.pageY });
  const handleClose = () => setAnchorEl(null);

  const lgUp = useResponsive("up", "lg");

  const renderContent = (
    <>
      {!lgUp && (
        <IconButton onClick={onOpenNav} sx={{ mr: 1 }}>
          <svg
            aria-hidden="true"
            role="img"
            className="component-iconify MuiBox-root css-1t9pz9x iconify iconify--eva"
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
          >
            <circle cx="4" cy="12" r="1" fill="currentColor"></circle>
            <rect
              width="14"
              height="2"
              x="7"
              y="11"
              fill="currentColor"
              rx=".94"
              ry=".94"
            ></rect>
            <rect
              width="18"
              height="2"
              x="3"
              y="16"
              fill="currentColor"
              rx=".94"
              ry=".94"
            ></rect>
            <rect
              width="18"
              height="2"
              x="3"
              y="6"
              fill="currentColor"
              rx=".94"
              ry=".94"
            ></rect>
          </svg>
        </IconButton>
      )}

      {/* <Searchbar /> */}

      <Box sx={{ flexGrow: 1 }} />

      <Stack direction="row" alignItems="center" spacing={1}>
        {/* <LanguagePopover /> */}
        {/* <NotificationsPopover /> */}
        <AccountPopover />
      </Stack>
    </>
  );
  const blur = bgBlur({
    color: theme.palette.background.default,
  });
  const _lgUp = lgUp
    ? {
        width: `calc(100% - ${NAV.WIDTH + 1}px)`,
        height: HEADER.H_DESKTOP,
      }
    : {};
  const _style = Object.assign(
    {
      boxShadow: "none",
      height: HEADER.H_MOBILE,
      zIndex: theme.zIndex.appBar + 1,
      transition: theme.transitions.create(["height"], {
        duration: theme.transitions.duration.shorter,
      }),
    },
    _lgUp
  );

  return (
    <AppBar sx={_style}>
      <Toolbar
        sx={{
          height: 0.5,
        }}
      >
        {renderContent}
      </Toolbar>
    </AppBar>
  );
}

Header.propTypes = {
  onOpenNav: PropTypes.func,
};
const menu = [
  {
    id: 44,
    denominacion: "Información general de los miembros del hogar",
    titulo: "",
    img: "",
    url: "/nucleo-info",
    concepto_id: 2,
    visible: true,
    activo: true,
    imageCssClass: "fa fa-gear",
    children: [],
  },
  {
    id: 46,
    denominacion: "Ocupación ",
    titulo: "",
    img: "",
    url: "/Ocupacion",
    concepto_id: 2,
    visible: true,
    activo: true,
    imageCssClass: "fa fa-gear",
    children: [
      {
        id: 47,
        denominacion: "Ocupación ",
        titulo: "",
        img: "",
        url: "/ocupacion/principal",
        concepto_id: 2,
        visible: true,
        activo: true,
        imageCssClass: "fa fa-gear",
        children: [],
      },
      {
        id: 48,
        denominacion: "Miembros adultos no vinculados al trabajo remunerado",
        titulo: "",
        img: "",
        url: "/ocupacion/no-vinculado/no-vinculado",
        concepto_id: 2,
        visible: true,
        activo: true,
        imageCssClass: "fa fa-gear",
        children: [],
      },
    ],
  },
  {
    id: 49,
    denominacion: "Autonomía y necesidades especiales",
    titulo: "",
    img: "",
    url: "/AUTONOMÍA_Y_NECESIDADES_ESPECIALES",
    concepto_id: 2,
    visible: true,
    activo: true,
    imageCssClass: "fa fa-gear",
    children: [
      {
        id: 50,
        denominacion: " Grado de autonomía y situación de discapacidad",
        titulo: "",
        img: "",
        url: "/autonomia/discapacidad",
        concepto_id: 2,
        visible: true,
        activo: true,
        imageCssClass: "fa fa-gear",
        children: [],
      },
      {
        id: 51,
        denominacion: "Enfermedades",
        titulo: "",
        img: "",
        url: "/autonomia/enfermedades",
        concepto_id: 2,
        visible: true,
        activo: true,
        imageCssClass: "fa fa-gear",
        children: [],
      },
      {
        id: 52,
        denominacion: "Uso de servicios de salud",
        titulo: "",
        img: "",
        url: "/autonomia/servicios",
        concepto_id: 2,
        visible: true,
        activo: true,
        imageCssClass: "fa fa-gear",
        children: [],
      },
    ],
  },
  {
    id: 55,
    denominacion:
      "Condiciones de la vivienda, acceso a servicios y equipamiento del hogar",
    titulo: "",
    img: "",
    url: "/CONDICIONES_DE_LA_VIVIENDA_ACCESO_A_SERVICIOS_Y_EQUIPAMIENTO_DEL_HOGAR",
    concepto_id: 2,
    visible: true,
    activo: true,
    imageCssClass: "fa fa-gear",
    children: [
      {
        id: 56,
        denominacion: "Materiales predominates de la vivienda",
        titulo: "",
        img: "",
        url: "/servicios-equipamientos/materiales",
        concepto_id: 2,
        visible: true,
        activo: true,
        imageCssClass: "fa fa-gear",
        children: [],
      },
      {
        id: 57,
        denominacion: "Afectaciones que presenta la vivienda",
        titulo: "",
        img: "",
        url: "/servicios-equipamientos/afectaciones",
        concepto_id: 2,
        visible: true,
        activo: true,
        imageCssClass: "fa fa-gear",
        children: [],
      },
      {
        id: 58,
        denominacion: "Locales de la vivienda",
        titulo: "",
        img: "",
        url: "/servicios-equipamientos/locales",
        concepto_id: 2,
        visible: true,
        activo: true,
        imageCssClass: "fa fa-gear",
        children: [],
      },
      {
        id: 59,
        denominacion: "Servicios de la vivienda",
        titulo: "",
        img: "",
        url: "/servicios-equipamientos/servicios",
        concepto_id: 2,
        visible: true,
        activo: true,
        imageCssClass: "fa fa-gear",
        children: [],
      },
      {
        id: 60,
        denominacion: "Mobiliario básico y equipos funcionando",
        titulo: "",
        img: "",
        url: "/servicios-equipamientos/mobiliario",
        concepto_id: 2,
        visible: true,
        activo: true,
        imageCssClass: "fa fa-gear",
        children: [],
      },
      {
        id: 61,
        denominacion: "Vehículos y equipos de que dispone el hogar",
        titulo: "",
        img: "",
        url: "/servicios-equipamientos/vehiculos",
        concepto_id: 2,
        visible: true,
        activo: true,
        imageCssClass: "fa fa-gear",
        children: [],
      },
    ],
  },
  {
    id: 62,
    denominacion:
      "Seguridad alimentaria y estrategias de afrontamiento en el hogar",
    titulo: "",
    img: "",
    url: "/SEGURIDAD_ALIMENTARIA_Y_ESTRATEGIAS_DE_AFRONTAMIENTO_EN_EL_HOGAR",
    concepto_id: 2,
    visible: true,
    activo: true,
    imageCssClass: "fa fa-gear",
    children: [
      {
        id: 63,
        denominacion: "Gastos mensuales del hogar",
        titulo: "",
        img: "",
        url: "/estrategia/gastos",
        concepto_id: 2,
        visible: true,
        activo: true,
        imageCssClass: "fa fa-gear",
        children: [],
      },
      {
        id: 64,
        denominacion:
          "Seguridad alimentaria y estrategias de afrontamiento en el hogar",
        titulo: "",
        img: "",
        url: "/estrategia/alimentos",
        concepto_id: 2,
        visible: true,
        activo: true,
        imageCssClass: "fa fa-gear",
        children: [],
      },
      {
        id: 65,
        denominacion: "Otros Datos",
        titulo: "",
        img: "",
        url: "/otros",
        concepto_id: 2,
        visible: true,
        activo: true,
        imageCssClass: "fa fa-gear",
        children: [],
      },
    ],
  },
  {
    id: 67,
    denominacion: "Configuración",
    titulo: "",
    img: "",
    url: "/configuracion",
    concepto_id: 2,
    visible: true,
    activo: true,
    imageCssClass: "fa fa-gear",
    children: [
      {
        id: 68,
        denominacion: "Configuración de la carga inicial",
        titulo: "",
        img: "",
        url: "/carga_inicial",
        concepto_id: 2,
        visible: true,
        activo: true,
        imageCssClass: "fa fa-gear",
        children: [],
      },
    ],
  },
  {
    id: 69,
    denominacion: "Sincronización de Datos",
    titulo: "",
    img: "",
    url: "/sincronizacion_datos",
    concepto_id: 2,
    visible: true,
    activo: true,
    imageCssClass: "fa fa-gear",
    children: [],
  },
  {
    id: 43,
    denominacion: "Información general de la vivienda",
    titulo: "",
    img: "",
    url: "/datos-hogar",
    concepto_id: 2,
    visible: true,
    activo: true,
    imageCssClass: "fa fa-gear",
    children: [],
  },
  {
    id: 45,
    denominacion: "Ingresos",
    titulo: "",
    img: "",
    url: "/ingresos",
    concepto_id: 2,
    visible: true,
    activo: true,
    imageCssClass: "fa fa-gear",
    children: [],
  },
  {
    id: 53,
    denominacion: "Acceso a programas de protección social y cuidados",
    titulo: "",
    img: "",
    url: "/proteccion",
    concepto_id: 2,
    visible: true,
    activo: true,
    imageCssClass: "fa fa-gear",
    children: [],
  },
  {
    id: 54,
    denominacion: "Situación de niños, niñas y adolescentes",
    titulo: "",
    img: "",
    url: "/adolecentes",
    concepto_id: 2,
    visible: true,
    activo: true,
    imageCssClass: "fa fa-gear",
    children: [],
  },
  {
    id: 66,
    denominacion: "Datos de la entrevista",
    titulo: "",
    img: "",
    url: "/datos",
    concepto_id: 2,
    visible: true,
    activo: true,
    imageCssClass: "fa fa-gear",
    children: [],
  },
];
