import * as React from "react";
import { Redirect } from "react-router-dom";

import { Consumer as ContextConsumer } from "./Context";
import Protection from "./protections";

import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import UserType from "../../config/types/accountTypes";

interface IProps {
  protection: Protection;
}

const Consumer: React.FunctionComponent<IProps> = ({ protection }) => (
  <React.Fragment>
    <ContextConsumer>
      {({ userInfo, isLoading }) => {
        if (isLoading) {
          return <LoadingSpinner />;
        } else if (protection !== Protection.LOGGED_OUT && !userInfo) {
          return <Redirect to="/login" />;
        } else if (protection === Protection.LOGGED_OUT && userInfo) {
          return <Redirect to="/" />;
        } else if (
          protection === Protection.IS_RECRUITER &&
          userInfo &&
          userInfo.type === UserType.APPLICANT
        ) {
          return <Redirect to="/" />;
        } else if (
          protection === Protection.IS_APPLICANT &&
          userInfo &&
          userInfo.type === UserType.RECRUITER
        ) {
          return <Redirect to="/recruiter" />;
        } else {
          return <React.Fragment />;
        }
      }}
    </ContextConsumer>
  </React.Fragment>
);

export default Consumer;
