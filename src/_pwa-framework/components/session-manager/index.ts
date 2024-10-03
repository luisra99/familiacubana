import { getCookie } from "@/_pwa-framework/helpers/cookies";
import { useEffect } from "react";
import { useSession } from "@/_pwa-framework/session/state";

function SessionManager() {
  const [status, , { create, restore }, close, setBackDrop] = useSession();
  useEffect(() => {
    if (!!getCookie("session_state")) {
      setBackDrop(true);
      restore()
        .then((userdata: any) => {
          userdata.message ? close() : create(userdata);
        })
        .finally(() => setBackDrop(false));
    }
  }, []);
}

export default SessionManager;
