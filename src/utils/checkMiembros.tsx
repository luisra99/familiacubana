import { Typography } from "@mui/material";

async function CheckMiembros({ getMiembrosFunction, message, children }:any) {
    const miembros = await getMiembrosFunction?.();
    return miembros?.length ? children : <Typography mx={2} my={2}>
        <b>{message ?? "No existen miembros en el hogar.."}</b>
    </Typography>;
}

export default CheckMiembros;
