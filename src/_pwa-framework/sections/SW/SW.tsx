import { useCallback, useEffect, useRef } from "react";

import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";

import type { SnackbarKey } from "notistack";
import { useRegisterSW } from "virtual:pwa-register/react";

import useNotifications from "@/_pwa-framework/store/notifications";
// TODO (Suren): this should be a custom hook :)
function SW() {
  const [, notificationsActions] = useNotifications();
  const notificationKey = useRef<SnackbarKey | null>(null);
  const {
    offlineReady: [offlineReady, setOfflineReady],
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW();

  const close = useCallback(() => {
    setOfflineReady(false);
    setNeedRefresh(false);

    if (notificationKey.current) {
      notificationsActions.close(notificationKey.current);
    }
  }, [setOfflineReady, setNeedRefresh, notificationsActions]);

  useEffect(() => {
    if (offlineReady) {
      notificationsActions.push({
        options: {
          autoHideDuration: 4500,
          content: (
            <Alert severity="success">
              Aplicación lista para funcionar desconectada.
            </Alert>
          ),
        },
      });
    } else if (needRefresh) {
      notificationKey.current = notificationsActions.push({
        message: "Una nueva versión de la app esta disponible.",
        options: {
          variant: "warning",
          persist: true,
          action: (
            <>
              <Button onClick={() => updateServiceWorker(true)}>
                Actualizar
              </Button>
              <Button onClick={close}>Cerrar</Button>
            </>
          ),
        },
      });
    }
  }, [
    close,
    needRefresh,
    offlineReady,
    notificationsActions,
    updateServiceWorker,
  ]);

  return null;
}

export default SW;
