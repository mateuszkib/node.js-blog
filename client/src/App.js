import React, { Fragment } from "react";
import {
    BrowserRouter as Router,
    Route,
    Switch,
    withRouter,
} from "react-router-dom";

import Header from "./components/Header/Header";
import ArticlesList from "./components/Articles/ArticlesList";
import AuthView from "./views/AuthView/AuthView";

import "bootstrap/dist/css/bootstrap.min.css";
import "jquery/dist/jquery.min.js";
import "bootstrap/dist/js/bootstrap.min.js";
import "./App.css";
import "./css/bootstrap_reset.css";

import AuthState from "./context/auth/AuthState";
import AlertState from "./context/alert/AlertState";
import AdminState from "./context/admin/AdminState";

import setAuthToken from "./utils/setAuthToken";
import AdminSidebar from "./views/AdminView/AdminSidebar/AdminSidebar";
import AdminNavbar from "./views/AdminView/AdminNavbar/AdminNavbar";
import Dashboard from "./views/AdminView/Dashboard/Dashboard";

import Notification from "./components/Notification/Notification";
import ListUsers from "./components/Admin/Users/ListUsers";
import FormUser from "./components/Admin/Users/FormUser";

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
                            <Route
                                exact
                                path="/"
                                render={(props) => (
                                    <Fragment>
                                        <Header />
                                        <ArticlesList />
                                    </Fragment>
                                )}
                            />

                            {/*Admin routing*/}
                            <AdminState>
                                <Route
                                    path="/admin"
                                    render={({ match: { url } }) => (
                                        <div className="container-fluid h-100">
                                            <div className="row h-100">
                                                <AdminSidebar />
                                                <div className="col-lg-10 px-0">
                                                    <AdminNavbar />
                                                    <Route
                                                        path={`${url}/`}
                                                        component={Dashboard}
                                                        exact
                                                    />
                                                    <Route
                                                        path={`${url}/users`}
                                                        component={ListUsers}
                                                        exact
                                                    />
                                                    <Route
                                                        path={[
                                                            `${url}/users/:action/:id`,
                                                            `${url}/users/:action`,
                                                        ]}
                                                        component={FormUser}
                                                        exact
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                />
                                <Notification />
                            </AdminState>
                        </Switch>
                    </>
                </AlertState>
            </AuthState>
        </Router>
    );
}

export default withRouter(App);
