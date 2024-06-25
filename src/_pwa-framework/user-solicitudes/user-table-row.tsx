import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import { MoreVert } from "@mui/icons-material";
import Popover from "@mui/material/Popover";
import PropTypes from "prop-types";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { useState } from "react";
import {
  Grid,
  ListItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from "@mui/material";

// ----------------------------------------------------------------------

export default function UserTableRow({
  selected,
  row,
  headers,
  actions,
  handleClick,
  useCheckBox,
}: any) {
  const [open, setOpen] = useState(null);

  const handleOpenMenu = (event: any) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  // console.log('actions', actions);

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        {useCheckBox && (
          <TableCell padding="checkbox">
            <Checkbox disableRipple checked={selected} onChange={handleClick} />
          </TableCell>
        )}
        {headers.map(({ name, align }: any) => (
          <TableCell align={align ?? "left"}>{row?.[name]}</TableCell>
        ))}

        {actions && (
          <TableCell align="center">
            <IconButton onClick={handleOpenMenu}>
              <MoreVert />
            </IconButton>
          </TableCell>
        )}
        {/* {
        actions?.map(({ label, action, icon: Icon }: any) => (
          <TableCell
            align="left"
            key={label}
            sx={{ paddingLeft: 0, paddingRight: 0 }}
          >
            <Tooltip title={label}>
              <Icon
                fontSize="small"
                onClick={() => {
                  action(row);
                  handleCloseMenu();
                }}
                sx={{
                  color: "#3949ab",
                  paddingLeft: 0,
                  paddingRight: 0,
                }}
              />
            </Tooltip>
          </TableCell>
        ))
        } */}
        <TableCell align={"left"}></TableCell>
        <TableCell align={"left"}></TableCell>
      </TableRow>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        {actions?.map(({ label, action, icon: Icon, color }: any) => (
          <MenuItem
            onClick={() => {
              action(row);
              handleCloseMenu();
            }}
          >
            <ListItemIcon>
              <Icon fontSize="small" sx={{ color: color ?? "#3f51b5" }} />
            </ListItemIcon>
            <ListItemText>{label}</ListItemText>
          </MenuItem>
        ))}
      </Popover>
    </>
  );
}

UserTableRow.propTypes = {
  headers: PropTypes.any,
  row: PropTypes.any,
  handleClick: PropTypes.func,
  actions: PropTypes.any,
  selected: PropTypes.any,
  useCheckBox: PropTypes.bool,
};
