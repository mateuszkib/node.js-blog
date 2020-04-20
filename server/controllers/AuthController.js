const validateRegisterData = require("../validations/RegisterValidator");
const validateLoginData = require("../validations/LoginValidator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const isEmpty = require("../utils/isEmpty");
const sendMail = require("../mailer/sendMail");
const registerAccountMail = require("../mailer/messages/registerMessage");
const crypto = require("crypto");
const { ErrorHandler } = require("../middlewares/errorHandler");

/**
 * Register user
 * @url('/api/auth/register')
 * @method POST
 */
exports.register = async (req, res, next) => {
    const { email, name, password } = req.body.data;
    const validation = validateRegisterData(req.body.data);
    const saltRound = 10;

    if (!isEmpty(validation)) {
        return res.status(400).json({
            success: false,
            errors: validation,
        });
    }

    const salt = await bcrypt.genSalt(saltRound);
    const hashPassword = await bcrypt.hash(password, salt);

    try {
        const user = new User({
            email,
            name,
            password: hashPassword,
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
            message:
                "Your registration was successful! Please go to e-mail box and confirm account.",
        });
    } catch (err) {
        next(new ErrorHandler(err, 500));
    }
};

/**
 * Login user
 * @url('/api/auth/login')
 * @method POST
 */
exports.login = async (req, res) => {
    const { email, password } = req.body.data;
    const validation = validateLoginData(req.body.data);

    if (!isEmpty(validation)) {
        return res.status(400).json({
            success: false,
            errors: validation,
        });
    }

    try {
        let user = await User.findOne({ email: email });

        if (!user) {
            validation.email = "User with this E-mail doesn't exist!";
            return res.status(400).json({
                success: false,
                errors: validation,
            });
        }

        if (user.activatedAt === undefined) {
            return res.status(400).json({
                success: false,
                message: "Your account isn't active",
            });
        }

        const checkPassword = await bcrypt.compare(password, user.password);

        if (!checkPassword) {
            validation.password = "Password is incorrect!";
            return res.status(400).json({
                success: false,
                errors: validation,
            });
        }

        const token = await jwt.sign(
            { id: user._id },
            process.env.SECRET_KEY_TOKEN,
            {
                expiresIn: "5h",
            }
        );

        user.password = undefined;

        if (token) {
            res.status(200).json({
                success: true,
                token: `Bearer ${token}`,
                user,
            });
        }
    } catch (err) {
        console.log(err);
        next(new ErrorHandler(err, 500));
    }
};

/**
 * Activate user account after click link in E-mail
 * @url('/api/auth/activate-account/:hash')
 * @method GET
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
                activatedHashTokenExpired: { $gt: Date.now() },
            });

            if (!user) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid token",
                });
            }

            user.activatedAt = Date.now();
            user.activatedHashToken = undefined;
            user.activatedHashTokenExpired = undefined;

            await user.save();

            res.status(201).json({
                success: true,
                message: "Your account is active!",
            });
        }
    } catch (err) {
        console.log(err);
        next(new ErrorHandler(err, 500));
    }
};
