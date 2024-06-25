type GBarLineChartProp = {
  title: string;
  subTitle?: string;
  headers: string[];
  source: IBarLineData[];
  horizontal?: boolean;
  type: "bar" | "line";
};
type IBarLineData = {
  name?: string;
  data: number[];
};
