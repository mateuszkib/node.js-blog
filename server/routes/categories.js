const express = require("express");
const router = express.Router();
const passport = require("passport");
const { createCategory } = require("../controllers/CategoryController");
const { roleMiddleware } = require("../middlewares/roleMiddleware");

router
    .route("/")
    .post(
        passport.authenticate("jwt", { session: false }),
        roleMiddleware,
        createCategory
    );

module.exports = router;
