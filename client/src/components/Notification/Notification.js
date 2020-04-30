import React, { useContext } from "react";
import { Toast } from "react-bootstrap";
import AdminContext from "../../context/admin/adminContext";
import moment from "moment";

const Notification = () => {
    const adminContext = useContext(AdminContext);
    const { message } = adminContext;

    const stylesToast = {
        position: "absolute",
        bottom: "20px",
        right: "20px",
        opacity: 1,
        width: "300px",
    };

    const stylesToastBackground = {
        background: "#343a40",
    };

    const typeMessage = message.success ? "text-success" : "text-danger";

    return (
        <>
            {message.message && (
                <Toast style={stylesToast}>
                    <Toast.Header style={stylesToastBackground}>
                        <strong className={"mr-auto " + typeMessage}>
                            Message
                        </strong>
                        <small className="ml-auto text-white">
                            {moment().fromNow()}
                        </small>
                    </Toast.Header>
                    <Toast.Body className={typeMessage}>
                        {message.message}
                    </Toast.Body>
                </Toast>
            )}
        </>
    );
};

export default Notification;
