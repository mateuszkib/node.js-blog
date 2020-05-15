const Category = require("../models/Category");
const validateArticlesInput = require("../validations/ArticlesValidator");
const isEmpty = require("../utils/isEmpty");

/**
 * Create new Category
 * url('/api/categories')
 * @METHOD POST
 */
exports.createCategory = async (req, res) => {
    try {
        let article = new Category({
            name: req.body.name,
        });

        await article.save();

        res.status(201).json({
            success: true,
            message: "Category was been successfully added",
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "An error occurred while adding category",
        });
    }
};
