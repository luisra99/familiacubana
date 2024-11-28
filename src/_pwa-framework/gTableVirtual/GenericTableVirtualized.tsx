import Paper from "@mui/material/Paper";
import { TableVirtuoso } from "react-virtuoso";
import { HeadersGroup } from "./types";
import { VirtuosoTableComponents } from "./components/VItuoso";
import { useFixHeader } from "./components/useFixHeader";
import { useRow } from "./components/useRow";

export default function GenericTableVirtualized({
  headersAgrupados,
  data,
}: {
  headersAgrupados: HeadersGroup;
  data: any[];
}) {
  const fixedHeaderContent = useFixHeader(headersAgrupados);
  const rowContent = useRow(headersAgrupados);
  return (
    <Paper
      style={{
        height: "80vh",
        width: "100%",
        marginTop: "50px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
      }}
    >
      <TableVirtuoso
        data={data}
        components={VirtuosoTableComponents}
        fixedHeaderContent={fixedHeaderContent}
        itemContent={rowContent}
      />
    </Paper>
  );
}
