const express = require("express");
const router = express.Router({ mergeParams: true });
const passport = require("passport");
const { addComment } = require("../controllers/CommentController");

router
    .route("/")
    .post(passport.authenticate("jwt", { session: false }), addComment);

module.exports = router;
