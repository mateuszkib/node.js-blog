const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
    name: {
        type: String,
        enum: ["News", "Technology", "Programming", "Hobby"],
        default: "News",
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
    },
});

module.exports = mongoose.model("Category", CategorySchema);
