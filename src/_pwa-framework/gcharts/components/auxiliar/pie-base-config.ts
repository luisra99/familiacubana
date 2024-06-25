import * as echarts from "echarts/core";
import { PieChart } from "echarts/charts";
import {
  GridComponent,
  TooltipComponent,
  TitleComponent,
  LegendComponent,
} from "echarts/components";
import { CanvasRenderer } from "echarts/renderers";

echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  PieChart,
  CanvasRenderer,
  LegendComponent,
]);

export default echarts;
