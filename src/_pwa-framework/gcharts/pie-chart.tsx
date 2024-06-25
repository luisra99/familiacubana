import ReactEChartsCore from "echarts-for-react/lib/core";
import echarts from "./components/auxiliar/pie-base-config";
import { Box, Card, CardHeader } from "@mui/material";
import { pieBaseOptions } from "./components/auxiliar/default-config";
export const BasicPieChart = ({
  title,
  subTitle,
  headers,
  source,
}: GPieChartProp) => {
  const data = headers.map((name, index) => {
    return { name, value: source[index] };
  });

  return (
    <Card>
      <CardHeader title={title} subheader={subTitle} />
      <Box sx={{ p: 3, pb: 1 }}>
        <ReactEChartsCore
          echarts={echarts}
          option={{
            ...pieBaseOptions,
            series: [
              {
                name: title,
                type: "pie",
                data,
              },
            ],
          }}
          notMerge={true}
          lazyUpdate={true}
          opts={{}}
        />
      </Box>
    </Card>
  );
};
