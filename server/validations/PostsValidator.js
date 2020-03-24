const validator = require("validator");

const errors = {};

module.exports = data => {
    // Content validation
    if (validator.isEmpty(data.content)) {
        errors.content = "Field content couldn't be empty";
    }

    if (!validator.isLength(data.content, { min: 2, max: 2500 })) {
        errors.content = "Content length must be between 2 and 2500!";
    }

    return errors;
};
