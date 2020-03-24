const AddPostInputValidation = require("../validations/PostsValidator");
const isEmpty = require("../utils/isEmpty");
const Post = require("../models/Post");

/**
 * Add post
 * @url('/api/articles/:articleId/posts')
 * @method POST
 */
exports.createPost = async (req, res) => {
    const validation = AddPostInputValidation(req.body);

    if (!isEmpty(validation)) {
        return res.status(400).json({
            success: false,
            errors: validation
        });
    }

    const newPost = new Post({
        content: req.body.content,
        user: req.user._id,
        article: req.params.articleId
    });

    try {
        await newPost.save();

        res.status(201).json({
            success: true,
            message: "Your post was been added"
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "An error occurred trying to process your request"
        });
    }
};

/**
 * Get all posts
 * @url('/api/articles/:articleId/posts')
 * @method GET
 */
exports.getPosts = async (req, res) => {
    try {
        const posts = await Post.find({
            article: req.params.articleId
        }).populate({
            path: "user comments",
            select: "-_id -password",
            populate: {
                path: "user_id",
                select: "-password -createdAt -activatedAt"
            }
        });
        res.status(200).json({
            success: true,
            posts
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "An error occurred while getting posts"
        });
    }
};

/**
 * Get single post
 * @url('/api/articles/posts/:id')
 * @params(id)
 * @method GET
 */
exports.getPost = async (req, res) => {
    try {
        if (req.params.id) {
            const post = await Post.findById(req.params.id).populate({
                path: "user",
                select: "-_id -password"
            });

            if (!post) {
                return res.status(400).json({
                    success: false,
                    message: "Post doesn't exist"
                });
            }

            res.status(200).json({
                success: true,
                post
            });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "An error occurred trying to process your request"
        });
    }
};

/**
 * Update post
 * @url('/api/articles/posts/:id')
 * @params(id)
 * @method POST
 */
exports.updatePost = async (req, res) => {
    const post = await Post.findById(req.params.id);

    if (!post) {
        return res.status(400).json({
            success: false,
            message: "Post doesn't exist"
        });
    }

    const timeToUpdate = 60;
    const diffTimeInMinutes = Math.floor(
        (new Date() - post.createdAt) / 1000 / 60
    );

    if (diffTimeInMinutes > timeToUpdate) {
        return res.status(400).json({
            success: false,
            message: "The post editing time has expired"
        });
    }

    try {
        await Post.findByIdAndUpdate(
            post._id,
            {
                content: req.body.content,
                updatedAt: new Date()
            },
            { new: true }
        );

        res.status(200).json({
            success: true,
            message: "Your post was been updated"
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            data: "An error occurred trying to process your request"
        });
    }
};

/**
 * Delete post
 * @url('/api/posts/:id')
 * @params(id)
 * @method DELETE
 */
exports.deletePost = async (req, res) => {
    try {
        const deletePost = await Post.findByIdAndDelete(req.params.id);
        if (!deletePost) {
            return res.status(400).json({
                success: false,
                message: "Post doesn't exist"
            });
        }
        res.status(200).json({
            success: true,
            message: "Post was been deleted"
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "An error occurred trying to process your request"
        });
    }
};
