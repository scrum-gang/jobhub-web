import * as React from "react";
import { defaultState, Provider as ContextProvider } from "./Context";

import applicationsAPI from "../../api/applicationsAPI";
import postingsAPI from "../../api/postingsAPI";
import userAPI from "../../api/userAPI";
import ILoginResponse from "../../config/types/loginResponse";

const Provider: React.FunctionComponent = ({ children }) => {
  const [isLoading, setLoading] = React.useState(defaultState.isLoading);
  const [userInfo, setUserInfo] = React.useState(defaultState.userInfo);

  // read from cache on page load
  React.useEffect(() => {
    loadFromCache();
    fetchInfo();
  }, []);

  // fetch user info
  // if token expired, then clear cache
  const fetchInfo = async () => {
    try {
      const info = (await userAPI.getSelf()).data;
      setUserInfo(info);
    } catch (e) {
      clearStateAndCache();
    }
    setLoading(false);
  };

  // helper function to update the provider from a consumer
  const updateProvider = (response: ILoginResponse) => {
    localStorage.setItem("token", response.token);

    loadTokensForApis(response.token);
    return fetchInfo();
  };

  // load stuff from cache
  const loadFromCache = () => {
    const jwt = localStorage.getItem("token");
    if (jwt) {
      loadTokensForApis(jwt);
    }
  };

  const clearStateAndCache = () => {
    setUserInfo(undefined);
    clearTokensForApis();
    localStorage.clear();
  };

  const loadTokensForApis = (token: string) => {
    userAPI.setJWT(token);
    applicationsAPI.setJWT(token);
  };

  const clearTokensForApis = () => {
    userAPI.clearJWT();
    applicationsAPI.clearJWT();
    postingsAPI.clearJWT();
  };

  return (
    <ContextProvider
      value={{
        clearStateAndCache,
        isLoading,
        updateProvider,
        userInfo
      }}
    >
      {children}
    </ContextProvider>
  );
};

export default Provider;
