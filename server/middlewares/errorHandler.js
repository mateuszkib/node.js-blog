class ErrorHandler extends Error {
    constructor(message, statusCode) {
        super();
        this.message = message;
        this.statusCode = statusCode;
    }
}

const handleError = (err, req, res, next) => {
    console.log("dd");
    let errors = {};
    if (err.message.code === 11000) {
        const field = Object.keys(err.message.keyValue)[0];
        errors[field] = "Duplicate value. Please use another value";
    } else {
        errors.message = err.message;
    }

    res.status(err.statusCode).json({
        success: false,
        errors,
    });

    next();
};

module.exports = { ErrorHandler, handleError };
