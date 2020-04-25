import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Header from "./components/Header/Header";
import AuthView from "./views/AuthView/AuthView";

import "bootstrap/dist/css/bootstrap.min.css";
import "jquery/dist/jquery.min.js";
import "bootstrap/dist/js/bootstrap.min.js";
import "./App.css";
import "./css/bootstrap_reset.css";

import AuthState from "./context/auth/AuthState";
import AlertState from "./context/alert/AlertState";

import setAuthToken from "./utils/setAuthToken";
import AdminPanel from "./views/AdminView/AdminPanel";

function App() {
    if (localStorage.token) {
        setAuthToken(localStorage.token);
    }
    return (
        <Router>
            <AuthState>
                <AlertState>
                    <>
                        <Switch>
                            <Route
                                exact
                                path="/auth"
                                render={(props) => <AuthView {...props} />}
                            />
                            <Route exact path="/" component={Header} />
                            <Route path="/admin" component={AdminPanel} />
                        </Switch>
                    </>
                </AlertState>
            </AuthState>
        </Router>
    );
}

export default App;
