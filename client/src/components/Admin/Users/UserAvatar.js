import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";

const UserAvatar = ({ user, size, className, height, width }) => {
    return (
        <>
            {user.photo === "no-photo.jpg" ? (
                <FontAwesomeIcon icon={faUserCircle} size={size} />
            ) : (
                <img
                    src={`/uploads/users/${user._id}/${user.photo}`}
                    height={height}
                    width={width}
                    className={className}
                    alt="User avatar"
                />
            )}
        </>
    );
};

UserAvatar.propTypes = {
    user: PropTypes.object.isRequired,
    size: PropTypes.string,
    className: PropTypes.string,
    height: PropTypes.string,
    width: PropTypes.string,
};

UserAvatar.defaultProps = {
    size: "3x",
    className: "rounded-circle",
    height: "100%",
    width: "100%",
};

export default UserAvatar;
