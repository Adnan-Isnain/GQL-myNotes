const mongoose = require("mongoose");
const commentSchema = new mongoose.Schema(
    {
        noteId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Note"
        },
        authorId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        comment:{
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
                ref: "User",
            }
        ],
    },
    {   
        timestamps: true
    }
);
const Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;
