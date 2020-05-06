const Article = require("../models/Article");
const validateArticlesInput = require("../validations/ArticlesValidator");
const isEmpty = require("../utils/isEmpty");
const path = require("path");
const fs = require("fs");

/**
 * Create new Article
 * url('/api/articles')
 * @METHOD POST
 */
exports.createArticle = async (req, res) => {
    const isValid = validateArticlesInput(req.body);

    if (!isEmpty(isValid)) {
        return res.status(400).json({
            success: false,
            errors: isValid,
        });
    }

    try {
        let article = new Article({
            title: req.body.title,
            content: req.body.content,
            author: req.user._id,
        });

        if (req.files) {
            const image = req.files.photo;
            const parseImage = path.parse(image.name);
            const photo = `${article._id}${parseImage.ext}`;

            if (!fs.existsSync(process.env.PATH_TO_UPLOAD_ARTICLES_IMAGE)) {
                fs.mkdirSync(process.env.PATH_TO_UPLOAD_ARTICLES_IMAGE, {
                    recursive: true,
                });
            }

            if (image.size > process.env.MAX_UPLOAD_FILE_SIZE) {
                return res.status(400).json({
                    success: false,
                    message: `Please upload an image less than ${process.env.MAX_UPLOAD_FILE_SIZE} bytes`,
                });
            }

            image.mv(
                `${process.env.PATH_TO_UPLOAD_ARTICLES_IMAGE}${photo}`,
                (err) => {
                    if (err) {
                        return res.status(500).json({
                            success: false,
                            message: "Problem with file upload",
                        });
                    }
                    article.photo = photo;
                }
            );
        }

        await article.save();

        res.status(201).json({
            success: true,
            message: "Article was been successfully added",
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "An error occurred while adding article",
        });
    }
};

/**
 * Get all Articles
 * url('/api/articles')
 * @METHOD GET
 */
exports.getArticles = async (req, res) => {
    let limit = 5;
    let page = parseInt(req.query.page) || 1;
    let startIndex = (page - 1) * limit;
    let total = await Article.countDocuments();
    let lastIndex = page * limit;
    let pagination = {};

    if (lastIndex < total) {
        pagination.next = {
            page: page + 1,
        };
    }

    if (startIndex > 0) {
        pagination.prev = {
            page: page - 1,
        };
    }
    const articles = await Article.find()
        .populate({
            path: "author posts",
            select: "name",
        })
        .skip(startIndex)
        .limit(limit);

    res.status(200).json({
        success: true,
        data: articles,
        pagination,
        count: articles.length,
    });
};

/**
 * Get single Article
 * url('/api/articles/:id')
 * @METHOD GET
 */
exports.getArticle = async (req, res) => {
    const article = await Article.findById(req.params.id)
        .populate({ path: "author", select: "name email" })
        .populate({
            path: "posts",
            populate: {
                path: "comments user",
                select: "name email content",
                populate: { path: "user", select: "name email" },
            },
        });

    if (!article) {
        return res.status(404).json({
            success: false,
            message: "Article doesn't exist",
        });
    }

    res.status(200).json({
        success: true,
        data: article,
    });
};

/**
 * Update Article
 * url('/api/articles/:id')
 * @METHOD POST
 */
exports.updateArticle = async (req, res) => {
    try {
        const { id } = req.params;
        const isValid = validateArticlesInput(req.body);
        const article = await Article.findById(id);

        if (!isEmpty(isValid)) {
            return res.status(400).json({
                success: false,
                errors: isValid,
            });
        }

        if (!article) {
            return res.status(404).json({
                success: false,
                message: "Article doesn't exist",
            });
        }

        if (req.files) {
            const image = req.files.photo;
            const parseImage = path.parse(image.name);
            const photo = `${article._id}${parseImage.ext}`;

            if (image.size > process.env.MAX_UPLOAD_FILE_SIZE) {
                return res.status(400).json({
                    success: false,
                    message: `Please upload an image less than ${process.env.MAX_UPLOAD_FILE_SIZE} bytes`,
                });
            }

            if (!fs.existsSync(process.env.PATH_TO_UPLOAD_ARTICLES_IMAGE)) {
                fs.mkdirSync(process.env.PATH_TO_UPLOAD_ARTICLES_IMAGE, {
                    recursive: true,
                });
            } else if (
                fs.existsSync(
                    `${process.env.PATH_TO_UPLOAD_ARTICLES_IMAGE}${photo}`
                )
            ) {
                fs.unlinkSync(
                    `${process.env.PATH_TO_UPLOAD_ARTICLES_IMAGE}${photo}`
                );
            }

            image.mv(
                `${process.env.PATH_TO_UPLOAD_ARTICLES_IMAGE}${photo}`,
                (err) => {
                    if (err) {
                        return res.status(500).json({
                            success: false,
                            message: "Problem with file upload",
                        });
                    }
                    article.photo = photo;
                }
            );
            req.body.photo = photo;
        }

        req.body.updatedAt = new Date();
        const updateArticle = await Article.findByIdAndUpdate(id, req.body, {
            new: true,
        });

        res.status(200).json({
            success: true,
            data: updateArticle,
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            error: err.message || "Server Error",
        });
    }
};
