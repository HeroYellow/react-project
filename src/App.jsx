import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import LoginContainer from "./containers/login/login";
import AdminContainer from "./containers/admin/admin";
export default class App extends Component {
  render() {
    return (
      <Switch>
        <Route path="/login" component={LoginContainer} />
        <Route path="/admin" component={AdminContainer} />
        <Redirect to="/login" />
      </Switch>
    );
  }
}
