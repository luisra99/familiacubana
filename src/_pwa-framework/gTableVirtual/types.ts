import { TypographyOwnProps } from "@mui/material";
import { SxProps } from "@mui/system";

export type Header = {
  dataKey?: string;
  label: string;
  sx?: SxProps;
  labelProps?: TypographyOwnProps;
  align?: AlignSetting;
  colSpan?: number;
  rowSpan?: number;
  numeric?: boolean;
};
export type HeaderRow = Header[];
export type HeadersGroup = HeaderRow[];
