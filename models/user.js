const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide the user name']
    },
    email: {
        type: String,
        required: [true, 'Please provide your email address'],
        unique: true,
        validate: [validator.isEmail, 'Please provied a valid email']
    },
    role: {
        type: String,
        default: 'user'
    },
    privilege: {
        type: [{ type: String }],
        default: ['read']
    },
    password: {
        type: String,
        required: [true, 'Please provied a password'],
        minlength: 8,
    },
    passwordConfirm: {
        type: String,
        required: [true, 'Please confirm a password'],
        validate: {
            validator: function (value) {
                return value === this.password;
            }
        },
        message: "Password are not the same!"
    },
    organizationId: {
        type: mongoose.Schema.ObjectId,
        ref: 'Organization'
    }

});

userSchema.pre('save', async function (next) {
    // this function only run if password was actually modified
    if (!this.isModified('password')) return next();

    // Hash the password with cost of 12
    this.password = await bcrypt.hash(this.password, 12)

    // Delete the confirm password field
    this.passwordConfirm = undefined;

    next();
})

userSchema.methods.verifyPassword = async function (candidatePassword, userPassword) {
    return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model('User', userSchema);

module.exports = User;