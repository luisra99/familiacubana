import {
  Collapse,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { Fragment, useEffect, useState } from "react";
import { atom, useRecoilState } from "recoil";

import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import { NAV } from "@/_pwa-framework/layouts/dashboard/config-layout";
import { RouterLink } from "@/_pwa-framework/routes/components";
import { Routes } from "@/_pwa-framework/routes/types";
import Scrollbar from "@/_pwa-framework/components/scrollbar/scrollbar";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { alpha } from "@mui/material/styles";
import { handleDownload } from "@/app/user-interfaces/forms/models/export";
import routes from "@/_pwa-framework/routes";
import { usePathname } from "@/_pwa-framework/routes/hooks";
import { useResponsive } from "@/_pwa-framework/hooks/use-responsive";
import { useSession } from "@/_pwa-framework/session/state";
import useTheme from "@/_pwa-framework/store/theme";

// ----------------------------------------------------------------------

export default function Nav({ openNav, onCloseNav }: any) {
  const pathname = usePathname();
  const [theme, themeActions] = useTheme();
  const [state] = useSession();
  const [open, setOpen] = useState<any>({});
  const handleClick = (param?: string) => {
    param && setOpen((prevState: any) => ({ [param]: !prevState[param] }));
  };

  const upLg = useResponsive("up", "lg");

  const [hogarActualDireccion, setHogarActualDireccion] = useRecoilState(
    atomHogarActualDireccion
  );
  const [hogarActualJefe, setHogarActualJefe] =
    useRecoilState(atomHogarActualJefe);

  useEffect(() => {
    const direccion = localStorage.getItem("hogarActualDireccion");
    // const jefe =  localStorage.getItem("hogarActualJefe")
    const jefe = localStorage
      .getItem("hogarActualJefe")
      ?.toLowerCase()
      .includes("object")
      ? ""
      : localStorage.getItem("hogarActualJefe");
    setHogarActualJefe(jefe ?? "");
    setHogarActualDireccion(direccion ?? "");
  });

  useEffect(() => {
    if (openNav) {
      onCloseNav();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const renderAccount = (
    <Box
      sx={{
        mt: 1,
        mx: 2.5,
        py: 2,
        px: 2.5,
        display: "flex",
        borderRadius: 1.5,
        alignItems: "center",
        bgcolor: (theme) => alpha(theme.palette.grey[500], 0.12),
      }}
    >
      <Avatar src={state?.PI?.img} alt="photoURL" />

      <Box sx={{ ml: 2 }}>
        <Typography variant="subtitle2">{state?.PI?.username}</Typography>

        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {state?.PI?.rol ?? "Invitado"}
        </Typography>
      </Box>
    </Box>
  );

  const renderMenu = (
    <Stack component="nav" spacing={0.5} sx={{ px: 2 }}>
      {Object.values(routes)
        .filter((route) => route.title)
        .map((item) => (
          <NavItem key={item.title} item={item} />
        ))}
    </Stack>
  );

  const renderUpgrade = (
    <Box sx={{ px: 2.5, pb: 3 }}>
      <Stack
        alignItems="center"
        spacing={3}
        sx={{ pt: 5, borderRadius: 2, position: "relative" }}
      >
        <Button
          onClick={() => handleDownload(state)}
          variant="contained"
          color="inherit"
        >
          Exportar datos
        </Button>
      </Stack>
    </Box>
  );

  const selectedHome = () => (
    <Box
      sx={{
        my: 1,
        mx: 2.5,
        py: 2,
        px: 2.5,
        borderRadius: 1.5,
        alignItems: "center",
        bgcolor: (theme) => alpha(theme.palette.grey[500], 0.12),
      }}
    >
      <Typography variant="h6" sx={{ color: "primary.main" }}>
        <b>
          {!!hogarActualDireccion?.length
            ? "Hogar actual"
            : "Hogar no seleccionado"}
        </b>
      </Typography>
      {!!hogarActualDireccion?.length && (
        <Fragment>
          <Typography sx={{ color: "primary.main" }}>
            <b>Jefe del hogar: </b>
          </Typography>
          <Typography variant="caption">
            {hogarActualJefe.length ? hogarActualJefe : "Pendiente a definir"}
          </Typography>
          <Typography sx={{ color: "primary.main" }}>
            <b>Dirección: </b>
          </Typography>
          <Typography variant="caption">
            {hogarActualDireccion ?? ""}
          </Typography>
        </Fragment>
      )}
    </Box>
  );

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        "& .simplebar-content": {
          height: 1,
          display: "flex",
          flexDirection: "column",
        },
      }}
    >
      {/* <Logo
        sx={{ ml: 4, mt: 2, width: 50, height: 50 }}
        onDoubleClick={themeActions.toggle}
      /> */}
      {renderAccount}
      {selectedHome()}
      {drawerMenu()}
      <Box sx={{ flexGrow: 1 }} />
      {renderUpgrade}
    </Scrollbar>
  );

  function drawerMenu(routesList: Routes = routes, parent = "") {
    return (
      <Stack component="nav" spacing={0.5} sx={{ px: parent ? 0 : 2 }}>
        {Object.values(routesList)
          .filter(({ title }) => title)
          .map((item) => {
            const { subPath, path, title, icon: Icon } = item;

            if (subPath === undefined) {
              return <NavItem key={path} item={item} parent={parent} />;
            } else
              return (
                <Fragment key={path}>
                  <ListItemButton
                    onClick={() => handleClick(title)}
                    sx={{
                      minHeight: 44,
                      borderRadius: 0.75,
                      typography: "body2",
                      color: "text.secondary",
                      fontWeight: "fontWeightMedium",
                    }}
                  >
                    <ListItemIcon>{item.icon && <item.icon />}</ListItemIcon>
                    <ListItemText sx={{ ml: -2 }}>{item.title}</ListItemText>
                    {open[item.title as never] ? (
                      <ExpandLess />
                    ) : (
                      <ExpandMore />
                    )}
                  </ListItemButton>

                  <Collapse
                    in={open[title as never]}
                    timeout="auto"
                    unmountOnExit
                    sx={{
                      borderRadius: 0.75,
                      backdropFilter: `brightness(${0.97})`,
                    }}
                  >
                    <Stack component="nav" spacing={0.5} sx={{ px: 0 }}>
                      {drawerMenu(subPath, path)}
                    </Stack>
                  </Collapse>
                </Fragment>
              );
          })}
      </Stack>
    );
  }

  return (
    <Box
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV.WIDTH },
      }}
    >
      {upLg ? (
        <Box
          sx={{
            height: 1,
            position: "fixed",
            width: NAV.WIDTH,
            borderRight: (theme) => `dashed 1px ${theme.palette.divider}`,
          }}
        >
          {renderContent}
        </Box>
      ) : (
        <Drawer
          open={openNav}
          onClose={onCloseNav}
          PaperProps={{
            sx: {
              width: NAV.WIDTH,
            },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </Box>
  );
}

// ----------------------------------------------------------------------

function NavItem({ item, parent }: any) {
  const pathname = usePathname();

  const active = `${parent}${item.path}` === pathname;

  return (
    <ListItemButton
      component={RouterLink}
      href={parent + item.path}
      name={parent + item.path}
      sx={{
        minHeight: 44,
        borderRadius: 0.75,
        typography: "body2",
        color: "text.secondary",
        fontWeight: "fontWeightMedium",
        ...(active && {
          color: "primary.main",
          fontWeight: "fontWeightSemiBold",
          bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08),
          "&:hover": {
            bgcolor: (theme) => alpha(theme.palette.primary.main, 0.16),
          },
        }),
      }}
    >
      <Box sx={{ width: 24, height: 24, mr: 2 }}>
        <item.icon />
      </Box>

      <Box component="span">{item.title}</Box>
    </ListItemButton>
  );
}

export const atomHogarActualDireccion = atom({
  key: "hogarActualDireccion",
  default: "",
});

export const atomHogarActualJefe = atom({
  key: "hogarActualJefe",
  default: "",
});
