import * as React from "react";
import IAuthInfo from "./authInfo";

const defaultState: IAuthInfo = {
  clearCache: () => null,
  isLoading: false,
  token: "",
  updateProvider: () => null,
  userInfo: undefined
};

const AuthorizationContext = React.createContext(defaultState);
const { Consumer, Provider } = AuthorizationContext;

export { Provider, Consumer, defaultState };
export default AuthorizationContext;
