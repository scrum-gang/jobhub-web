import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import Login from "./Features/Login/Login";

class App extends Component {
  public render() {
    return (
      <main>
        <Switch>
          <Route path="/" exact />
          <Route path="/login" component={Login} />
          <Route />
        </Switch>
      </main>
    );
  }
}

export default App;
