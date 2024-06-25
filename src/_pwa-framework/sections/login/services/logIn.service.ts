import { removeCookie } from "@/_pwa-framework/helpers/cookies";

export async function LogIn(username: string, password: string): Promise<any> {
  localStorage.setItem("RJWT", username);
  location.reload();

  try {
    // const { data } = await axios.get(
    //   `${import.meta.env.VITE_SERVER_URL}${apiScope}historico`,
    //   { params: { idestructura, subordinacion } }
    // );
    return "data";
  } catch (error) {
    console.error("Error consuming LogIn API", error);
    return {
      accessError:
        "Error al intentar iniciar sesión, compruebe su conexión a internet.",
    };
  }
}
export async function LogOut(): Promise<any> {
  try {
    // const { data } = await axios.get(
    //   `${import.meta.env.VITE_SERVER_URL}${apiScope}historico`,
    //   { params: { idestructura, subordinacion } }
    // );
    localStorage.removeItem("offlineSessionActive");
    removeCookie("JWT");
    location.reload();
    return "data";
  } catch (error) {
    console.error("Error consuming LogIn API", error);
    return {
      accessError:
        "Error al intentar iniciar sesión, compruebe su conexión a internet.",
    };
  }
}
