import { getHogar } from "@/app/hogarController/hogar.controller";
import { obtener } from "@/app/user-interfaces/forms/models/controllers";

export const obtenerMobiliarios = async (
  id: any,
  setConfiguracionMobiliarioBasico: any
) => {
  const hogar = getHogar();
  if (hogar) {
    const observ = await obtener("dat_hogarmobiliarioequipos", {
      idmobiliarioequipo: parseFloat(id),
      idcodigohogar: hogar,
    });

    if (observ?.cantidad) {
      setConfiguracionMobiliarioBasico((prev: any) => {
        prev[id] = {
          ...prev[id],
          cantidad: observ.cantidad,
          idmobiliarioequipo: id,
        };
        if (observ.tipoMobiliario)
          prev[id].tipoMobiliario = observ.tipoMobiliario;
        if (observ.estado) prev[id].estado = observ.estado;
        return prev;
      });
    }

    return (
      observ ?? {
        cantidad: "",
        idmobiliarioequipo: 9760,
        estado: "",
      }
    );
  }
};
