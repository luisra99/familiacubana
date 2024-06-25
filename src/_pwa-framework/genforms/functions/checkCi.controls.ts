export default function validarCarnetIdentidad(cadena: string) {
  // Expresión regular para el formato general
  const regexGeneral = /^[0-9]{2}(0[1-9]|1[0-2])(0[1-9]|[12][0-9]|3[01])$/;
  const regexMonth = /^[0-9]{2}(0[1-9]|1[0-2])$/;
  switch (cadena.length) {
    case 3:
      if (!regexMonth.test(cadena)) {
        return false;
      }
      break;
    case 4:
      if (!regexMonth.test(cadena)) {
        return false;
      }
      break;
    case 5:
      break;
    case 6:
      break;
  }
  console.log(Date.now(), cadena);
  // Verificar si la cadena cumple con el formato general
  if (cadena.length > 6 && !regexGeneral.test(cadena)) {
    return false;
  }

  // Extraer el año, mes y día de la cadena
  const año = parseInt(cadena.substring(0, 2), 10);
  const subs_mes = cadena.substring(2, 4);
  const mes = parseInt(subs_mes, 10);
  console.log(Date.now(), mes);
  const dia = parseInt(cadena.substring(4, 6), 10);

  // Verificar si el día es válido para el mes dado
  if (mes === 2) {
    // Febrero: 28 días en un año no bisiesto, 29 en un año bisiesto
    if (dia > 29 || subs_mes.length < 2) return false;
    if (dia === 29 && (año % 4 !== 0 || (año % 100 === 0 && año % 400 !== 0)))
      return false;
  } else if ([4, 6, 9, 11].includes(mes)) {
    // Abril, Junio, Septiembre, Noviembre: 30 días
    if (dia > 30) return false;
  }

  // Si pasa todas las validaciones, la cadena es válida
  return true;
}
