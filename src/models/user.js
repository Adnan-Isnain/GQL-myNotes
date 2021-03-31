const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema(
    {   
        name : {
            type: String,
            required: true
        },
        username: {
            type: String,
            required: true,
            index: {unique: true}
        },
        email: {
            type: String,
            required: true,
            index: {unique: true}
        },
        password: {
            type: String,
            required: true
        },
        isActive : {
            type: Boolean,
            default: true,
        },
        followingBy:[
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            }
        ],
        followedBy:[
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            }
        ]
    },
    {
        timestamps: true
    }
);

const User = mongoose.model("User", UserSchema);
module.exports = User;