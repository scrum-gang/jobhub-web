import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";

// tslint:disable-next-line
import "react-toastify/dist/ReactToastify.css";

import { CssBaseline } from "@material-ui/core";

import Applications from "./Features/Applications/Applications";
import EditApplication from "./Features/Applications/EditApplication";
import Login from "./Features/Authentication/Login";
import Register from "./Features/Authentication/Register";

import Dashboard from "./Features/Dashboard/Dashboard";
import Postings from "./Features/Postings/Postings";
import ViewPosting from "./Features/Postings/ViewPosting";
import ResumeUpload from "./Features/ResumeUpload/Upload";

import { AuthConsumer, AuthProvider } from "./Shared/Authorization";
import Navigation from "./Shared/Navigation/Navigation";
import Profile from "./Features/Profile/Profile";

class App extends Component {
  private routes = (
    <Switch>
      <Route path="/" component={Dashboard} exact />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/resume" component={ResumeUpload} />
      <Route path="/applications" component={Applications} exact />
      <Route path="/applications/:appid" component={EditApplication} />
      <Route path="/postings" component={Postings} exact />
      <Route path="/postings/:postingid" component={ViewPosting} />
      <Route path="/profile" component={Profile} />
    </Switch>
  );

  public render() {
    return (
      <AuthProvider>
        <CssBaseline />
        <ToastContainer />
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
