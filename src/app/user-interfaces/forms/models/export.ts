import axios from "axios";
import { datico } from "./model";
import { exportDB } from "dexie-export-import";

export async function exportAllTablesAsJson() {
  try {
    const blob = await exportDB(datico, {
      prettyJson: true,
      filter: (table, value, key) => true,
    });
    const json = JSON.parse(await blob.text());
    let file: any = { data: json.data.data };
    return file;
  } catch (error) {
    console.error("Error exporting tables:", error);
  }
}
export const handleDownload = (profile: any) => {
  const element = document.createElement("a");
  exportAllTablesAsJson().then((data) => {
    const tabletUserReference = localStorage.getItem("offlineMode");
    data.tabletUserReference = tabletUserReference;
    data.idestructura = profile?.ESTRUCTURA?.idestructura;
    data.userName = profile?.PI?.idpi;
    const file = new Blob([JSON.stringify(data)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(file);
    element.href = url;
    element.download = `Entrevista ${Date.now()} .json`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  });
};

export const handleSend = () => {
  exportAllTablesAsJson().then((data) => {
    const archivo = new Blob([JSON.stringify(data)], {
      type: "application/json",
    });
    let formData = new FormData();
    formData.append("archivo", archivo);
    axios
      .post(`${import.meta.env.ENV_SERVER_URL}/gw/enviardatos`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {})
      .catch((error) => {
        console.error(error);
      });
  });
};
