import Button from "@mui/material/Button";
import { Grid } from "@mui/material";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";

function Configuracion() {
  return (
    <Grid container spacing={2} my={2} mx={2}>
      <Grid item xs={12}>
        <Typography variant="h4" sx={{ mt: 4 }} textAlign={"center"}>
          <b>Configuración general </b>
        </Typography>
      </Grid>

      <Grid item xs={5}>
        <Typography variant="h6" mx={4}>
          Usuario
        </Typography>{" "}
      </Grid>
      <Grid item xs={3}>
        <Button
          component={Link}
          to="/usuario"
          variant="contained"
          color="primary"
          size="medium"
          fullWidth
        >
          Abrir
        </Button>
      </Grid>
      <Grid item xs={5}>
        <Typography variant="h6" mx={4}>
          Nomencladores{" "}
        </Typography>{" "}
      </Grid>
      <Grid item xs={3}>
        <Button
          component={Link}
          to="/nomencladores"
          variant="contained"
          color="primary"
          fullWidth
        >
          Importar
        </Button>
      </Grid>
    </Grid>
  );
}

export default Configuracion;
