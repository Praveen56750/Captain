const url = require('url')
const User = require('../models/user')

exports.alerts = (req, res, next) => {
    const { alert } = req.query;

    if (alert === 'checking') {
        res.locals.alert = "working fine";
    }
    next();
};


exports.fetchUsers = async (req, res) => {
    try {
        const users = await User.find().select('email name role privilege')

        res.status(200).json({
            status: 'success',
            data: users
        });
    } catch (err) {
        res.status(500).json({
            status: "failure",
            message: err.message
        })
    }
}

exports.fetchUser = async (req, res) => {
    try {
        const { id } = req.params

        const user = await User.findOne({ _id: id }).select('email name role privilege')

        res.status(200).json({
            status: 'success',
            data: user
        });
    } catch (err) {
        res.status(500).json({
            status: "failure",
            message: err.message
        })
    }
}

exports.updateUser = async (req, res) => {
    try {
        const { name, email, role, organizationId } = req.body

        const { id } = req.params

        const user = await User.findOneAndUpdate({ _id: id }, { name, email, role, organizationId }, { new: true })

        res.status(200).json({
            status: 'success',
            data: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                organizationId: user.organizationId,
                privilege: user.privilege
            }
        });
    } catch (err) {
        res.status(500).json({
            status: "failure",
            message: err.message
        })
    }
}


exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params

        const user = await User.findOneAndDelete({ _id: id })

        res.status(200).json({
            status: 'success',
            data: "User deleted successfully"
        });
    } catch (err) {
        res.status(500).json({
            status: "failure",
            message: err.message
        })
    }
}
