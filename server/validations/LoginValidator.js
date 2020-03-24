const validator = require("validator");

const errors = {};

module.exports = data => {
    // Email validation
    if (validator.isEmpty(data.email)) {
        errors.email = "Please write your E-mail address!";
    }

    if (!validator.isEmail(data.email)) {
        errors.email = "E-mail is incorrect!";
    }

    // Password validation
    if (validator.isEmpty(data.password)) {
        errors.password = "Please write your Password!";
    }

    if (!validator.isLength(data.password, { min: 6, max: 255 })) {
        errors.password = "Password length must be between 6 and 255!";
    }

    return errors;
};
