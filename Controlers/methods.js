// Controllers/methods.js

const express = require('express');
// const {Data1, Data2, Data3} = require('../Model/collegemodel');
const {Data1} = require('../Model/collegemodel');
const {Data2} = require('../Model/studentmodel');
const {Data3} = require('../Model/marksmodel');
const mongoose = require('mongoose');

// post for college
const postCollege = async(req, res) => {
    try {
        const {Cname} = req.body;
        const exist = await Data1.findOne({Cname});
        if(exist) {
            return res.send('alredy school present');
        }
        const newSchool = {
            Cname
        };
        
        await Data1.create(newSchool);
        return res.send("school created");

    } catch (error) {
        console.error("this is an error", error);
    }
}


// get student data
const getAll = async (req, res) => {
    try {
        const data = await Data2.find({});
        return res.send(data);
    } catch (error) {
        console.error('not getting data', error);
        return res.status(500).send("Internal Server Error");
    }
}

// post student Data
const postData = async(req, res) => {
    try {
        const collegeId = req.params._id;
        const {
            firstName, lastName, studentMail, studentPhone
        } = req.body;

        const existStudent = await Data2.findOne({ studentMail });
        if(existStudent) {
            return res.send("student is already present");
        }

        const newstudent = {
            firstName, lastName, studentMail, studentPhone, collegeName:collegeId,
        };

        await Data2.create(newstudent);
        return res.send("student data created successfully");
    } catch (error) {
        console.error('this is an error', error);
    }
}

// postMarks
const postMarks = async(req, res) => {
    try {
            subject = req.body.subject;
            marks = req.body.marks;
            studentId = req.params._id;

            const data = {
                subject, 
                marks,
                studentId
            }
            await Data3.create(data);
            return res.send('marks created');

    } catch (error) {
        console.error('this is an error', error);
    }
}


// population
const getdatapopulate = async (req, res) => {
    try {
        const studentId = req.params.studentId; // object ki unique id
        const student = await Data3.findOne({ _id: studentId }, {_id:0}).populate({
            path: 'studentId',
            populate: {
                path: 'collegeName'
            }
        }); // _id jo humare pass unique padi hai, studentId jo hum req.body se de rahe hai 
        return res.send(student);
    } catch (error) {
        console.error("This is an error", error);
        return res.status(500).send("Internal Server Error");
    }
};


const getAllMatch = async (req, res) => {    
    try {
        const studentId = req.params.studentId;
        // console.log(studentId);
        const result = await Data3.aggregate([
            {
                $match: { studentId: mongoose.Types.ObjectId(studentId) }
            },
            {
                $lookup: {
                    from: 'Data2', 
                    localField: 'studentId',
                    foreignField: '_id', 
                    as: 'studentData'
                }
            },
            {
                $skip: 1
            },
            {
                $limit: 4
            },
            {
                $sort: { marks: -1} 
            },
             {
                $project: {
                    _id:0,
                    studentData:0,

                }
             }
        ]);
        return res.send(result);
    } catch (error) {
        console.error("This is an error", error);
        return res.status(500).send("Internal Server Error");
    }
};



module.exports = {
    postData,
    getAll,
    postMarks,
    getdatapopulate,
    postCollege,
    getAllMatch,
}