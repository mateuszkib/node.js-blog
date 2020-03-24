exports.roleMiddleware = (req, res, next) => {
    if (req.user.role === "admin") {
        next();
    } else {
        res.status(403).json({
            success: false,
            message: "You don't have access to this page"
        });
    }
};
