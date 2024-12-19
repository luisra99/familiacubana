import axios from "axios";
import { mode } from "@/_pwa-framework/config";
import { nomencladoresMock } from "./mockNomencladores";
import { setToLocalStorage } from "../utils/almacenarOffline";
import { cargarEstructuras } from "../utils/estructuras.service";
import { mockEstructura } from "./estrucutrasMock";

export const getCargaInicial = async (
  nomencladores: string[],
  idEstructura: any
): Promise<any> => {
  try {
    const zonasVulnerables = [
      { idconcepto: "990801", denominacion: "Cordon Corcho" },
      { idconcepto: "990802", denominacion: "Finca Silvia" },
      { idconcepto: "990803", denominacion: "Pueblo Nuevo" },
    ];
    if (!mode) {
      const { data } = await axios.get(
        `${
          import.meta.env.ENV_SERVER_URL
        }/gw/external/nomencladores/buscarconceptoxid?idconcepto=${nomencladores.join(
          ","
        )}`
      );
      // const zonasVulnerables = await axios
      //   .get(
      //     `${import.meta.env.ENV_SERVER_URL}/gw/zona_vulnerable/${idEstructura}`
      //   )
      //   .then(({ data }) => data)
      //   .catch(() => []);

      const estructuras = await cargarEstructuras(idEstructura);
      localStorage.setItem("estructuras", JSON.stringify(estructuras));

      return setToLocalStorage({ ...data, "999999999": zonasVulnerables });
    } else {
      localStorage.setItem("estructuras", JSON.stringify(mockEstructura));
      return setToLocalStorage({
        ...nomencladoresMock,
        "999999999": zonasVulnerables,
      });
    }
  } catch (error: any) {
    return setToLocalStorage({});
  } finally {
    window.open("/documentos/Bases_D2_ICS_H.pdf");
    window.open("/documentos/Bases_D3_Guia_ICS_H.pdf");
    window.open("/documentos/Manual APK(16-12-24).pdf");
  }
};
