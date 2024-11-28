import { TableCell, Typography } from "@mui/material";
import { copyToClipboard } from "./utils";
import { HeadersGroup } from "../types";

export const useRow = (headersAgrupados: HeadersGroup) => {
  return (_index: number, row: any) => (
    <>
      {headersAgrupados[headersAgrupados.length - 1].map((column, index) => (
        <TableCell
          key={column.dataKey}
          align={column.numeric ? "right" : "left"}
          sx={{
            padding: "8px",
            backgroundColor: _index % 2 === 0 ? "#fafafa" : "#fff",
            borderLeft: index == 0 ? "1px solid #ddd" : "unset",
            borderRight: "1px solid #ddd", // Agregado para separar columnas
            "&:hover": { backgroundColor: "#f0f0f0" },
          }}
          onClick={() => copyToClipboard(row[column.dataKey as never])} // Copia al portapapeles
        >
          <Typography>{row[column.dataKey as never]}</Typography>
        </TableCell>
      ))}
    </>
  );
};
