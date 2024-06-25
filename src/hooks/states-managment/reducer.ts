import { IUserInfo } from "@/hooks/states-managment/types";
import { Update } from "./types";

export default function sessionReducer(state: IUserInfo, update: Update): any {
  switch (update.type) {
    case "log-in": {
      const userData: IUserInfo = { user: "luis", role: "admin" };
      return userData;
    }
    case "is-log-in": {
      const userData: IUserInfo = { user: "luis", role: "admin" };
      return userData;
    }
    case "log-out":
      state?.ISUser
        ? console.log(Date.now(), "Cerrar sesion del IS")
        : console.log(Date.now(), "Cerrar session del backend");
      return false;
    case "sign-up":
      //Logica para registrar
      return false;
    case "restore-password":
      //Logica para restaurar
      return false;
  }
}
