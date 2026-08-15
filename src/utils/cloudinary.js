import cloudinary from "cloudinary";
import fs from "fs";

cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_API_SECRET,
    });

const uploadClounary = async (filePath) => {
    try {
        if(!fs.existsSync(filePath)) return { error: "File does not exist" };
        const result = await cloudinary.v2.uploader.upload(filePath, {
            resource_type: "auto",
        })
        return result;
    }catch (error) {
        fs.unlinkSync(filePath); // Delete the file after upload attempt
        console.error("Error uploading to Cloudinary:", error);
        throw error;
    }
}