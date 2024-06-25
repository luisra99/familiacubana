import { useState } from "react";

import Box from "@mui/material/Box";
import Popover from "@mui/material/Popover";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import { useLanguage } from "@/_pwa-framework/hooks/use-language";
// ----------------------------------------------------------------------

const LANGS = [
  {
    value: "gb",
    label: "English",
    icon: "/assets/icons/flags/gb.svg",
  },
  // {
  //   value: "es",
  //   label: "Español Cuba",
  //   icon: "/assets/icons/flags/cu.svg",
  // },
  {
    value: "es",
    label: "Español",
    icon: "/assets/icons/flags/es.svg",
  },
  {
    value: "ru",
    label: "Руссо",
    icon: "/assets/icons/flags/ru.svg",
  },
];

// ----------------------------------------------------------------------

export default function LanguagePopover() {
  const [open, setOpen] = useState(null);
  const { changeLanguage, language } = useLanguage();

  const handleOpen = (event: any) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          width: 40,
          height: 40,
          bgcolor: open && "action.selected",
        }}
      >
        <img src={`/assets/icons/flags/${language}.svg`} alt={LANGS[0].label} />
      </IconButton>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{
          sx: {
            p: 0,
            mt: 1,
            ml: 0.75,
            width: 180,
          },
        }}
      >
        {LANGS.map((option) => (
          <MenuItem
            key={option.value}
            selected={option.value === language}
            onClick={() => {
              changeLanguage(option.value);
              setOpen(null);
            }}
            sx={{ typography: "body2", py: 1 }}
          >
            <Box
              component="img"
              alt={option.label}
              src={option.icon}
              sx={{ width: 28, mr: 2 }}
            />

            {option.label}
          </MenuItem>
        ))}
      </Popover>
    </>
  );
}
