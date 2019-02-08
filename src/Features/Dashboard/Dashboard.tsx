import * as React from "react";

import { AuthConsumer, Protection } from "../../Shared/Authorization";

const Dashboard: React.FunctionComponent = () => {
  return (
    <React.Fragment>
      <AuthConsumer protection={Protection.LOGGED_IN} />
      <h1>WIP</h1>
    </React.Fragment>
  );
};

export default Dashboard;
