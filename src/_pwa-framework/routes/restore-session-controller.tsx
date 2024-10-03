import { useEffect, useState } from "react";

import { Navigate } from "react-router-dom";
import { useSession } from "../session/state";

const RestoreSessionController = () => {
  const [user, , sessionFunctions, , ,] = useSession();
  const [path, setPath] = useState<string | null>(null);

  useEffect(() => {
    if (path == null) {
      const pagePath =
        new URL(window.location.href).searchParams.get("path") ?? "/";
      sessionFunctions?.restore?.().then((session: boolean) => {
        if (session) {
          setPath(pagePath);
        }
      });
    }
  }, [path]);

  return path === null ? (
    <></>
  ) : path ? (
    <Navigate to={path} />
  ) : (
    <Navigate to="/landing" />
  );
};
export default RestoreSessionController;
