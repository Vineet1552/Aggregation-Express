// model.js

const mongoose = require('mongoose');

const collegeSchema = new mongoose.Schema({

    Cname: {
        type: String,
        required: true
    }
});

const Data1 = mongoose.model('Data1', collegeSchema);

module.exports = {
    Data1,
}