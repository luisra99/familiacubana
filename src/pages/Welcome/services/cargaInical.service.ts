import axios from "axios";
import { setToLocalStorage } from "../utils/almacenarOffline";

export const getCargaInicial = async (
  nomencladores: string[]
): Promise<any> => {
  try {
    const { data } = await axios.get(
      `${
        import.meta.env.ENV_SERVER_URL
      }/gw/buscarconceptoxid?idconcepto=${nomencladores.join(",")}`
    );
    return setToLocalStorage(data);
  } catch (error: any) {
    return setToLocalStorage({});
  }
};
