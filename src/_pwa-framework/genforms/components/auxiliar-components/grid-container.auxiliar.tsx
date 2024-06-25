import { Grid } from "@mui/material";

export const GridContainer = ({ children }: any) => {
  return (
    <Grid container spacing={1} p={2}>
      {children}
    </Grid>
  );
};
