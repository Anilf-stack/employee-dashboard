const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const connectDB = async () => {
    try {
        // Connect to MongoDB with only required options for Mongoose 
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,       // Use new MongoDB connection string parser
            useUnifiedTopology: true,    // Use new topology engine for server discovery and monitoring
        });
        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection failed:', error.message);
        process.exit(1);  
    };
};
module.exports = connectDB;
