import * as React from "react";
import IAuthInfo from "./authInfo";

const defaultState: IAuthInfo = {
  clearStateAndCache: () => null,
  isLoading: true,
  updateProvider: () => null,
  userInfo: undefined
};

const AuthorizationContext = React.createContext(defaultState);
const { Consumer, Provider } = AuthorizationContext;

export { Provider, Consumer, defaultState };
export default AuthorizationContext;
