import Button from "@mui/material/Button";
import { Grid } from "@mui/material";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";

function Configuracion() {
  return (
    <>
      <Typography variant="h4" sx={{ mt: 4 }} textAlign={"center"}>
        <b>Configuración general </b>
      </Typography>

      <Grid container spacing={2} my={2} mx={2}>
        <Grid item xs={2}>
          <Typography variant="h6">Usuario</Typography>
        </Grid>
        <Grid item xs={2}>
          <Button
            component={Link}
            to="/usuario"
            variant="contained"
            color="primary"
          >
            Abrir
          </Button>
        </Grid>
      </Grid>

      <Grid container spacing={2} my={2} mx={2}>
        <Grid item xs={2}>
          <Typography variant="h6">Nomencladores</Typography>
        </Grid>
        <Grid item xs={2}>
          <Button
            component={Link}
            to="/nomencladores"
            variant="contained"
            color="primary"
          >
            Importar
          </Button>
        </Grid>
      </Grid>

      {/* <Grid container spacing={2} my={2} mx={2}>
        <Grid item xs={2}>
          <Typography variant="h6">Documentos</Typography>
        </Grid>
        <Grid item xs={2}>
          <Button component={Link} to="/" variant="contained" color="primary">
            Importar
          </Button>
        </Grid>
      </Grid>

      <Grid container spacing={2} my={2} mx={2}>
        <Grid item xs={2}>
          <Typography variant="h6">Dispositivo</Typography>
        </Grid>
        <Grid item xs={2}>
          <Button
            component={Link}
            to="/dispositivo"
            variant="contained"
            color="primary"
          >
            Configurar
          </Button>
        </Grid>
      </Grid> */}
    </>
  );
}

export default Configuracion;
