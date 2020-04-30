const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const slugify = require("slugify");

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    photo: {
        type: String,
        default: "no-photo.jpg",
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
    },
    slug: {
        type: String,
    },
    activatedAt: {
        type: Date,
    },
    activatedHashToken: String,
    activatedHashTokenExpired: Date,
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

UserSchema.methods.checkPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

UserSchema.statics.hashPassword = async function (password) {
    const saltRound = 10;
    const salt = await bcrypt.genSalt(saltRound);
    return await bcrypt.hash(password, salt);
};

UserSchema.methods.generateHashToken = function () {
    let hashToken = crypto.randomBytes(20).toString("hex");

    this.activatedHashToken = crypto
        .createHash("sha256")
        .update(hashToken)
        .digest("hex");
    this.activatedHashTokenExpired = new Date(Date.now() + 60 * 60 * 1000);

    return hashToken;
};

UserSchema.pre("save", function (next) {
    this.slug = slugify(this.name, {
        replacement: "-",
        lower: true,
    });
    next();
});

module.exports = mongoose.model("User", UserSchema);
