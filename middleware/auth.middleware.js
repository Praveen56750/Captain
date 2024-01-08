const express = require('express');
const User = require('../models/user');
const Privilege = require('../models/privilege');

const isAdminAuthenticate = async (req, res, next) => {
    const { id, role } = req.user

    const privilegeDetail = await Privilege.findOne({ name: req.method })

    const privilege = privilegeDetail?._doc?.privilege

    const userDetail = await User.findById({ _id: id, privilege: { $contains: privilege } }).exec();

    if (role === 'admin' && userDetail?._doc?.privilege)
        next();
    else
        return res.status(401).json({ status: "failure", message: "Access denined you didn't have permission to access this end point" })
}

const isAuthenticate = async (req, res, next) => {
    const { id, role } = req.user

    const { id: userId } = req.params

    const privilegeDetail = await Privilege.findOne({ name: req.method })

    const privilege = privilegeDetail?._doc?.privilege

    const userDetail = await User.findById({ _id: id, privilege: { $contains: privilege } }).exec();

    if ((role === 'admin' || role === 'user') && userDetail?._doc?.privilege) {
        if (role === 'user' && id !== userId) {
            return res.status(401).json({ status: "failure", message: "Access denined you didn't have permission to access this end point" })
        }
        next();
    }
    else
        return res.status(401).json({ status: "failure", message: "Access denined you didn't have permission to access this end point" })
}


module.exports = { isAdminAuthenticate, isAuthenticate }