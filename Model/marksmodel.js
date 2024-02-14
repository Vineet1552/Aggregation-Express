// marksmodel.js

const mongoose = require('mongoose');


const marksSchema = new mongoose.Schema({
    subject: {
        type : String,
    },
    marks: {
        type :Number,
    },
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Data2'
    }
});


const Data3 = mongoose.model('Data3', marksSchema);


module.exports = {
    Data3
}