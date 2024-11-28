import { TableCell, TableRow, Typography } from "@mui/material";
import { HeaderRow, HeadersGroup } from "../types";

export const useFixHeader = (headersAgrupados: HeadersGroup) => {
  return () => (
    <>
      {headersAgrupados?.map((headerRow: HeaderRow, headerRowIndex: number) => {
        if (headerRowIndex === headersAgrupados.length - 1) {
          return (
            <TableRow>
              {headerRow.map((header, index) => (
                <TableCell
                  key={header.dataKey}
                  align={header.numeric ? "right" : "left"}
                  sx={{
                    borderLeft: index == 0 ? "1px solid #ddd" : "unset",
                    position: "sticky",
                    backgroundColor: "#f5f5f5",
                    borderRight: "1px solid #ddd", // Agregado para separación de columnas
                    ...header.sx,
                  }}
                >
                  <Typography {...header.labelProps}>{header.label}</Typography>
                </TableCell>
              ))}
            </TableRow>
          );
        } else {
          return (
            <TableRow
              key={`group-${headerRowIndex}`}
              sx={{
                position: "sticky",
                top: headerRowIndex * 36,
                zIndex: 1,
                backgroundColor: "#f5f5f5",
                borderBottom: "1px solid #ddd",
              }}
            >
              {headerRow.map((header: any, headerIndex) => (
                <TableCell
                  key={`header-${headerIndex}`}
                  align={header.align}
                  colSpan={header.colSpan}
                  rowSpan={header.rowSpan}
                  sx={{
                    ...header.sx,
                    position: "sticky",
                    borderTop: headerRowIndex == 0 ? "1px solid #ddd" : "unset",
                    borderLeft:
                      headerRowIndex == 0 && headerIndex == 0
                        ? "1px solid #ddd"
                        : "unset",
                    top: headerRowIndex * 36,
                    backgroundColor: "#f5f5f5",
                    borderRight: "1px solid #ddd", // Agregado para separación de columnas
                  }}
                >
                  <Typography variant="subtitle2" {...header.labelProps}>
                    {header.label}
                  </Typography>
                </TableCell>
              ))}
            </TableRow>
          );
        }
      })}
    </>
  );
};
