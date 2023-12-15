const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require('mongoose');
require('dotenv').config();

app.use(cors());
app.use(express.json());

const port = process.env.PORT || 4000;
const userRoutes = require('./routes/userRoutes.js');
const mediaRoutes = require('./routes/mediaRoutes.js');
app.use('/', userRoutes, mediaRoutes);

const atlasConnectionUri = process.env.ATLAS_CONNECTION_STRING || 'mongodb://localhost:27017/my-portfolio';
console.log(atlasConnectionUri)
const initializeDBAndServer = async () => {
  try {
    await mongoose.connect(atlasConnectionUri, {
      useNewUrlParser: true, // no longer required
      useUnifiedTopology: true, // no longer required
    });

    app.listen(port, () => {
      console.log(`Server Running at http://localhost:${port}/`);
      console.log(`Connected to MongoDB at: ${atlasConnectionUri}`);
    });
  } catch (e) {
    console.log(`DB Error: ${e.message}`);
    process.exit(1);
  }
};

initializeDBAndServer();
