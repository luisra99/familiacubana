import { Typography, Grid, Button } from "@mui/material";
import { Link } from "react-router-dom";

function AyudaGuia() {

    return (
        <Grid container spacing={2} my={2} mx={2}>
            <Grid item xs={5}>
                <Typography variant="h6" mx={4}>
                    Ayuda
                </Typography>{" "}
            </Grid>
            <Grid item xs={3}>
                <Button
                    onClick={
                        () => {
                            window.open(
                                "/documentos/Manual_de_Usuario_de_prueba_del_Sistema_de_Caracterizacion_de_la_Familia_Cubana.pdf"
                            )
                        }}
                    variant="contained"
                    color="primary"
                    size="medium"
                    fullWidth
                >
                    Descargar
                </Button>
            </Grid>
            <Grid item xs={5}>
                <Typography variant="h6" mx={4}>
                ICS_H
                </Typography>{" "}
            </Grid>
            <Grid item xs={3}>
            <Button
                    onClick={
                        () => {
                            window.open("/documentos/Bases_D2_ICS_H.pdf");
                        }}
                    variant="contained"
                    color="primary"
                    size="medium"
                    fullWidth
                >
                    Descargar
                </Button>
            </Grid>
            <Grid item xs={5}>
                <Typography variant="h6" mx={4}>
                Guia
                </Typography>{" "}
            </Grid>
            <Grid item xs={3}>
            <Button
                    onClick={
                        () => {
                            window.open("/documentos/Bases_D2_ICS_H.pdf");
                        }}
                    variant="contained"
                    color="primary"
                    size="medium"
                    fullWidth
                >
                    Descargar
                </Button>
            </Grid>
        </Grid>
    );
}
export default AyudaGuia;
