const express = require("express");
const router = express.Router();
const {
    getUsers,
    getUser,
    updateUser,
    deleteUser
} = require("../controllers/UserController");
const passport = require("passport");
const { roleMiddleware } = require("../middlewares/roleMiddleware");

router
    .route("/")
    .get(
        passport.authenticate("jwt", { session: false }),
        roleMiddleware,
        getUsers
    );
router
    .route("/:id")
    .get(passport.authenticate("jwt", { session: false }), getUser)
    .post(passport.authenticate("jwt", { session: false }), updateUser)
    .delete(passport.authenticate("jwt", { session: false }), deleteUser);

module.exports = router;
