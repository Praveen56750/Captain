const mongoose = require('mongoose');
const User = require('../models/user');
const dotenv = require('dotenv');
dotenv.config()

// Connect to your MongoDB database
const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.MONGODB_PASSWORD);

mongoose.connect(DB)
    .then(() => console.log("DB connected successfully"))
    .catch(err => console.error(err));


// Perform the migration logic
async function runMigration() {
    try {
        // Update all documents in the collection
        const updateResult = await User.updateMany({}, { $set: { /* add condition */ } }, { maxTimeMS: 30000 });
        console.log('Migration completed successfully');
    } catch (error) {
        console.error('Error during migration:', error);
    } finally {
        // Close the MongoDB connection
        mongoose.connection.close();
    }
}

runMigration();