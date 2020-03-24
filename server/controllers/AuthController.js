const validateRegisterData = require("../validations/RegisterValidator");
const validateLoginData = require("../validations/LoginValidator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const isEmpty = require("../utils/isEmpty");
const sendMail = require("../mailer/sendMail");
const registerAccountMail = require("../mailer/messages/registerMessage");
const crypto = require("crypto");

/**
 * Register user
 * @url('/api/auth/register')
 * @method POST
 */
exports.register = async (req, res) => {
    const { email, name, password } = req.body;
    const validation = validateRegisterData(req.body);
    const saltRound = 10;

    if (!isEmpty(validation)) {
        return res.status(400).json({
            success: false,
            errors: validation
        });
    }

    const salt = await bcrypt.genSalt(saltRound);
    const hashPassword = await bcrypt.hash(password, salt);

    try {
        const user = new User({
            email,
            name,
            password: hashPassword
        });

        let hashToken = user.generateHashToken();

        await user.save();

        // Send activated account link
        let activatedLink = `${process.env.SITE_URL}/api/auth/activate-account/${hashToken}`;
        let content = registerAccountMail.body
            .replace(/<ACTIVATE_URL>/g, activatedLink)
            .replace(/<SITENAME>/g, process.env.SITE_NAME);
        let subject = registerAccountMail.subject.replace(
            /<SITENAME>/g,
            process.env.SITE_NAME
        );
        await sendMail(user.email, subject, content);

        res.status(201).json({
            success: true,
            message: "Your registration was successful!"
        });
    } catch (err) {
        if (err.name === "MongoError" && err.code === 11000) {
            const keyValue = Object.keys(err.keyValue)[0];
            const message =
                keyValue === "email"
                    ? "This E-mail exist."
                    : "This name exist! Please choose another";
            res.status(400).json({
                success: false,
                errors: { [keyValue]: message }
            });
        } else {
            console.log(err);
            res.status(400).json({
                success: false,
                errors: err.message
            });
        }
    }
};

/**
 * Login user
 * @url('/api/auth/login')
 * @method POST
 */
exports.login = async (req, res) => {
    const { email, password } = req.body;
    const validation = validateLoginData(req.body);

    if (!isEmpty(validation)) {
        return res.status(400).json({
            success: false,
            errors: validation
        });
    }

    try {
        const user = await User.findOne({ email: email });

        if (!user) {
            validation.email = "User with this E-mail doesn't exist!";
            return res.status(400).json({
                success: false,
                errors: validation
            });
        }

        if (user.activatedAt === undefined) {
            validation.activated = "Your account isn't active";
            return res.json({
                success: false,
                message: validation
            });
        }

        const checkPassword = await bcrypt.compare(password, user.password);

        if (!checkPassword) {
            validation.password = "Password is incorrect!";
            return res.status(400).json({
                success: false,
                errors: validation
            });
        }

        const token = await jwt.sign(
            { id: user._id },
            process.env.SECRET_KEY_TOKEN,
            {
                expiresIn: "5h"
            }
        );

        if (token) {
            res.status(200).json({
                success: true,
                token: `Bearer ${token}`
            });
        }
    } catch (errors) {
        console.log(errors);
        res.status(400).json({
            success: false,
            errors
        });
    }
};

/**
 * Activate user account after click link in E-mail
 * @url('/api/auth/activate-account/:hash')
 * @method PUT
 */
exports.activateAccount = async (req, res) => {
    try {
        let hashToken = crypto
            .createHash("sha256")
            .update(req.params.hash)
            .digest("hex");
        if (req.params.hash) {
            let user = await User.findOne({
                activatedHashToken: hashToken,
                activatedHashTokenExpired: { $gt: Date.now() }
            });

            if (!user) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid token"
                });
            }

            user.activatedAt = Date.now();
            user.activatedHashToken = undefined;
            user.activatedHashTokenExpired = undefined;

            await user.save();

            res.status(201).json({
                success: true,
                message: "Your account is active!"
            });
        }
    } catch (err) {
        console.log(err);
    }
};
