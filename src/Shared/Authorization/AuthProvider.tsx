import * as React from "react";
import { defaultState, Provider as ContextProvider } from "./Context";

import api from "../../api/api";
import userAPI from "../../api/userAPI";
import ILoginResponse from "../../config/types/loginResponse";
import IUser from "../../config/types/user";

const Provider: React.FunctionComponent = ({ children }) => {
  const [isLoading, setLoading] = React.useState(defaultState.isLoading);
  const [userInfo, setUserInfo] = React.useState(defaultState.userInfo);
  const [token, setToken] = React.useState(defaultState.token);

  // read from cache on page load
  React.useEffect(() => {
    loadFromCache();
  }, []);

  // on userInfo update, update cache
  React.useEffect(() => {
    if (userInfo) {
      localStorage.setItem("userInfo", JSON.stringify(userInfo));
    } else {
      localStorage.removeItem("userInfo");
    }
  }, [userInfo]);

  // on token update, update cache and api instance
  // and attempt to fetch user info again
  React.useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
      api.setJWT(token);
      fetchInfo();
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  // fetch user info
  // if token expired, then clear cache
  const fetchInfo = async () => {
    setLoading(true);

    try {
      const info = (await userAPI.getSelf()).data;
      setUserInfo(info);
    } catch (e) {
      if (e.data.message === "The token has expired") {
        clearStateAndCache();
      }
    }

    setLoading(false);
  };

  // helper function to update the provider from a consumer
  const updateProvider = (response: ILoginResponse) => {
    setToken(response.token);
    return fetchInfo();
  };

  // load stuff from cache
  const loadFromCache = () => {
    const infoString = localStorage.getItem("userInfo");
    if (infoString) {
      const info = JSON.parse(infoString) as IUser;
      setUserInfo(info);
    }

    const jwt = localStorage.getItem("token");
    if (jwt) {
      setToken(jwt);
    }
  };

  const clearStateAndCache = () => {
    setUserInfo(undefined);
    setToken(undefined);
    api.clearJWT();
    localStorage.clear();
  };

  return (
    <ContextProvider
      value={{
        clearStateAndCache,
        isLoading,
        token,
        updateProvider,
        userInfo
      }}
    >
      {children}
    </ContextProvider>
  );
};

export default Provider;
