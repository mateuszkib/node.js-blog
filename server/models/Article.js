const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ArticleSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            unique: true
        },
        content: {
            type: String,
            required: true
        },
        photo: {
            type: String,
            default: "no-photo.jpg"
        },
        author: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
        updatedAt: {
            type: Date
        }
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
);

ArticleSchema.virtual("posts", {
    ref: "Post",
    localField: "_id",
    foreignField: "article",
    justOne: false,
    count: true
});

module.exports = mongoose.model("Article", ArticleSchema);
