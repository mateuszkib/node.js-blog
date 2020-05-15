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
        height: "100px",
        width: "100%",
        background: "#343a40",
    };

    const typeMessage = message.success ? "text-success" : "text-danger";

    return (
        <>
            {message.message && (
                <Toast style={stylesToast}>
                    <Toast.Header className="bg-dark">
                        <strong className={"mr-auto " + typeMessage}>
                            Message
                        </strong>
                        <small className="ml-auto text-white">
                            {moment().fromNow()}
                        </small>
                    </Toast.Header>
                    <Toast.Body className={typeMessage + " font-weight-bold"}>
                        {message.message}
                    </Toast.Body>
                </Toast>
            )}
        </>
    );
};

export default Notification;
