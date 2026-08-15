import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },
    fullName: {
        type: String,
        required: true, 
    },
    avatar: {
        type: String,
        required: true,
    },
    coverImage: {
        type: String,
    },
    watchHistory: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Video",
    }],
    refreshToken: {
        type: String,
    }
},{ timestamps: true });

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return;
    this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
}

userSchema.methods.generateAccessToken = function() {
    jwt.sign(
        { 
            id: this._id, 
            username: this.username,
            email: this.email,
            fullName: this.fullName,
        },
        process.env.ACCESS_TOKEN_SECRET,
        { 
            expiresIn: process.env.Access_TOKEN_EXPIRES_IN
        },
    )
}
userSchema.methods.generateRefreshToken = function() {
    jwt.sign(
        { 
            id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        { 
            expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN
        },
    )
}

const User = new mongoose.model("User", userSchema);

export { User };