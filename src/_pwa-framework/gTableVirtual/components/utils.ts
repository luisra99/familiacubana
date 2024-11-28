// Función para copiar texto al portapapeles
export const copyToClipboard = (text: string) => {
  navigator.clipboard
    .writeText(text)
    .then(() => {
      console.log("Texto copiado:", text);
    })
    .catch((err) => {
      console.error("Error al copiar texto:", err);
    });
};
