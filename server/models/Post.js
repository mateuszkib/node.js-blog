const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Comment = require("./Comment");

const PostSchema = new Schema(
    {
        content: {
            type: String,
            required: true
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        article: {
            type: Schema.Types.ObjectId,
            ref: "Article"
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
        updatedAt: {
            type: Date
        },
        deletedAt: {
            type: Date
        }
    },
    { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

PostSchema.virtual("comments", {
    ref: "Comment",
    localField: "_id",
    foreignField: "post",
    justOne: false
});

module.exports = mongoose.model("Post", PostSchema);
