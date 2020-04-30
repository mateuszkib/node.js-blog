import React, { useContext, useState } from "react";
import AdminContext from "../../../context/admin/adminContext";
import Input from "../../Input/Input";

const AddUser = () => {
    const adminContext = useContext(AdminContext);
    const { addUser, errors } = adminContext;
    const [file, setFile] = useState(null);
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        passwordConfirm: "",
        role: "user",
    });

    const handleChangeInput = (e) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
        } else {
            setUser({ ...user, [e.target.name]: e.target.value });
        }
    };

    const submitForm = (e) => {
        e.preventDefault();
        console.log(user);
        addUser(user, file);
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-6 offset-md-3 mt-5">
                    <h2>Add user</h2>
                    <form onSubmit={submitForm}>
                        <div className="form-group">
                            <Input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={user.email}
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
                                value={user.name}
                                className="form-control"
                                onChange={handleChangeInput}
                                error={errors.name}
                            />
                        </div>
                        <div className="form-group">
                            <Input
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={user.password}
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
                                value={user.passwordConfirm}
                                className="form-control"
                                onChange={handleChangeInput}
                                error={errors.passwordConfirm}
                            />
                        </div>
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
                                Add
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddUser;
