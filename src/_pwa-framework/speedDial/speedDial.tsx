import { Box, SpeedDial, SpeedDialAction, SpeedDialIcon } from "@mui/material";
import { useState } from "react";

import { actions } from "@/app/SpeedDialogConfig";
import useModalState from "../hooks/form/use-form-manager";
export default function BasicSpeedDial() {
  const [open, setOpen] = useState<boolean>();
  const { modalActions } = useModalState();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    actions.length && (
      <Box
        sx={{
          height: 320,
          flexGrow: 1,
          position: "fixed",
          bottom: 0,
          right: 0,
          zIndex: 99999,
        }}
      >
        <SpeedDial
          ariaLabel={"speedDial"}
          sx={{ position: "absolute", bottom: 5, right: 5 }}
          onClose={handleClose}
          onOpen={handleOpen}
          icon={<SpeedDialIcon />}
          open={open}
        >
          {actions.map((action: any) => (
            <SpeedDialAction
              key={action.name}
              icon={<action.icon />}
              onClick={() => {
                action.action();
                handleClose();
                if (action.modal) {
                  modalActions.open(action.modal);
                }
              }}
              tooltipTitle={action.name}
              tooltipOpen
            />
          ))}
        </SpeedDial>
      </Box>
    )
  );
}
