import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Header from "./components/Header/Header";
import AuthView from "./views/AuthView/AuthView";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthState from "./context/auth/AuthState";
import AlertState from "./context/alert/AlertState";

function App() {
    return (
        <Router>
            <AuthState>
                <AlertState>
                    <>
                        <Switch>
                            <Route exact path="/auth" component={AuthView} />
                            <Route exact path="/" component={Header} />
                        </Switch>
                    </>
                </AlertState>
            </AuthState>
        </Router>
    );
}

export default App;
