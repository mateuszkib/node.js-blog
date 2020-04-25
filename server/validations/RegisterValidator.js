const validator = require("validator");

module.exports = (data) => {
    let errors = {};
    // Email validation
    if (validator.isEmpty(data.email)) {
        errors.email = "Please write your E-mail address!";
    }

    if (!validator.isEmail(data.email)) {
        errors.email = "E-mail is incorrect!";
    }

    // Name validation
    if (validator.isEmpty(data.name)) {
        errors.name = "Please write your Name!";
    }

    if (!validator.isLength(data.name, { min: 3, max: 255 })) {
        errors.name = "Name length must be between 3 and 255!";
    }

    // Password validation
    if (validator.isEmpty(data.password)) {
        errors.password = "Please write your Password!";
    }

    if (!validator.isLength(data.password, { min: 6, max: 255 })) {
        errors.password = "Password length must be between 6 and 255!";
    }

    if (data.password !== data.passwordConfirm) {
        errors.passwordConfirm = "Password aren't the same";
    }

    return errors;
};
