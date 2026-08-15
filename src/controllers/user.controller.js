import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { uploadClounary } from "../utils/cloudinary.js";

const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password, fullName } = req.body;

    if([username, email, password, fullName].some(field => !field || field.trim() === "")) {
        throw new ApiError(400, "All fields are required");
    }
    
   const userExists = await User.findOne({ $or: [{ email }, { username }] });
    if (userExists) {
        throw new ApiError(400, "User already exists");
    }
    
    const avatar = req.files?.avatar?.[0]?.path;
    const coverImage = req.files?.coverImage?.[0]?.path;

    if(!avatar){
        throw new ApiError(400, "Avatar is required");
    }

    const avatarURL = await uploadClounary(avatar);
    const coverImageURL = coverImage ? await uploadClounary(coverImage) : null;

    if(!avatarURL || avatarURL.error) {
        throw new ApiError(500, "Failed to upload avatar");
    }
    
    const newUser = new User({
        username,
        email,
        fullName: req.body.fullName || "",
        password,
        avatar: avatarURL.url,
        coverImage: coverImageURL ? coverImageURL.url : null,
    });

    await newUser.save();
    res.status(201).json(
        new ApiResponse(201, "User registered successfully", 
            { ...newUser }
        ));

});

export { registerUser };