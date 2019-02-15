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

  React.useEffect(() => {
    loadFromCache();
  }, []);

  React.useEffect(() => {
    if (userInfo) {
      localStorage.setItem("userInfo", JSON.stringify(userInfo));
    } else {
      localStorage.removeItem("userInfo");
    }
  }, [userInfo]);

  React.useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
      api.setJWT(token);
      fetchInfo();
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  const fetchInfo = async () => {
    setLoading(true);

    try {
      const info = (await userAPI.getSelf()).data;
      setUserInfo(info);
    } catch (e) {
        if (e.message === "The token has expired") {
          clearCache();
        }
    }

    setLoading(false);
  };

  const updateProvider = (response: ILoginResponse) => {
    setToken(response.token);
    return fetchInfo();
  };

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

  const clearCache = () => {
    setUserInfo(undefined);
    setToken(undefined);
    api.clearJWT();
    localStorage.clear();
  };

  return (
    <ContextProvider
      value={{ isLoading, updateProvider, userInfo, token, clearCache }}
    >
      {children}
    </ContextProvider>
  );
};

export default Provider;
