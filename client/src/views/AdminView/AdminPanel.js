import React, { useState } from "react";

import AdminSidebar from "./AdminSidebar/AdminSidebar";
import AdminNavbar from "./AdminNavbar/AdminNavbar";
import Dashboard from "../../components/Admin/Dashboard";
import ListArticles from "../../components/Admin/Articles/ListArticles";

const AdminPanel = (props) => {
    const [component, setComponent] = useState("dashboard");
    const components = {
        dashboard: Dashboard,
        listArticles: ListArticles,
    };

    const Component = components[component];

    const handleClickSetComponent = (component) => {
        setComponent(component);
    };

    return (
        <div className="container-fluid h-100">
            <div className="row h-100">
                <div className="col-2 bg-dark">
                    <AdminSidebar handleComponent={handleClickSetComponent} />
                </div>
                <div className="col-10 pl-0">
                    <AdminNavbar />
                    <Component />
                </div>
            </div>
        </div>
    );
};

AdminPanel.propTypes = {};

export default AdminPanel;
