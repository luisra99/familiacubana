import * as echarts from "echarts/core";
import { BarChart, LineChart } from "echarts/charts";
import {
  GridComponent,
  TooltipComponent,
  TitleComponent,
} from "echarts/components";
import { CanvasRenderer } from "echarts/renderers";

echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  BarChart,
  CanvasRenderer,
  LineChart,
]);

export default echarts;
