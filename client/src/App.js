import React from "react";
import Header from "./components/Header/Header";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LoginView from "./views/LoginView/LoginView";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
    return (
        <BrowserRouter>
            <>
                <Switch>
                    <Route exact path="/" component={Header} />
                    <Route exact path="/login" component={LoginView} />
                </Switch>
            </>
        </BrowserRouter>
    );
}

export default App;
