import { Key, SetStateAction, useState } from "react";
import { applyFilter, emptyRows, getComparator } from "../utils";

import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import Scrollbar from "../scrollbar";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableEmptyRows from "../table-empty-rows";
import TableNoData from "../table-no-data";
import TablePagination from "@mui/material/TablePagination";
import Typography from "@mui/material/Typography";
import UserTableHead from "../user-table-head";
import UserTableRow from "../user-table-row";
import UserTableToolbar from "../user-table-toolbar";
import { faker } from "@faker-js/faker";
import { sample } from "lodash";

// ----------------------------------------------------------------------

export default function UserPage() {
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
      const newSelecteds = users?.map((n) => n.name);
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
    inputData: users,
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
        <Typography variant="h4">Solicitudes</Typography>
      </Stack>

      <Card>
        <UserTableToolbar
          numSelected={selected.length}
          filterName={filterName}
          onFilterName={handleFilterByName}
        />

        <Scrollbar>
          <TableContainer sx={{ overflow: "unset" }}>
            <Table sx={{ minWidth: 800 }}>
              <UserTableHead
                order={order}
                orderBy={orderBy}
                rowCount={users.length}
                numSelected={selected.length}
                onRequestSort={handleSort}
                onSelectAllClick={handleSelectAllClick}
                headLabel={[
                  { id: "name", label: "Nombre" },
                  { id: "company", label: "Curso" },
                  { id: "role", label: "Sede" },
                  { id: "isVerified", label: "Verificado", align: "center" },
                  { id: "status", label: "Estado" },
                  { id: "" },
                ]}
              />
              <TableBody>
                {dataFiltered
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  ?.map(
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
                  emptyRows={emptyRows(page, rowsPerPage, users.length)}
                />

                {notFound && <TableNoData query={filterName} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          page={page}
          component="div"
          count={users.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </Container>
  );
}

// ----------------------------------------------------------------------

export const users = [...Array(24)].map((_, index) => ({
  id: faker.string.uuid(),
  avatarUrl: `/assets/images/avatars/avatar_${index + 1}.jpg`,
  name: faker.person.fullName(),
  company: sample([
    "Antivirus",
    "Arquitectura de Máquinas",
    "Redes Sociales",
    "Plataforma Ticket",
    "Programación",
    "Ofimática",
  ]),
  isVerified: faker.datatype.boolean(),
  status: sample(["Aprobado", "Denegado", "Pendiente"]),
  role: sample(["JG", "AG", "CZ", "PB", "MC", "AT"]),
}));
