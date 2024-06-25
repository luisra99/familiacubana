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
    file.usuario = "test";
    file.estructura = "estructura test";
    return file;
  } catch (error) {
    console.error("Error exporting tables:", error);
  }
}
export const handleDownload = () => {
  const element = document.createElement("a");
  exportAllTablesAsJson().then((data) => {
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
