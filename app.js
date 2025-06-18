require('dotenv').config()

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

const user = require('./routes/authRoutes')
const list = require('./routes/listRoutes')

app.use(cors());
app.use(express.json());

app.use('/',user);
app.use('/',list);

// mongoose.connect(process.env.MONGO_URI)
//     .then(() => {
//         app.listen(process.env.PORT,() => {
//             console.log("Listening everything",process.env.PORT)
//         });
//     })
//     .catch((error) => {
//         console.log(error);
//     })


mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('MongoDB connection error:', error));


module.exports = app;