import React, { useContext, useState, useEffect } from "react";
import AdminContext from "../../../context/admin/adminContext";
import Input from "../../Input/Input";
import { Card } from "react-bootstrap";
import UserAvatar from "./UserAvatar";

const FormUser = ({
    match: {
        params: { action, id },
    },
}) => {
    const adminContext = useContext(AdminContext);
    const { addUser, errors, user, getUser, updateUser } = adminContext;
    const [file, setFile] = useState(null);
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        passwordConfirm: "",
        role: "user",
    });
    const [type, setType] = useState(action);
    const titleForm = type === "add" ? "Add User" : "Edit User";
    const titleButton = type === "add" ? "Add" : "Update";

    useEffect(() => {
        if (user) {
            setType("edit");
            setForm({
                ...form,
                name: user.name,
                email: user.email,
                role: user.role,
            });
        } else {
            setType("add");
            setForm({
                name: "",
                email: "",
                password: "",
                passwordConfirm: "",
                role: "user",
            });
        }
        // eslint-disable-next-line
    }, [user]);

    useEffect(() => {
        if (id) {
            getUser(id);
        }
        // eslint-disable-next-line
    }, [id]);

    const handleChangeInput = (e) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
        } else {
            setForm({ ...form, [e.target.name]: e.target.value });
        }
    };
    const submitForm = (e) => {
        e.preventDefault();
        if (type === "add") {
            addUser(form, file);
        } else if (type === "edit" && id) {
            let { name, email, role } = form;
            let updateData = {
                name,
                email,
                role,
            };
            updateUser(updateData, id, file);
        }
    };

    return (
        <div className="container">
            <div className="row mt-5">
                <div className={type === "add" ? "col-6 offset-lg-3" : "col-6"}>
                    <h2>{titleForm}</h2>
                    <form onSubmit={submitForm}>
                        <div className="form-group">
                            <Input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={form.email}
                                className="form-control"
                                onChange={handleChangeInput}
                                error={errors.email}
                            />
                        </div>
                        <div className="form-group">
                            <Input
                                type="name"
                                name="name"
                                placeholder="Name"
                                value={form.name}
                                className="form-control"
                                onChange={handleChangeInput}
                                error={errors.name}
                            />
                        </div>
                        {type === "add" && (
                            <>
                                <div className="form-group">
                                    <Input
                                        type="password"
                                        name="password"
                                        placeholder="Password"
                                        value={form.password}
                                        className="form-control"
                                        onChange={handleChangeInput}
                                        error={errors.password}
                                    />
                                </div>
                                <div className="form-group">
                                    <Input
                                        type="password"
                                        name="passwordConfirm"
                                        placeholder="Password Confirm"
                                        value={form.passwordConfirm}
                                        className="form-control"
                                        onChange={handleChangeInput}
                                        error={errors.passwordConfirm}
                                    />
                                </div>
                            </>
                        )}
                        <div className="form-group">
                            <label htmlFor="exampleFormControlFile1">
                                Photo Upload
                            </label>
                            <Input
                                type="file"
                                name="photo"
                                className="form-control"
                                onChange={handleChangeInput}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleFormControlSelect1">
                                Role User
                            </label>
                            <select
                                className="form-control"
                                id="exampleFormControlSelect1"
                                name="role"
                                onChange={handleChangeInput}
                                value={form.role}
                            >
                                <option value="user">User</option>
                                <option value="admin">Admin</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <button
                                type="submit"
                                className="btn btn-dark mb-2 w-100"
                            >
                                {titleButton}
                            </button>
                        </div>
                    </form>
                </div>
                {user && (
                    <div className="col-6">
                        <Card
                            style={{ width: "20rem", margin: "0 auto" }}
                            bg="dark"
                            text="light"
                            border="dark"
                            className="text-center h-100"
                        >
                            <Card.Header>User Avatar</Card.Header>
                            <Card.Body>
                                <UserAvatar
                                    user={user}
                                    size="9x"
                                    className="card-img-top d-flex justify-content-center align-self-center"
                                />
                            </Card.Body>
                        </Card>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FormUser;
