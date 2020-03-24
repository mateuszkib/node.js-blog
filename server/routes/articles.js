const express = require("express");
const router = express.Router();
const passport = require("passport");
const {
    createArticle,
    getArticles,
    getArticle,
    updateArticle
} = require("../controllers/ArticleController");
const { roleMiddleware } = require("../middlewares/roleMiddleware");

// Include other resource routers
const postsRouter = require("./posts");
const commentsRouter = require("./comments");

//Re-route into other resource routers
router.use("/:articleId/posts", postsRouter);
router.use("/:articleId/posts/:postId/comments", commentsRouter);

router
    .route("/")
    .post(
        passport.authenticate("jwt", { session: false }),
        roleMiddleware,
        createArticle
    )
    .get(passport.authenticate("jwt", { session: false }), getArticles);

router
    .route("/:id")
    .get(passport.authenticate("jwt", { session: false }), getArticle)
    .post(
        passport.authenticate("jwt", { session: false }),
        roleMiddleware,
        updateArticle
    );

module.exports = router;
