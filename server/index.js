const express = require("express");
const app = express();
const cors = require("cors")
app.use(cors())
const port = process.env.PORT||4000
const userRoutes = require('./routes/userRoutes.js');
const mediaRoutes = require('./routes/mediaRoutes.js');
app.use(express.json())
app.use('/', userRoutes, mediaRoutes);
const { request } = require("http");
const { response } = require("express");
const { title } = require("process");
const console = require("console");
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/my-portfolio');


const initializeDBAndServer = async () => {
  try {
    app.listen(port, () => {
      console.log("Server Running at http://localhost:4000/");
    });
  } catch (e) {
    console.log(`DB Error: ${e.message}`);
    process.exit(1);
  }
};

initializeDBAndServer();


  










      
      
      
      
      