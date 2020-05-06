import React, { useContext, useState, useEffect } from "react";
import AdminContext from "../../../context/admin/adminContext";
import Input from "../../Input/Input";
import { Card, Button, ListGroup, ListGroupItem } from "react-bootstrap";

const AddUser = () => {
    const adminContext = useContext(AdminContext);
    const { addUser, errors, user } = adminContext;
    const [file, setFile] = useState(null);
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        passwordConfirm: "",
        role: "user",
    });
    const type = !window.location.href.includes("add") ? "edit" : "add";
    const titleForm = type === "add" ? "Add User" : "Edit User";
    const titleButton = type === "add" ? "Add" : "Update";

    useEffect(() => {
        if (user) {
            setForm({
                ...form,
                name: user.name,
                email: user.email,
                role: user.role,
            });
        } else {
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

    const handleChangeInput = (e) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
        } else {
            setForm({ ...form, [e.target.name]: e.target.value });
        }
    };
    const submitForm = (e) => {
        e.preventDefault();
        addUser(form, file);
    };

    return (
        <div className="container">
            <div className="row mt-5">
                <div className="col-6">
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
                    <div class="col-6">
                        <Card style={{ width: "18rem" }}>
                            <Card.Img
                                variant="top"
                                src={`/uploads/users/${user._id}/${user.photo}`}
                            />
                            <Card.Body>
                                <Card.Title>User Info</Card.Title>
                            </Card.Body>
                            <ListGroup className="list-group-flush">
                                <ListGroupItem>Cras justo odio</ListGroupItem>
                                <ListGroupItem>
                                    Dapibus ac facilisis in
                                </ListGroupItem>
                                <ListGroupItem>
                                    Vestibulum at eros
                                </ListGroupItem>
                            </ListGroup>
                            <Card.Footer className="text-muted">
                                {user.role}
                            </Card.Footer>
                        </Card>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AddUser;
