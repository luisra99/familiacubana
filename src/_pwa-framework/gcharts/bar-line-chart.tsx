import ReactEChartsCore from "echarts-for-react/lib/core";
import echarts from "./components/auxiliar/bar-line-base-config";
import { Box, Card, CardHeader } from "@mui/material";
import { barLineBaseOptions } from "./components/auxiliar/default-config";
export const BasicBarLineChart = ({
  title,
  subTitle,
  headers,
  source,
  horizontal,
  type,
}: GBarLineChartProp) => {
  const series = source.map((group) => {
    return { ...group, type };
  });
  const xAxis = {
    type: horizontal ? "value" : "category",
    data: horizontal ? undefined : headers,
  };
  const yAxis = {
    type: horizontal ? "category" : "value",
    data: horizontal ? headers : undefined,
  };
  return (
    <Card>
      <CardHeader title={title} subheader={subTitle} />
      <Box sx={{ p: 3, pb: 1 }}>
        <ReactEChartsCore
          echarts={echarts}
          option={{ ...barLineBaseOptions, xAxis, yAxis, series }}
          notMerge={true}
          lazyUpdate={true}
          opts={{}}
        />
      </Box>
    </Card>
  );
};
