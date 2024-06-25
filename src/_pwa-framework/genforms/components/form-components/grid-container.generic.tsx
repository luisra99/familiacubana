import { Grid } from "@mui/material";

export const GridContainer = ({ props, children }: any) => {
  return (
    <Grid container spacing={1} p={3}>
      {children}
    </Grid>
  );
};
