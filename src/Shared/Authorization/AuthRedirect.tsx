import * as React from "react";
import { Redirect } from "react-router-dom";

import { Consumer as ContextConsumer } from "./Context";
import Protection from "./protections";

interface IProps {
  protection: Protection;
}

const Consumer: React.FunctionComponent<IProps> = ({ protection }) => (
  <React.Fragment>
    <ContextConsumer>
      {({ userInfo }) => {
        if (protection === Protection.LOGGED_IN && !userInfo) {
          return <Redirect to="/login" />;
        } else if (protection === Protection.LOGGED_OUT && userInfo) {
          return <Redirect to="/" />;
        } else {
          return <React.Fragment />;
        }
      }}
    </ContextConsumer>
  </React.Fragment>
);

export default Consumer;
