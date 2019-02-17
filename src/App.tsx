import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import { CssBaseline } from "@material-ui/core";

import ConfirmMessage from "./Features/Authentication/ConfirmMessage";
import Login from "./Features/Authentication/Login";
import Register from "./Features/Authentication/Register";
import Dashboard from "./Features/Dashboard/Dashboard";
import { AuthConsumer, AuthProvider } from "./Shared/Authorization";
import Navigation from "./Shared/Navigation/Navigation";

class App extends Component {
  private routes = (
    <Switch>
      <Route path="/" component={Dashboard} exact />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/confirm" component={ConfirmMessage} />
      <Route />
    </Switch>
  );

  public render() {
    return (
      <AuthProvider>
        <CssBaseline />
        <AuthConsumer>
          {({ userInfo }) =>
            !!userInfo ? <Navigation>{this.routes}</Navigation> : this.routes
          }
        </AuthConsumer>
      </AuthProvider>
    );
  }
}

export default App;
