// routes.js

const express = require('express');
const methods = require('../Controlers/methods');


const router = express.Router();


router.post('/postCollege', methods.postCollege);
router.get('/getAll', methods.getAll);
router.post('/postData/:_id', methods.postData);
router.post('/postMarks/:_id', methods.postMarks);
router.get('/getdatapopulate/:studentId', methods.getdatapopulate); 
router.get('/getAllMatch/:studentId', methods.getAllMatch);


module.exports = router;