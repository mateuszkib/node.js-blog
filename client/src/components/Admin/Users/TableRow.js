import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserEdit, faUserTimes } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import UserAvatar from "./UserAvatar";
import styles from "./TableRow.module.scss";
import { NavLink } from "react-router-dom";
import AdminContext from "../../../context/admin/adminContext";

const TableRow = ({ user, index }) => {
    const adminContext = useContext(AdminContext);
    const { getUser } = adminContext;
    return (
        <tr className={styles.wrapper}>
            <td>{index + 1}</td>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.role}</td>
            <td>
                <UserAvatar user={user} size="3x" height="50px" width="50px" />
            </td>
            <td>{moment(user.createdAt).format("LLL")}</td>
            <td>
                <NavLink
                    to={`/admin/users/edit/${user._id}`}
                    onClick={() => getUser(user._id)}
                >
                    <FontAwesomeIcon
                        icon={faUserEdit}
                        style={{
                            marginRight: "10px",
                            color: "#b3d9ff",
                        }}
                    />
                </NavLink>

                <FontAwesomeIcon
                    icon={faUserTimes}
                    style={{ color: "#ff5c33" }}
                />
            </td>
        </tr>
    );
};

export default TableRow;
