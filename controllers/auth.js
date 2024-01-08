const User = require('../models/user');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if email and password exist
        if (!email || !password) {
            // return next(new AppError('Please provide email and password!', 400));
            res.status(401).json({ message: "Please provide email and password!" });
        }

        const user = await User.findOne({ email });

        if (!user || !(await user.verifyPassword(password, user.password))) {
            res.status(401).json({ message: "Invalid credentials" });
        }

        const payload = { id: user.id, role: user.role, privilege: user.privilege };

        const token = jwt.sign(payload, process.env.SECRET_KEY_JWT_PASSPORT, { expiresIn: '1h' });

        res.status(200).send({
            status: "success",
            message: "Your account is Authenticated",
            token
        })
    } catch (err) {
        console.log(err);
        res.status(400).json({
            status: "failure",
            message: err.message
        })
    }

}

exports.logout = async (req, res) => {

    res.status(200).send({
        status: "success",
        message: "Your account is unAuthenticated"
    })

}

exports.signup = async (req, res) => {
    try {
        const newUser = await User.create(req.body)

        res.status(200).json({
            status: "success",
            message: "User created successfully"
        })
    } catch (err) {
        console.log(err)
        res.status(400).json({
            status: "failure",
            message: err.message
        })
    }

}

