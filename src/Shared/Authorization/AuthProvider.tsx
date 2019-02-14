import * as React from "react";
import { defaultState, Provider as ContextProvider } from "./Context";

import userAPI from "../../api/userAPI";

const Provider: React.FunctionComponent = ({ children }) => {
  const [isLoading, setLoading] = React.useState(defaultState.isLoading);
  const [userInfo, setUserInfo] = React.useState(defaultState.userInfo);
  const [sessionExpiry, setSessionExpiry] = React.useState(
    defaultState.sessionExpiry
  );

  React.useEffect(() => {
    if (!isLoading && !userInfo) {
      fetchInfo();
    }
  }, []);

  const fetchInfo = async () => {
    setLoading(true);
    try {
      const info = (await userAPI.getSelf()).data;
      setUserInfo(info);
    } catch (e) {
      setUserInfo(undefined);
    }
    setLoading(false);
  };

  return (
    <ContextProvider value={{ isLoading, userInfo, sessionExpiry }}>
      {children}
    </ContextProvider>
  );
};

export default Provider;
