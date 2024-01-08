const express = require('express');
var bodyParser = require("body-parser")
const user = require('./routers/user');
const passport = require('passport');
const dotenv = require('dotenv');
const AppError = require('./utils/appError');
dotenv.config()

const app = express();
const rawBodySaver = (req, res, buf, encoding) => {
    if (buf && buf.length) {
        req.rawBody = buf.toString(encoding || "utf8")
    }
}

app.use(bodyParser.json({ verify: rawBodySaver, limit: "10mb" }))
app.use(bodyParser.raw({ verify: rawBodySaver, type: "*/*", limit: "10mb" }))
app.use("/api/v1", user)
require('./config/passport');
app.use(passport.initialize());
app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

module.exports = app 