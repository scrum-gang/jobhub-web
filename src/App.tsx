import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import Login from "./Features/Authentication/Login";
import Register from "./Features/Authentication/Register";
import Dashboard from "./Features/Dashboard/Dashboard";
import UploadResume from "./Features/UploadResume/UploadResume";
import { AuthProvider } from "./Shared/Authorization";

class App extends Component {
  public render() {
    return (
      <AuthProvider authEndpoint={""}>
        <Switch>
          <Route path="/" component={Dashboard} exact />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/upload-resume" component={UploadResume} />
          <Route />
        </Switch>
      </AuthProvider>
    );
  }
}

export default App;
