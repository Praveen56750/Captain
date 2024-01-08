const url = require('url')
const User = require('../models/user')

exports.alerts = (req, res, next) => {
    const { alert } = req.query;
    if (alert === 'booking') {
        console.log("Booking")
        res.locals.alert =
            "Your booking was successful! Please check your email for a confirmation. If your booking doesn't show up here immediatly, please come back later.";
    }
    next();
};


exports.usersList = async (req, res) => {
    const users = await User.find()

    res.status(200).json({
        status: 'success',
        data: users
    });
}

exports.singleUser = async (req, res) => {
    const { id } = req.params

    const users = await User.findOne({ _id: id })

    res.status(200).json({
        status: 'success',
        data: users
    });
}
