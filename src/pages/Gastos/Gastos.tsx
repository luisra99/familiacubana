import GenericForm from "@/_pwa-framework/genforms/components/form-components/form.generic";
import Meta from "@/_pwa-framework/components/Meta";
import { Typography } from "@mui/material";
import { getHogar } from "@/app/hogarController/hogar.controller";
import useGastos from "./useGastos";
import { useLiveQuery } from "dexie-react-hooks";
import { useState } from "react";
import { datico } from "@/app/user-interfaces/forms/models/model";

function Gastos() {
  const hogar = getHogar();
  const [miembros, setMiembros] = useState<any>([]);
  useLiveQuery(async () => {
    const miembros: any = await datico.dat_miembrohogar
      .where({ idcodigohogar: hogar })
      .toArray();
    setMiembros(miembros);
  });
  const [
    controls,
    destinoGastos,
    guardarGastosDelHogar,
    getGastosPorHogar,
    notifyValidation,
    idHogar,
    siguiente,
    anterior,
  ] = useGastos();

  return (
    <>
      <Meta title="Gastos" />
      {destinoGastos &&
        (hogar && miembros.length ? (
          <GenericForm
            name="test"
            title="Gastos mensuales del hogar"
            controls={controls}
            endpointPath="persona"
            notifyValidation={notifyValidation}
            submitFunction={guardarGastosDelHogar}
            getByIdFunction={getGastosPorHogar}
            idForEdit={idHogar}
            nextButton={{ text: "Siguiente", action: siguiente }}
            prevButton={{ text: "Anterior", action: anterior }}
            saveButton="Guardar"
            applyButton={false}
          />
        ) : !hogar ? (
          <Typography
            variant="h5"
            p={2}
            flex={1}
            flexDirection={"row"}
            textAlign={"center"}
          >
            No hay hogar seleccionado
          </Typography>
        ) : (
          <Typography
            variant="h6"
            p={2}
            flex={1}
            flexDirection={"row"}
          >
            No existen miembros en el hogar seleccionado 
          </Typography>
        ))}
    </>
  );
}

export default Gastos;
