import { getCookie } from "@/_pwa-framework/helpers/cookies";
import { useSession } from "@/_pwa-framework/session/state";
import { useEffect } from "react";
import { restoreSession } from "@/_pwa-framework/session/helpers";

function SessionManager() {
  const [status, , create, close, , setBackDrop] = useSession();
  useEffect(() => {
    if (!!getCookie("session_state")) {
      setBackDrop(true);
      restoreSession()
        .then((userdata: any) => {
          console.log(Date.now(), userdata.message);
          userdata.message ? close() : create(userdata);
        })
        .finally(() => setBackDrop(false));
    }
  }, []);
}

export default SessionManager;
