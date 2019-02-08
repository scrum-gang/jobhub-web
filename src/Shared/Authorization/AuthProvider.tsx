import * as React from "react";
import { defaultState, Provider as ContextProvider } from "./Context";

interface IProps {
  authEndpoint: string;
}

const Provider: React.FunctionComponent<IProps> = ({
  authEndpoint,
  children
}) => {
  const [isLoading, setLoading] = React.useState(defaultState.isLoading);
  const [userInfo, setUserInfo] = React.useState(defaultState.userInfo);
  const [sessionExpiry, setSessionExpiry] = React.useState(
    defaultState.sessionExpiry
  );

  React.useEffect(() => {
    if (!userInfo && authEndpoint) {
      fetchInfo();
    }
  });

  const toggleLoading = () => {
    setLoading(!isLoading);
  };

  const fetchInfo = () => {
    // todo
  };

  return (
    <ContextProvider value={{ isLoading, userInfo, sessionExpiry }}>
      {children}
    </ContextProvider>
  );
};

export default Provider;
