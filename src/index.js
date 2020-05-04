/*!

=========================================================
* Argon Dashboard React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import "assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-react.scss";
import AdminLayout from "layouts/Admin.js";
import AuthLayout from "layouts/Auth.js";
import { Security, LoginCallback, SecureRoute } from "@okta/okta-react";

const CALLBACK_PATH = "/implicit/callback";

const config = {
  clientId: "0oaavt62puvYyYag94x6",
  issuer: "https://dev-816336.okta.com/oauth2/default",
  redirectUri: "http://localhost:3000/implicit/callback",
  scopes: ["openid", "profile", "email"],
  pkce: true
};

ReactDOM.render(
  <BrowserRouter>
    <Security {...config}>
      {/* <SecureRoute path="*" /> */}
      <Switch>
        <Route path="/admin" render={props => <AdminLayout {...props} />} />
        <Route path="/auth" render={props => <AuthLayout {...props} />} />
        <Route path={CALLBACK_PATH} component={LoginCallback} />
        <Redirect from="/" to="/admin/index" />
      </Switch>
    </Security>
  </BrowserRouter>,
  document.getElementById("root")
);
