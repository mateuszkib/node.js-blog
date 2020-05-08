import React, { useContext, useEffect } from "react";
import AdminContext from "../../../context/admin/adminContext";
import TableRow from "./TableRow";

const ListUsers = () => {
    const adminContext = useContext(AdminContext);
    const { getUsers, users } = adminContext;
    useEffect(() => {
        getUsers();
        // eslint-disable-next-line
    }, []);

    return (
        <div className="table-responsive-lg">
            <table className="table table-hover table-striped table-dark mb-0">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Role</th>
                        <th scope="col">Avatar</th>
                        <th scope="col">Created At</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users &&
                        users.map((user, index) => (
                            <TableRow key={index} index={index} user={user} />
                        ))}
                </tbody>
            </table>
        </div>
    );
};

export default ListUsers;
