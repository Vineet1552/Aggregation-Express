// studentmodel.js

const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    firstName : {
        type:  String,
    },
    lastName: {
        type: String,
    },
    studentMail: {
        type : String,
    },
    studentPhone: {
        type : Number,
    },
    collegeName: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Data1'
    }
});

const Data2 = mongoose.model('Data2', studentSchema);


module.exports = {
    Data2
}