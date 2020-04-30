import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserEdit, faUserTimes } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import UserAvatar from "./UserAvatar";
import styles from "./TableRow.module.scss";
import { NavLink } from "react-router-dom";

const TableRow = ({ user, index }) => {
    return (
        <tr className={styles.wrapper}>
            <td>{index + 1}</td>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.role}</td>
            <td>
                <UserAvatar user={user} size="3x" />
            </td>
            <td>{moment(user.createdAt).format("LLL")}</td>
            <td>
                <NavLink to={`/admin/users/${user._id}`}>
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
