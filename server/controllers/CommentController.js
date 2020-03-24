const Post = require("../models/Post");
const Comment = require("../models/Comment");
const validateCommentsInput = require("../validations/CommentsValidator");
const isEmpty = require("../utils/isEmpty");

/**
 * url(/api/articles/:articleId/posts/:postId/comment)
 * @METHOD POST
 * params(articleId, postId)
 */
exports.addComment = async (req, res) => {
    const isValid = validateCommentsInput(req.body);

    if (!isEmpty) {
        return res.status(400).json({
            success: false,
            errors: isValid
        });
    }

    try {
        let comment = new Comment({
            content: req.body.content,
            user: req.user._id,
            post: req.params.postId
        });

        await comment.save();

        res.status(201).json({
            success: true,
            message: "Comment was been added"
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "An error occurred while getting posts"
        });
    }
};
