import * as React from "react";

import { AuthRedirect, Protection } from "../../Shared/Authorization";

const Dashboard: React.FunctionComponent = () => {
  return (
    <React.Fragment>
      <AuthRedirect protection={Protection.LOGGED_IN} />
      <h1>WIP</h1>
    </React.Fragment>
  );
};

export default Dashboard;
