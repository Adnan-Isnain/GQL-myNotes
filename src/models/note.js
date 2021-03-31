const mongoose = require("mongoose");

// Make note schema's
const noteSchema = new mongoose.Schema(
    {
        author: {
            type: String,
            required: true
        },
        topics: [
            {
                type: String,
                required: true
            }
        ],
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        content: {
            type: String,
            required: true
        },
        favoritedCount: {
            type: Number,
            default: 0
        },
        favoritedBy:[
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            }
        ],
        unFavoritedCount: {
            type: Number,
            default: 0
        },
        unFavoritedBy:[
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            }
        ],
        isLatex: {
            type: Boolean,
            default: true,
            required: true
        },
        isHide: {
            type: Boolean,
            default: true,
            required: true
        },
        grade: {
            type: String,
            default: "umum"
        },
        comments: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Comment"
            }
        ],
        commentCount: {
            type: Number,
            default: 0
        }
    },
    {   
        // Assign createdAt and UpdateAt --> Date type
        timestamps: true
    }
);
const Note = mongoose.model("Note", noteSchema);
module.exports = Note;
