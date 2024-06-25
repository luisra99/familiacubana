import { Helmet } from "react-helmet-async";

import LoginView from "./login-view";

// ----------------------------------------------------------------------

export function LoginPage() {
  return (
    <>
      <Helmet>
        <title> Login | Minimal UI </title>
      </Helmet>
      <LoginView />
    </>
  );
}
