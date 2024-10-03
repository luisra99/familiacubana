import { Box, SpeedDial, SpeedDialAction, SpeedDialIcon } from "@mui/material";
import {
  modificar,
  obtenerDatosPorLlave,
} from "@/app/user-interfaces/forms/models/controllers";

import GenericForm from "../genforms/components/form-components/form.generic";
import { RemoveRedEye } from "@mui/icons-material";
import { actions } from "@/app/SpeedDialogConfig";
import { getHogar } from "@/app/hogarController/hogar.controller";
import useModalState from "../hooks/form/use-form-manager";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function BasicSpeedDial() {
  const [open, setOpen] = useState<boolean>();
  const { modalActions } = useModalState();
  const [home, setHome] = useState<any>();
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
          controls={[
            {
              idconcepto: "opt1",
              denominacion: "Información general de la vivienda",
            },
            {
              idconcepto: "opt2",
              denominacion: "Información general de los miembros del hogar",
            },
            { idconcepto: "opt3", denominacion: "Ingresos" },
            { idconcepto: "opt4", denominacion: "Ocupación" },
            {
              idconcepto: "opt5",
              denominacion:
                "Miembros adultos no vinculados al trabajo remunerado",
            },
            {
              idconcepto: "opt6",
              denominacion: "Grado de autonomía y situación de discapacidad",
            },
            { idconcepto: "opt7", denominacion: "Enfermedades" },
            { idconcepto: "opt8", denominacion: "Usos de servicios de salud" },
            {
              idconcepto: "opt9",
              denominacion:
                "Acceso a programas de proteccion social y cuidados",
            },
            {
              idconcepto: "opt11",
              denominacion: "Situacion de niños y niñas y adolecentes (NNA)",
            },
            {
              idconcepto: "opt12",
              denominacion: "Materiales predominantes de la vivienda",
            },
            {
              idconcepto: "opt13",
              denominacion: "Afectaciones que presenta la vivienda",
            },
            { idconcepto: "opt14", denominacion: "Locales de la vivienda" },
            { idconcepto: "opt15", denominacion: "Servicios de la vivienda" },
            {
              idconcepto: "opt16",
              denominacion: "Mobiliario básico y equipos funcionando",
            },
            {
              idconcepto: "opt17",
              denominacion: "Vehículos y equipos de que dispone el hogar",
            },
            {
              idconcepto: "opt18",
              denominacion:
                "Grupos de alimentos y estrategias de afrontamiento en el hogar",
            },
            {
              idconcepto: "opt10",
              denominacion:
                "Estrategias de solución de problemas, redes de apoyo y programas alimentarios. Situación social",
            },
            { idconcepto: "opt19", denominacion: "Gastos mensuales del hogar" },
            { idconcepto: "opt20", denominacion: "Datos de la entrevista" },
          ].map((item) => {
            return {
              type: "check",
              label: item.denominacion,
              name: item.idconcepto,

              labelPlacement: "end",
            };
          })}
          title="Finalizar caracterización"
          description=""
          endpointPath="persona"
          showSpecificDescription={false}
          applyButton={false}
          modalType="fullWith"
        />
      </Box>
    )
  );
}
