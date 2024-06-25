import { LogIn } from "../../services/logIn.service";
import { CustomDispatch } from "../types";

export default function logIn(
  dispatch: CustomDispatch,
  username: string,
  password: string
) {
  return async () => {
    try {
      const { userInfo, accessError } = await LogIn(username, password);
      // dispatch({
      //   type: "log-in",
      //   userInfo,
      //   accessError,
      // });
    } catch (e) {
      console.error(e);
    }
  };
}
