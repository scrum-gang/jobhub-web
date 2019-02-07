import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import Login from "./Features/Authentication/Login";
import Register from "./Features/Authentication/Register";

class App extends Component {
  public render() {
    return (
      <main>
        <Switch>
          <Route path="/" exact />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route />
        </Switch>
      </main>
    );
  }
}

export default App;
