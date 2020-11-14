// This file will handle connection logic to the MongoDB database
require("dotenv").config();

const mongoose = require("mongoose");
const db = process.env.MONGO_URI;

const ConnectDB = async () => {
    try {
      await mongoose.connect(db, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
      });
      console.log("Connected to MongoDB successfuly...");
    } catch (err) {
      console.error(err.message);
      process.exit(1);
    }
  };
  
  module.exports = ConnectDB;
