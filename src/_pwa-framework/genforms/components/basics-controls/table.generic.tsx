import {
  Card,
  Container,
  Stack,
  Table,
  TableBody,
  TableContainer,
  TablePagination,
  Typography,
} from "@mui/material";
import { Key, SetStateAction, useEffect, useState } from "react";
import {
  applyFilter,
  emptyRows,
  getComparator,
} from "../forTable/user-solicitudes/utils";

import Scrollbar from "../forTable/user-solicitudes/scrollbar";
import TableEmptyRows from "../forTable/user-solicitudes/table-empty-rows";
import TableNoData from "../forTable/user-solicitudes/table-no-data";
import UserTableHead from "../forTable/user-solicitudes/user-table-head";
import UserTableRow from "../forTable/user-solicitudes/user-table-row";
import UserTableToolbar from "../forTable/user-solicitudes/user-table-toolbar";
import useFormDataSource from "@/_pwa-framework/hooks/form/use-form-data-source";

//import { useFormikContext } from "formik";

export const BasicTableField = ({
  id,
  gridValues,
  name,
  label,
  disabled,
  placeholder,
  sx,
  multiple,
  labels = [
    { id: "name", label: "Nombre" },
    { id: "company", label: "Curso" },
    { id: "role", label: "Sede" },
    { id: "isVerified", label: "Verificado", align: "center" },
    { id: "status", label: "Estado" },
    { id: "" },
  ],
  validations,
  initialValue,
  formValue = [
    {
      name: "luis",
      company: "xetid",
      role: "programador",
      isVerified: "Verificado",
      status: "Sin internet",
    },
    {
      name: "raul",
      company: "emiat",
      role: "diseñador",
      isVerified: "No Verificado",
      status: "Con internet",
    },
  ],
}: any) => {
  const [dataSource] = useFormDataSource();

  const [items, setItems] = useState(dataSource?.[name] ?? []);
  //const { setFieldValue,values } = useFormikContext();

  useEffect(() => {
    // setFieldValue(name, initialValue, !!validations);
  }, [initialValue]);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState("asc");

  const [selected, setSelected] = useState<any>([]);

  const [orderBy, setOrderBy] = useState("name");

  const [filterName, setFilterName] = useState("");

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleSort = (event: any, id: SetStateAction<string>) => {
    const isAsc = orderBy === id && order === "asc";
    if (id !== "") {
      setOrder(isAsc ? "desc" : "asc");
      setOrderBy(id);
    }
  };

  const handleSelectAllClick = (event: { target: { checked: any } }) => {
    if (event.target.checked) {
      const newSelecteds = formValue.map((n: { name: any }) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: any, name: any) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected: any[] | ((prevState: never[]) => never[]) = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event: any, newPage: SetStateAction<number>) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: { target: { value: string } }) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const dataFiltered = applyFilter({
    inputData: formValue,
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const notFound = !dataFiltered.length && !!filterName;

  return (
    <Container>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={5}
      >
        <Typography variant="h4">{label}</Typography>
      </Stack>

      <Card>
        <UserTableToolbar
          numSelected={selected.length}
          filterName={filterName}
          onFilterName={handleFilterByName}
          placeholder={placeholder}
        />

        <Scrollbar>
          <TableContainer sx={{ overflow: "unset" }}>
            <Table sx={{ minWidth: 800 }}>
              <UserTableHead
                order={order}
                orderBy={orderBy}
                rowCount={formValue.length}
                numSelected={selected.length}
                onRequestSort={handleSort}
                onSelectAllClick={handleSelectAllClick}
                headLabel={labels}
              />
              <TableBody>
                {dataFiltered
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map(
                    (row: {
                      id: Key | null | undefined;
                      name: any;
                      role: any;
                      status: string | null | undefined;
                      company: any;
                      avatarUrl: any;
                      isVerified: any;
                    }) => (
                      <UserTableRow
                        key={row.id}
                        name={row.name}
                        role={row.role}
                        status={row.status}
                        company={row.company}
                        avatarUrl={row.avatarUrl}
                        isVerified={row.isVerified}
                        selected={selected.indexOf(row.name) !== -1}
                        handleClick={(event) => handleClick(event, row.name)}
                      />
                    )
                  )}

                <TableEmptyRows
                  height={77}
                  emptyRows={emptyRows(page, rowsPerPage, formValue.length)}
                />

                {notFound && <TableNoData query={filterName} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          page={page}
          component="div"
          count={formValue.length}
          labelRowsPerPage="Filas por página"
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </Container>
  );
};
