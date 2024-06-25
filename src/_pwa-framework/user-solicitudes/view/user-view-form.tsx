import { Button, DialogActions } from "@mui/material";
import { applyFilter, emptyRows, getComparator } from "../utils";

import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import { FC, useEffect } from "react";
import Scrollbar from "../scrollbar";
import Stack from "@mui/material/Stack";
import type { SvgIconProps } from "@mui/material/SvgIcon";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableEmptyRows from "../table-empty-rows";
import TableNoData from "../table-no-data";
import TablePagination from "@mui/material/TablePagination";
import Typography from "@mui/material/Typography";
import UserTableHead from "../user-table-head";
import UserTableRow from "../user-table-row";
import { useState } from "react";
import { useFormikContext } from "formik";

// ----------------------------------------------------------------------

export function TableViewForm({
  headers,
  title,
  values = [],
  filterBy,
  idKey,
  multiSelect,
  dataActions,
  rowActions,
  disabled,
  setState,
  name,
  defaultValues,
}: {
  headers: {
    name: string;
    align?: "left" | "right" | "center";
    label: string;
  }[];
  name: string;
  title: string;
  values: any[];
  idKey: string;
  multiSelect: boolean;
  filterBy?: string;
  dataActions?: { label: string; action: (values: any) => void }[];
  rowActions?: {
    label: string;
    action: (values: any) => void;
    icon?: FC<SvgIconProps>;
  }[];
  disabled?: boolean;
  setState?: any;
  defaultValues?: any;
}) {
  const [page, setPage] = useState(0);
  const { setFieldValue, values: formikValues } = useFormikContext();

  const [order, setOrder] = useState("asc");

  const [selected, setSelected] = useState<any[]>(defaultValues ?? []);

  const [orderBy, setOrderBy] = useState("name");

  const [filterName, setFilterName] = useState("");

  const [rowsPerPage, setRowsPerPage] = useState(5);

  console.log("Selected", selected);

  const handleSort = (event: any, id: any) => {
    const isAsc = orderBy === id && order === "asc";
    if (id !== "") {
      setOrder(isAsc ? "desc" : "asc");
      setOrderBy(id);
    }
  };

  const handleSelectAllClick = (event: any) => {
    if (event.target.checked) {
      const newSelecteds = values.map((n) => n[idKey]);
      setSelected(newSelecteds);
      setState?.(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: any, name: any) => {
    // console.log(name, idKey);
    const selectedIndex = selected.indexOf(name);

    let newSelected: any[] = [];
    if (selectedIndex === -1) {
      if (!multiSelect) {
        newSelected = [name];
      } else {
        newSelected = newSelected.concat(selected, name);
      }
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
    setFieldValue(name, newSelected);
    setSelected(newSelected);
    setState?.(newSelected);
  };

  const handleChangePage = (event: any, newPage: any) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event: any) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const dataFiltered = applyFilter({
    inputData: values,
    comparator: getComparator(order, orderBy),
    filterName,
    name: filterBy,
  });

  const notFound = !dataFiltered.length && !!filterName;

  return (
    <Container sx={{ minWidth: "100%" }}>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={5}
        display={disabled ? "none" : "unset"}
      >
        <Typography variant="h5">{title}</Typography>
      </Stack>

      <Card sx={{ display: disabled ? "none" : "unset", width: "100%" }}>
        {/* <UserTableToolbar
          numSelected={selected.length}
          filterName={filterName}
          onFilterName={handleFilterByName}
          filterBy={filterBy}
        /> */}

        <Scrollbar>
          <TableContainer sx={{ overflow: "unset" }}>
            <Table sx={{ minWidth: 800 }}>
              <UserTableHead
                order={order}
                orderBy={orderBy}
                rowCount={values.length}
                numSelected={selected.length}
                onRequestSort={handleSort}
                onSelectAllClick={handleSelectAllClick}
                headLabel={headers}
                rowActions={rowActions}
              />
              <TableBody>
                {dataFiltered
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  ?.map((row: any) => {
                    // console.log(row);
                    return (
                      <UserTableRow
                        key={row?.[idKey]}
                        row={row}
                        headers={headers}
                        actions={rowActions}
                        selected={selected.indexOf(row?.[idKey]) !== -1}
                        handleClick={(event) =>
                          handleClick(event, row?.[idKey])
                        }
                      />
                    );
                  })}

                <TableEmptyRows
                  height={77}
                  emptyRows={emptyRows(page, rowsPerPage, values.length)}
                />

                {notFound && <TableNoData query={filterName} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>
        <DialogActions>
          {dataActions?.map((action) => (
            <Button
              onClick={() => {
                const selectedRows = values.filter((item) =>
                  selected.includes(item[idKey])
                );
                action.action(selectedRows);
              }}
              color="primary"
              variant="contained"
            >
              {action.label}
            </Button>
          ))}
        </DialogActions>
        <TablePagination
          page={page}
          component="div"
          count={values.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          labelRowsPerPage="Filas por página"
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </Container>
  );
}
