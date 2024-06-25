import PropTypes from "prop-types";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { useTheme } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";

import { useResponsive } from "../../hooks/use-responsive";

import { bgBlur } from "../../theme/css";

import Searchbar from "./common/searchbar";
import { NAV, HEADER } from "./config-layout";
import AccountPopover from "./common/account-popover";
import LanguagePopover from "./common/language-popover";
import NotificationsPopover from "./common/notifications-popover";

export default function Header({ onOpenNav }: any) {
  const theme = useTheme();

  const lgUp = useResponsive("up", "lg");

  const renderContent = (
    <>
      {!lgUp && (
        <IconButton onClick={onOpenNav} sx={{ mr: 1 }}>
          <svg></svg>
        </IconButton>
      )}

      <Searchbar />

      <Box sx={{ flexGrow: 1 }} />

      <Stack direction="row" alignItems="center" spacing={1}>
        <LanguagePopover />
        <NotificationsPopover />
        <AccountPopover />
      </Stack>
    </>
  );
  const blur = bgBlur({
    color: theme.palette.background.default,
  });
  const _lgUp = lgUp
    ? {
        width: `calc(100% - ${NAV.WIDTH + 1}px)`,
        height: HEADER.H_DESKTOP,
      }
    : {};
  const _style = Object.assign(
    {
      boxShadow: "none",
      height: HEADER.H_MOBILE,
      zIndex: theme.zIndex.appBar + 1,
      transition: theme.transitions.create(["height"], {
        duration: theme.transitions.duration.shorter,
      }),
    },
    _lgUp
  );

  return (
    <AppBar sx={_style}>
      <Toolbar
        sx={{
          height: 1,
          px: { lg: 5 },
        }}
      >
        {renderContent}
      </Toolbar>
    </AppBar>
  );
}

Header.propTypes = {
  onOpenNav: PropTypes.func,
};
