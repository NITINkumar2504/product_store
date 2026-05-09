import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGO_URI}/products`);
        // console.log(connectionInstance);
        console.log(`\nMongoDB connected !! DB HOST: ${connectionInstance.connection.host}`)
    } 
    catch (error) {
        console.log('MongoDB connection error:', error);
        process.exit(1);  // terminate process with 1 -> failure, 0 -> success
    }
}

export default connectDB