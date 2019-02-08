import * as React from "react";
import IAuthInfo from "./authInfo";

const defaultState: IAuthInfo = {
  isLoading: false,
  sessionExpiry: new Date(),
  userInfo: undefined
};

const { Consumer, Provider } = React.createContext(defaultState);

export { Provider, Consumer, defaultState };
