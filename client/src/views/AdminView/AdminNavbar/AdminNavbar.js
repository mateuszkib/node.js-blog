import React, { useContext, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faBell } from "@fortawesome/free-solid-svg-icons";
import AuthContext from "../../../context/auth/authContext";
import UserAvatar from "../../../components/Admin/Users/UserAvatar";

const AdminNavbar = () => {
    const authContext = useContext(AuthContext);
    const { user, loadUser } = authContext;

    useEffect(() => {
        loadUser();
        // eslint-disable-next-line
    }, []);

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark pb-3">
            <NavLink className="navbar-brand" to="/">
                Home
            </NavLink>
            <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span className="navbar-toggler-icon"></span>
            </button>

            <div
                className="collapse navbar-collapse"
                id="navbarSupportedContent"
            >
                <form className="form-inline my-2 my-lg-0">
                    <input
                        className="form-control mr-sm-2"
                        type="search"
                        placeholder="Search"
                        aria-label="Search"
                    />
                    <button
                        className="btn btn-outline-success my-2 my-sm-0"
                        type="submit"
                    >
                        Search
                    </button>
                </form>
                <ul className="navbar-nav ml-auto d-flex align-items-center">
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/admin/notifications">
                            <FontAwesomeIcon icon={faBell} />
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/admin/messages">
                            <FontAwesomeIcon icon={faEnvelope} />
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <div className="text-center">
                            <NavLink className="nav-link" to="/admin/profile">
                                {user && <UserAvatar user={user} size="2x" />}
                            </NavLink>
                        </div>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default AdminNavbar;
