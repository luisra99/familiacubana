import { Box, SpeedDial, SpeedDialAction, SpeedDialIcon } from "@mui/material";
import {
  modificar,
  obtenerDatosPorLlave,
} from "@/app/user-interfaces/forms/models/controllers";

import GenericForm from "../genforms/components/form-components/form.generic";
import { HelpCenter, RemoveRedEye } from "@mui/icons-material";
import { actions } from "@/app/SpeedDialogConfig";
import { getHogar } from "@/app/hogarController/hogar.controller";
import useModalState from "../hooks/form/use-form-manager";
import { useNavigate } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import { calcularEdadByCi, unionNomenclador } from "@/pages/NucleoInfo/utils";
import { datico } from "@/app/user-interfaces/forms/models/model";
import { obtenerMiembros } from "@/app/user-interfaces/forms/models/controllers.miembrohogar";
import { tieneIngresos } from "@/pages/Ingresos/Ingresos";
import { tieneOcupacion } from "@/pages/Ocupacion/utils";
import { tieneDiscapacidad } from "@/pages/AutonomiayNecesidadesEspeciales/helpers";
import { miembrosConEnfermedades } from "@/pages/Enfermedades/utils";
import {
  obtenerMiembroPorEncuesta,
  tieneUso,
} from "@/pages/UsoServiciosSalud/helpers";
import { obtenerLocalesViviendas } from "@/pages/LocalesVivienda/helpers";
import { obtenerServiciosVivienda } from "@/pages/ServiciosVivienda/helpers";
import { tieneDatos } from "@/pages/Otros_Datos/Otros_Datos";
import { IGenericControls } from "../genforms/types/controls/controls.types";
import { useLocalStorage } from "@uidotdev/usehooks";

export default function BasicSpeedDial() {
  const [open, setOpen] = useState<boolean>();
  const { modalActions } = useModalState();
  const [home, setHome] = useState<any>();
  const [idhogar] = useLocalStorage("hogarActual");
  const [estadoDeLaCaracterizacion, setEstadoDeLaCaracterizacion] =
    useState<any>();
  const navegar = useNavigate();
  const siguiente = () => {
    modalActions.open("estadoEntrevista");
  };
  const anterior = () => navegar("/estrategia/otros");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const obtenerObservaciones = async (id: any) => {
    const observ = await obtenerDatosPorLlave(
      "dat_hogar",
      "idcodigohogar",
      parseInt(id)
    );
    return observ[0];
  };
  const checkCaracterizacion = async () => {
    try {
      const idHogar = getHogar();

      if (idHogar) {
        //#region Consultas generales
        const miembros: any = await datico.dat_miembrohogar
          .where({ idcodigohogar: idHogar })
          .toArray();
        const allMiembros = await obtenerMiembros();
        const miembrosMayoresDeQuince = allMiembros.filter(
          (item) => item.edad > 15
        );
        const mimbrosNombresUnidos = miembros.map((obj: any) => {
          const nombreyapellidos = `${obj.pnombre} ${obj.papellido} `;
          return {
            ...obj,
            nombreyapellidos: nombreyapellidos,
            jefehogar: "",
          };
        });
        let miembrosNomenclados = await unionNomenclador(mimbrosNombresUnidos);
        miembrosNomenclados.sort(
          (a, b) => parseInt(a.idparentesco[0]) - parseInt(b.idparentesco[0])
        );
        miembrosNomenclados = miembrosNomenclados.map((obj) => {
          let registroconsumidor: any = "";
          const edad = calcularEdadByCi(obj.cidentidad);
          return {
            ...obj,
            registroconsumidor: registroconsumidor,
            edad: edad == 0 ? "M" : edad,
          };
        });
        const miembrosParentezcoNomenclado = miembrosNomenclados.map(
          (miembro: any) => {
            return {
              ...miembro,
              parentesco:
                miembro.parentesco === "Jefe(a) de hogar"
                  ? "JN"
                  : miembro.parentesco,
            };
          }
        );

        //#endregion

        //#region NucleoInfo - Existe Jefe de nucleo
        const personasFiltradas = miembrosParentezcoNomenclado.filter(
          (item: any) => item.parentesco === "JN"
        );
        const nucleoInfo = !!personasFiltradas.length;
        //#endregion

        //#region Ingresos - Todos los mayores de 15 años tienen ingresos
        const miembrosMayoresDeQuinceConIngresos = await tieneIngresos(
          miembrosMayoresDeQuince
        );
        console.log(
          "Ingresos",
          miembrosMayoresDeQuince,
          miembrosMayoresDeQuinceConIngresos
        );
        const ingresos =
          miembrosMayoresDeQuince?.length ==
          miembrosMayoresDeQuinceConIngresos?.length;
        //#endregion

        //#region Ocupación - Todos los mimebros
        const miembrosMayoresDeQuinceConOcupacion = await tieneOcupacion(
          miembrosMayoresDeQuince
        );
        const ocupacion =
          miembrosMayoresDeQuinceConOcupacion.length ==
          miembrosMayoresDeQuince.length;
        //#endregion

        //#region Autonomia - Todos los mimebros tinen datos en autonomia
        const miembrosConDiscapacidad = await tieneDiscapacidad(allMiembros);
        const cantidadDeMiembrosConDiscapacidad =
          miembrosConDiscapacidad.includes(",")
            ? miembrosConDiscapacidad?.split?.(",")?.length
            : miembrosConDiscapacidad.length > 0
              ? 1
              : 0;
        const autonomia = miembros?.length == cantidadDeMiembrosConDiscapacidad;
        //#endregion

        //#region Enfermedades - Todos los mimebros tinen datos en enfermedades
        const miembrosConEnfermedadesCronicas =
          await miembrosConEnfermedades(allMiembros);
        const miembrosConEnfermedadesCronicasNormalizado =
          miembrosConEnfermedadesCronicas.filter((item) => !!item).join(",");
        const miembrosConEnfermedadesLength =
          miembrosConEnfermedadesCronicasNormalizado.includes(",")
            ? miembrosConEnfermedadesCronicasNormalizado?.split?.(",")?.length
            : miembrosConEnfermedadesCronicasNormalizado.length > 0
              ? 1
              : 0;
        const enfermedades = miembros?.length == miembrosConEnfermedadesLength;
        //#endregion

        //#region UsoServiciosSalud - Todos los mimebros tinen datos en Uso de servicios
        const miebrosServiciosSalud = await obtenerMiembroPorEncuesta(
          idHogar ?? ""
        );
        console.log("miebrosServiciosSalud", miebrosServiciosSalud);
        const usoServicios = await tieneUso(allMiembros);

        const verificarUso = (
          miebrosServiciosSalud: any,
          usoServicios: any
        ) => {
          if (miebrosServiciosSalud?.problemasalud?.length) {
            return false;
          }
          const miembrosCheck = usoServicios.includes(",")
            ? usoServicios?.split?.(",")?.length
            : usoServicios.length > 0
              ? 1
              : 0;
          if (miembros?.length == miembrosCheck) {
            return false;
          }
          return true;
        };
        const problemasDeSaludEnElHogar = await obtenerDatosPorLlave(
          "dat_hogar",
          "idcodigohogar",
          parseInt(getHogar() ?? "")
        );

        const usoServiciosSalud =
          !!problemasDeSaludEnElHogar?.[0]?.problemasalud?.length;
        //#endregion

        //#region Acceso a programas - Todos los mimebros tinen datos en Acceso a programas

        const obtenerAccesoAProgramas = async (miembros: any) => {
          //logica
          //resultado
          const result = await Promise.all(
            miembros.map(async (obj: any) => {
              const uso = await datico.dat_polprogsoc
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
        };

        const accedenAProgramas = await obtenerAccesoAProgramas(allMiembros);
        const accesoAProgramas = miembros?.length == accedenAProgramas;
        //#endregion
        //#region Materiales Predominantes
        const estadoConstruccion: any = await obtenerDatosPorLlave(
          "dat_estadoconstvivienda",
          "idcodigohogar",
          idHogar
        );
        const materialesPredomiantes = !!estadoConstruccion?.length;
        //#endregion

        //#region Locales de la vivienda
        const localesInfo: any = await obtenerLocalesViviendas(idHogar);
        const localesDeLaVivienda = !!localesInfo?.cantudormir;
        //#endregion

        //#region Servicios de la vivienda
        const servicios: any = await obtenerServiciosVivienda(idHogar);
        const serviciosVivienda = !!servicios?.iddesague?.length;
        //#endregion

        //#region Mobiliario de la vivienda
        const mobiliario: any = await obtenerDatosPorLlave(
          "dat_hogarmobiliarioequipos",
          "idcodigohogar",
          idHogar
        );
        const mobiliarioBasico = !!mobiliario?.length;
        //#endregion

        //#region Seguridad Alimentaria de la vivienda
        const alimentos: any = await obtenerDatosPorLlave(
          "dat_hogardiversidadalimentaria",
          "idcodigohogar",
          idHogar
        );
        const seguridadAlimentaria = !!alimentos?.length;
        //#endregion

        //#region SituacionSocial Alimentaria de la vivienda
        const datosSituacionSocial = await tieneDatos(allMiembros);
        const checkSituacionSocial = datosSituacionSocial.includes(",")
          ? datosSituacionSocial?.split?.(",")?.length
          : datosSituacionSocial.length > 0
            ? 1
            : 0;
        const situacionSocial = allMiembros?.length == checkSituacionSocial;
        //#endregion

        //#region GastosHogar
        const gastos: any = await obtenerDatosPorLlave(
          "dat_hogargastos",
          "idcodigohogar",
          idHogar
        );
        const gastosHogar = !!gastos?.length;
        //#endregion

        //#region GastosHogar
        const entrevista: any = await obtenerDatosPorLlave(
          "dat_caracterizacion",
          "idcodigohogar",
          idHogar
        );
        const datosEntrevista = !!entrevista?.length;
        //#endregion
        const _estadoDeLaCaracterizacion = {
          nucleoInfo,
          ingresos,
          ocupacion,
          autonomia,
          enfermedades,
          usoServiciosSalud,
          accesoAProgramas,
          materialesPredomiantes,
          localesDeLaVivienda,
          serviciosVivienda,
          mobiliarioBasico,
          seguridadAlimentaria,
          situacionSocial,
          gastosHogar,
          datosEntrevista,
        };
        setEstadoDeLaCaracterizacion(_estadoDeLaCaracterizacion);

        console.log("estadoDeLaCaracterizacion", _estadoDeLaCaracterizacion);
      }
    } catch (error: any) {
      console.log("error estadoDeLaCaracterizacion", error);
    }
  };
  useLiveQuery(checkCaracterizacion);
  const estadoEntrevistaControls = useCallback(
    (): IGenericControls[] =>
      [
        {
          idconcepto: "nucleoInfo",
          denominacion: "Información general de los miembros del hogar",
        },
        { idconcepto: "ingresos", denominacion: "Ingresos" },
        { idconcepto: "ocupacion", denominacion: "Ocupación" },

        {
          idconcepto: "autonomia",
          denominacion: "Grado de autonomía y situación de discapacidad",
        },
        { idconcepto: "enfermedades", denominacion: "Enfermedades" },
        {
          idconcepto: "usoServiciosSalud",
          denominacion: "Usos de servicios de salud",
        },
        {
          idconcepto: "accesoAProgramas",
          denominacion: "Acceso a programas de proteccion social y cuidados",
        },
        {
          idconcepto: "materialesPredomiantes",
          denominacion: "Materiales predominantes de la vivienda",
        },
        {
          idconcepto: "localesDeLaVivienda",
          denominacion: "Locales de la vivienda",
        },
        {
          idconcepto: "serviciosVivienda",
          denominacion: "Servicios de la vivienda",
        },
        {
          idconcepto: "mobiliarioBasico",
          denominacion: "Mobiliario básico y equipos funcionando",
        },
        {
          idconcepto: "seguridadAlimentaria",
          denominacion:
            "Grupos de alimentos y estrategias de afrontamiento en el hogar",
        },
        {
          idconcepto: "situacionSocial",
          denominacion:
            "Estrategias de solución de problemas, redes de apoyo y programas alimentarios. Situación social",
        },
        {
          idconcepto: "gastosHogar",
          denominacion: "Gastos mensuales del hogar",
        },
        {
          idconcepto: "datosEntrevista",
          denominacion: "Datos de la entrevista",
        },
      ].map((item) => {
        console.log(
          item.idconcepto,
          estadoDeLaCaracterizacion?.[item.idconcepto]
        );

        return {
          type: "check",
          label: item.denominacion,
          name: item.idconcepto,
          defaultValue: estadoDeLaCaracterizacion?.[item.idconcepto],
          labelPlacement: "end",
        };
      }),
    [estadoDeLaCaracterizacion]
  );
  useEffect(() => {
    checkCaracterizacion();
  }, [idhogar]);
  return (
    actions.length && (
      <Box
        sx={{
          height: 320,
          flexGrow: 1,
          position: "fixed",
          bottom: 0,
          right: 0,
          zIndex: 99999,
        }}
      >
        <GenericForm
          name="caracter"
          modalType="fullWith"
          controls={[
            {
              type: "text",
              label: "Observaciones E/R y del trabajador social a cargo",
              name: "observaciones",
              gridValues: { xs: 12, lg: 12, md: 12, sm: 12, xl: 12 },
              multiline: { minRows: 6 },
            },
          ]}
          title="Datos de la entrevista"
          description=""
          endpointPath="persona"
          showSpecificDescription={false}
          idForEdit={home}
          saveButton="Guardar"
          submitFunction={(values) => {
            home &&
              modificar(
                "dat_hogar",
                "idcodigohogar",
                parseInt(home),
                values
              ).then(() => setHome(undefined));
          }}
          getByIdFunction={obtenerObservaciones}
          applyButton={false}
        />
        <SpeedDial
          ariaLabel={"speedDial"}
          sx={{ position: "absolute", bottom: 5, right: 5 }}
          onClose={handleClose}
          onOpen={handleOpen}
          icon={<SpeedDialIcon />}
          open={open}
        >
          {[
            {
              icon: HelpCenter,
              name: "Ayuda",
              action: () => {
                navegar("/ayuda");
              },
            },
            {
              icon: RemoveRedEye,
              name: "Observaciones",
              action: () => {
                setHome(getHogar());
                modalActions.open("caracter");
              },
            },
            ...actions,
          ].map((action: any) => (
            <SpeedDialAction
              key={action.name}
              icon={<action.icon />}
              onClick={() => {
                action.action();
                handleClose();
                if (action.modal) {
                  modalActions.open(action.modal);
                }
              }}
              tooltipTitle={action.name}
              tooltipOpen
            />
          ))}
        </SpeedDial>
        <GenericForm
          name="estadoEntrevista"
          controls={estadoEntrevistaControls()}
          title="Finalizar caracterización"
          description=""
          endpointPath="persona"
          acceptDisabledFunction={(values) => {
            console.log(
              Object.values(values).filter((item) => item == false).length
            );
            return !!Object.values(values).filter((item) => item == false)
              .length;
          }}
          submitFunction={() => {
            navegar("/datos-hogar");
          }}
          showSpecificDescription={false}
          applyButton={false}
          modalType="fullWith"
        />
      </Box>
    )
  );
}
