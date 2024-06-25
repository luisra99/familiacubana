import {
  Box,
  Button,
  Grid,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Typography,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useEffect, useState } from "react";

import DoneRoundedIcon from "@mui/icons-material/DoneRounded";
import DownloadingRoundedIcon from "@mui/icons-material/DownloadingRounded";
import { LoadingButton } from "@mui/lab";
import Meta from "@/_pwa-framework/components/Meta";
import { Stack } from "@mui/system";
import { getCargaInicial } from "../Welcome/services/cargaInical.service";
import { getNomenclador } from "../Welcome/services/cargaNomenclador.service";
import { useSession } from "@/_pwa-framework/session/state";

function Nomencladores() {
  const [userData] = useSession();
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState<boolean | string>(false);

  const [nomencladoresCargados, setNomencladoresCargados] = useState<string[]>(
    []
  );
  useEffect(
    () =>
      addEventListener("storage", (event) => {
        if (!event.newValue) {
          setNomencladoresCargados((oldState) =>
            oldState.filter((key) => key !== event.key?.replace("/", ""))
          );
        }
      }),
    []
  );

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleChange = ({ target: { value } }: any) => setPassword(value);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const load = (id: string) => {
    setLoading(id);
    getNomenclador(id)
      .then((success) => {
        if (success) setNomencladoresCargados((prev) => [...prev, id]);
      })
      .finally(() => setLoading(false));
  };

  return (
    <>
      <Meta title="Configuración" />
      <Box px={4} pb={2}>
        <Typography variant="h4" m={2}>
          Configuarción de la carga inicial
        </Typography>
        <LoadingButton
          variant="contained"
          color="primary"
          loading={loading == "estructura" || loading === true}
          endIcon={<DownloadingRoundedIcon />}
          loadingPosition="end"
          onClick={async () => {
            setLoading(true);
            await getCargaInicial(Object.keys(nomencladores))
              .then((nomcladoresCargados) =>
                setNomencladoresCargados(nomcladoresCargados)
              )
              .finally(() => setLoading(false));
          }}
          fullWidth
        >
          Cargar nomencladores
        </LoadingButton>
      </Box>

      <Grid container px={4} spacing={2}>
        {Object.entries(nomencladores).map(([id, denominacion]) => (
          <Grid item xs={12} md={6}>
            <LoadingButton
              variant="contained"
              color={nomencladoresCargados.includes(id) ? "success" : "warning"}
              loading={loading == id || loading === true}
              endIcon={
                nomencladoresCargados.includes(id) ? (
                  <DoneRoundedIcon />
                ) : (
                  <DownloadingRoundedIcon />
                )
              }
              loadingPosition="end"
              onClick={() => load(id)}
              fullWidth
            >
              {denominacion}
            </LoadingButton>
          </Grid>
        ))}
        {/* <Grid item xs={12}>
          <Stack>
            <Typography variant="h5">Credenciales fuera de línea</Typography>
            <Typography>
              <b>Usuario:</b> {userData?.PI?.idpi}
            </Typography> */}

            {/* <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={handleChange}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
            <Button
              variant="contained"
              sx={{ mt: 1 }}
              onClick={() => {
                const code = `${userData?.PI?.idpi}:${password}`;
                localStorage.setItem("offlineMode", code);
                localStorage.setItem("userData", JSON.stringify(userData));
                localStorage.setItem("offlineSession", "true");
              }}
              disabled={!password}
            >
              Guardar
            </Button> */}
          {/* </Stack>
        </Grid> */}
      </Grid>
    </>
  );
}

export default Nomencladores;

const nomencladores = {
  9269: "Tipos de parentesco",
  9280: "Color de la piel",
  9284: "Sexo",
  9287: "Escolaridad",
  9289: "Zona de residencia",
  9292: "Tipos de vivienda",
  9299: "Situaciones legales de la vivienda",
  9309: "Tipos de moneda",
  9318: "Tipos de fuentes de procedencia de los ingresos personales",
  9327: "Ocupación de los miembros adultos del hogar ",
  9351: "Tipos de no vinculados al trabajo remunerado ",
  9354: "Causas de no vinculación al trabajo remunerado de los miembros aptos",
  9360: "Motivo de decisión de cuidado de un familiar",
  9363: "Remuneración de los miembros no vinculados, no aptos y fuera de edad laboral",
  9369: "Tipos de grados de autonomia",
  9373: "Tipos de ayuda",
  9376: "Tipos de discapacidad",
  9383: "Tipos de aditamentos de ayuda a la discapacidad",
  9395: "Estados de los aditamentos",
  9409: "Tipos de enfermedades",
  9416: "Vías de acceso",
  9421: "Situacion de NNA que cometen hechos delictivos",
  9433: "Motivos de no atención médica",
  9442: "Beneficios de políticas y programas sociales",
  9457: "Tipos de acceso a beneficios de políticas y programas sociales",
  9461: "Tipos de combustible más usados para cocinar",
  9472: "Tipos de situacion educativa de NNA",
  9501: "Tipos de ocupación de NNA",
  9505: "Tipos de materiales predominantes y afectaciones que presenta la vivienda",
  9555: "Estrategias del hogar ",
  9556: "Estrategias de solución de problemas que afectan el hogar",
  9610: "Tipos de programas alimentarios que reciben los miembros del hogar",
  9619: "Frecuencia semanal de consumo de alimentos del hogar",
  9628: "Grupos de alimentos",
  9639: "Proporciones del gasto total",
  // 9644: "Servicios de la vivienda",
  // 9645: "Servicio de agua",
  9649: "Instalación por red de acueducto",
  9650: "Frecuencia del suministro de agua",
  9651: "Procedencia principal del agua que se consume en la vivienda",
  9646: "Sistema de desague",
  9647: "Manejo de desechos sólidos (basura)",
  9648: "Electricidad",
  // 9795: "Acceso a redes",
  9593: "Tipos de situación social de los miembros del hogar",
  9740: "Parentesco-enfermedad del familiar que cuida ",
  9752: "Ubicaciones de los locales para cocinar",
  // 9758: "Tipos de mobiliario básico/equipos funcionando y vehículos ",
  9802: "Beneficios focalizados de salud  ",
  9831: "Tipos de respuestas de uso de servicios de salud",
  9329: "Ocupación de los miembros adultos del hogar sin trabajando",
  9328: "Ocupación de los miembros adultos del hogar trabajando",
  9793: "Patología",
  9399: "Enfermedades de baja prevalencia",
  9557: "Estrategias de afrontamiento para consumo de alimentos en situación de escasez",
  10148: "Gastos mensuales del hogar",
  9697: "Primaria",
  9698: "Secundaria Básica",
  9699: "Obrero calificado",
  9700: "Preuniversitario",
  9701: "Pedagogía nivel medio",
  9702: "Técnico medio",
  9704: "Técnico superior",
  9705: "Universitario",
  9759: "Muebles y equipos",
  9784: "Vehículos",
  10210: "Orientación Sexual",
  10136: "Cantidad de horas de actividades de NNA",
  10140: "Horario de actividad de NNA",   
  9475: "Causas de desvinculación NNA a SNE",
  9478: "Educación Cuidado en el hogar",
  9486: "Ensenñanza Técnico-Profesional",   
  9473: "Educación cuidado de la primera infancia",
  9474: "Vinculación Sistema Nacional de Ensenñanza SNE",
};
