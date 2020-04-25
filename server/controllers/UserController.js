const User = require("../models/User");
const path = require("path");
const fs = require("fs");
const crypto = require("crypto");

/**
 * @METHOD GET
 * Get all users data
 * @url('/api/users')
 */
exports.getUsers = async (req, res) => {
    try {
        let users = await User.find();
        res.status(200).json({
            success: true,
            data: users,
        });
    } catch (e) {
        res.status(500).json({
            success: false,
            message: "An error occurred trying to process your request",
        });
    }
};

/**
 * @METHOD GET
 * Get user data
 * @url('/api/users/:id')
 * @params('id')
 */
exports.getUser = async (req, res) => {
    try {
        let user = await User.findById(req.params.id);

        if (!user) {
            return res.status(400).json({
                success: false,
                message: `User with ID ${req.params.id} doesn\'t exist`,
            });
        }

        res.status(200).json({
            success: true,
            data: user,
        });
    } catch (e) {
        res.status(500).json({
            success: false,
            message: "An error occurred trying to process your request",
        });
    }
};

/**
 * @METHOD POST
 * Update user data
 * @url('/api/users/:id')
 * @params('id')
 */
exports.updateUser = async (req, res) => {
    try {
        let user = await User.findById(req.params.id);

        if (!user) {
            return res.status(400).json({
                success: false,
                message: `User with ID ${req.params.id} doesn\'t exist`,
            });
        }

        if (req.files) {
            let { photo } = req.files;
            let parseFile = path.parse(photo.name);
            let folder = `${process.env.PATH_TO_UPLOAD_USERS_IMAGE}/${req.params.id}`;
            let userId = req.params.id;
            let namePhoto = `${userId}${parseFile.ext}`;

            if (!fs.existsSync(!folder)) {
                fs.mkdirSync(folder, { recursive: true });
            }

            if (photo.size > process.env.MAX_UPLOAD_FILE_SIZE) {
                return res.status(400).json({
                    success: false,
                    message: `Please upload an image less than ${process.env.MAX_UPLOAD_FILE_SIZE} bytes`,
                });
            }

            photo.mv(`${folder}/${namePhoto}`, (err) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: "Problem with file upload",
                    });
                }
            });
            req.body.photo = namePhoto;
        }

        user = await User.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });

        res.status(201).json({
            success: true,
            data: user,
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: "An error occurred trying to process your request",
        });
    }
};

/**
 * @METHOD DELETE
 * Delete user
 * @url('/api/users/:id')
 * @params('id')
 */
exports.deleteUser = async (req, res) => {
    try {
        let user = await User.findById(req.params.id);

        if (!user) {
            return res.status(400).json({
                success: false,
                message: `User with ID ${req.params.id} doesn\'t exist`,
            });
        }

        await user.remove();

        res.status(201).json({
            success: true,
            data: {},
        });
    } catch (e) {
        res.status(500).json({
            success: false,
            message: "An error occurred trying to process your request",
        });
    }
};

/**
 * @METHOD GET
 * GET current logged user
 * @url('/api/user/current')
 */
exports.getCurrentUser = async (req, res) => {
    req.user.password = undefined;
    const { user } = req;
    res.status(200).json({
        success: true,
        user,
    });
};
