import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";

const UserAvatar = ({ user, size }) => {
    return (
        <>
            {user.photo === "no-photo.jpg" ? (
                <FontAwesomeIcon icon={faUserCircle} size={size} />
            ) : (
                <img
                    src={`/uploads/users/${user._id}/${user.photo}`}
                    width="50"
                    height="50"
                    className="rounded-circle"
                />
            )}
        </>
    );
};

export default UserAvatar;
