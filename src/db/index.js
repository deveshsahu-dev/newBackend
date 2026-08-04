import mongoose from 'mongoose';

const connectDB = async () => {
    try{
        console.log(`${process.env.DB_URL}/${process.env.DB_NAME}`);
        const connection = await mongoose.connect(`${process.env.DB_URL}/${process.env.DB_NAME}`);
        console.log(`MongoDB Connected: ${connection.connection.host}`);
    }catch (error) {
        console.error(error.message);
        process.exit(1);
    }
}

export default connectDB;