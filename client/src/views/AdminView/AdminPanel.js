import React, { useState, useContext, useEffect } from "react";

import AdminSidebar from "./AdminSidebar/AdminSidebar";
import AdminNavbar from "./AdminNavbar/AdminNavbar";
import Dashboard from "../../components/Admin/Dashboard";
import ListArticles from "../../components/Admin/Articles/ListArticles";
import AddUser from "../../components/Admin/Users/FormUser";
import ListUsers from "../../components/Admin/Users/ListUsers";

import AuthContext from "../../context/auth/authContext";
import AdminContext from "../../context/admin/adminContext";

const AdminPanel = (props) => {
    const authContext = useContext(AuthContext);
    const { loadUser } = authContext;

    const adminContext = useContext(AdminContext);
    const { component } = adminContext;

    useEffect(() => {
        loadUser();
    }, []);

    const components = {
        dashboard: Dashboard,
        showAllArticles: ListArticles,
        addNewUser: AddUser,
        showAllUsers: ListUsers,
    };

    const Component = components[component];

    return (
        <div className="container-fluid h-100">
            <div className="row h-100">
                <div className="col-2 bg-dark">
                    <AdminSidebar />
                </div>
                <div className="col-10 px-0" style={{ position: "relative" }}>
                    <AdminNavbar />
                    <Component {...props} />
                </div>
            </div>
        </div>
    );
};

AdminPanel.propTypes = {};

export default AdminPanel;
