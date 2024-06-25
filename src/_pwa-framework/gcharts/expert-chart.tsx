import ReactEChartsCore from "echarts-for-react/lib/core";
import echarts from "./components/auxiliar/bar-line-base-config";
import { Box, Card, CardHeader } from "@mui/material";
import { barLineBaseOptions } from "./components/auxiliar/default-config";
export const ExpertChart = ({ title, subTitle, options }: GExpertChartProp) => {
  return (
    <Card>
      <CardHeader title={title} subheader={subTitle} />
      <Box sx={{ p: 3, pb: 1 }}>
        <ReactEChartsCore
          echarts={echarts}
          option={{}}
          notMerge={true}
          lazyUpdate={true}
          opts={{}}
        />
      </Box>
    </Card>
  );
};
