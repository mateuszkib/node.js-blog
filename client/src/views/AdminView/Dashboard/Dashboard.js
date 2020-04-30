import React, { useState, useContext, useEffect } from "react";

import AdminSidebar from "../AdminSidebar/AdminSidebar";
import AdminNavbar from "../AdminNavbar/AdminNavbar";

import AuthContext from "../../../context/auth/authContext";
import AdminContext from "../../../context/admin/adminContext";

const AdminPanel = (props) => {
    const authContext = useContext(AuthContext);
    const { loadUser } = authContext;

    const adminContext = useContext(AdminContext);
    const { component } = adminContext;

    useEffect(() => {
        loadUser();
    }, []);

    return <></>;
};

AdminPanel.propTypes = {};

export default AdminPanel;
