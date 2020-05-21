import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Header from "./components/Header/Header";
import ArticlesSection from "./components/Home/Articles/ArticlesSection";
import AuthView from "./views/AuthView/AuthView";

import "bootstrap/dist/css/bootstrap.min.css";
import "jquery/dist/jquery.min.js";
import "bootstrap/dist/js/bootstrap.min.js";
import "./App.css";
import "./css/bootstrap_reset.css";

import AuthState from "./context/auth/AuthState";
import AlertState from "./context/alert/AlertState";
import AdminState from "./context/admin/AdminState";
import ArticleState from "./context/articles/ArticleState";

import setAuthToken from "./utils/setAuthToken";
import AdminSidebar from "./views/AdminView/AdminSidebar/AdminSidebar";
import AdminNavbar from "./views/AdminView/AdminNavbar/AdminNavbar";
import Dashboard from "./views/AdminView/Dashboard/Dashboard";

import Notification from "./components/Notification/Notification";
import ListUsers from "./components/Admin/Users/ListUsers";
import FormUser from "./components/Admin/Users/FormUser";
import Footer from "./components/Home/Footer/Footer";

require("dotenv").config();

function App() {
    if (localStorage.token) {
        setAuthToken(localStorage.token);
    }
    return (
        <Router>
            <AuthState>
                <AlertState>
                    <ArticleState>
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
                                            <ArticlesSection />
                                            <Footer />
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
                                                            component={
                                                                Dashboard
                                                            }
                                                            exact
                                                        />
                                                        <Route
                                                            path={`${url}/users`}
                                                            component={
                                                                ListUsers
                                                            }
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
                    </ArticleState>
                </AlertState>
            </AuthState>
        </Router>
    );
}

export default App;
