const url = require('url')
const User = require('../models/user')

exports.alerts = (req, res, next) => {
    const { alert } = req.query;
    if (alert === 'checking') {
        res.locals.alert = "working fine";
    }
    next();
};


exports.usersList = async (req, res) => {
    const users = await User.find().select('email')

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
