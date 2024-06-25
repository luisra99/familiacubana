import { Grid } from "@mui/material";

export const GridItem = ({ gridValues, children }: any) => {
  return (
    <Grid
      item
      xs={gridValues?.xs}
      sm={gridValues?.sm}
      md={gridValues?.md}
      lg={gridValues?.lg}
      xl={gridValues?.xl}
    >
      {children}
    </Grid>
  );
};
