const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (err) {
        console.error('MongoDB Connection Error:', err.message);
        if (err.cause) {
            console.error('Cause:', err.cause);
        }
        process.exit(1);
    }
};

module.exports = connectDB;
