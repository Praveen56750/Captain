const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');

dotenv.config()

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.MONGODB_PASSWORD);

const connection = mongoose.connect(DB)
    .then(() => console.log("DB connected successfully"))
    .catch(err => console.error(err));

const PORT = process.env.PORT || 5555

app.listen(PORT, () => {
    console.log(`App is running on port - ${PORT}. Worker PID - ${process.pid}`)
})

process.on("unhandledRejection", err => {
    console.log('UNHANDLED REJECTION! 💥 Shutting down...');
    console.log(err.name, err.message);
    server.close(() => {
        process.exit(1);
    });
})

process.on("uncaughtException", (err, origin) => {
    console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
    console.log(err.name, err.message);
    process.exit(1);
})

module.exports = connection