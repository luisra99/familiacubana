import { Typography } from "@mui/material";
import { getHogar } from "@/app/hogarController/hogar.controller";

function CheckHogar({children}:any) {
    const idHogar = getHogar() ?? false;
    return idHogar?children:<Typography mx={2} my={2}>
    <b>Debe haber un hogar seleccionado..</b>
  </Typography>;
}

export default CheckHogar;
