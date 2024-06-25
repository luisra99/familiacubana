import { Grid } from "@mui/material";

export const GridItem = ({ props, children }: any) => {
  const { gridValues } = props ?? {};
  return (
    <Grid
      item
      xs={gridValues?.xs ?? 12}
      sm={gridValues?.sm ?? 6}
      md={gridValues?.md ?? 4}
      lg={gridValues?.lg ?? 4}
      xl={gridValues?.xl ?? 3}
    >
      {children}
    </Grid>
  );
};
