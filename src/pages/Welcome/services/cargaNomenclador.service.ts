import axios from "axios";
import { setItem } from "../utils/almacenarOffline";

export const getNomenclador = async (nomenclador: string): Promise<any> => {
  try {
    const { data } = await axios.get(
      `${
        import.meta.env.ENV_SERVER_URL
      }/gw/buscarconceptoxid?idconcepto=${nomenclador}`
    );
    if (Object.keys(data).length) setItem(nomenclador, Object.values(data)[0]);
    return Object.keys(data).length;
  } catch (error: any) {
    return false;
  }
};
