const express = require('express')
const mongoose = require('mongoose');
const router = require('./Routes/routes')
const app = express();
const port = 3000;

app.use(express.json());

app.use(router);

app.listen(port, () => {
    mongoose.connect('mongodb://0.0.0.0:27017/advanceNode');
  console.log(`Example app listening on port ${port}`)
})