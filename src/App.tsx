import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import ConfirmMessage from "./Features/Authentication/ConfirmMessage";
import Login from "./Features/Authentication/Login";
import Register from "./Features/Authentication/Register";
import Dashboard from "./Features/Dashboard/Dashboard";
import { AuthProvider } from "./Shared/Authorization";

class App extends Component {
  public render() {
    return (
      <AuthProvider>
        <Switch>
          <Route path="/" component={Dashboard} exact />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/confirm" component={ConfirmMessage} />
          <Route />
        </Switch>
      </AuthProvider>
    );
  }
}

export default App;
