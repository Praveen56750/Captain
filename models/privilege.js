const mongoose = require('mongoose');
const validator = require('validator');

const privilegeSchema = new mongoose.Schema({
    name: {
        type: String
    },
    privilege: {
        type: String
    }
});

const Privilege = mongoose.model('Privilege', privilegeSchema);

module.exports = Privilege;