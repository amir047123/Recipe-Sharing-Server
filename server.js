const mongoose = require("mongoose"); 
const dotenv = require("dotenv").config(); 
const app = require("./app"); 
const http = require("http"); 

// Retrieving the port from environment variables
const port = process.env.PORT;

// Function to start the application
const start = async () => {
  try {
    // Connecting to the MongoDB database using Mongoose
    await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true, 
      useUnifiedTopology: true, 
    });

    // Starting the Express application to listen on the specified port
    app.listen(port, () => {
      console.log(`Server is running on ${port}`);
    });
  } catch (err) {
    console.log(err);
  }
};

start();
