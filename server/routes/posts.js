const express = require("express");
const router = express.Router({ mergeParams: true });
const passport = require("passport");
const {
    getPost,
    getPosts,
    createPost,
    updatePost,
    deletePost
} = require("../controllers/PostsController");
const { roleMiddleware } = require("../middlewares/roleMiddleware");

router
    .route("/")
    .get(passport.authenticate("jwt", { session: false }), getPosts)
    .post(passport.authenticate("jwt", { session: false }), createPost);

router
    .route("/:id")
    .get(passport.authenticate("jwt", { session: false }), getPost)
    .post(passport.authenticate("jwt", { session: false }), updatePost)
    .delete(passport.authenticate("jwt", { session: false }), deletePost);

module.exports = router;
