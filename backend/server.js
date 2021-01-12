const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
// mongoose to help us to connect to our MongoDB

require("dotenv").config();
//  to have environment variable in dotenv file

const app = express();
const port = process.env.PORT || 5000;
// to create our express server and configure the port

app.use(cors()); // cors middleware
app.use(express.json()); // to allow us to parse json (sent from the server)

const uri = process.env.ATLAS_URI; // uri where our db is stored (we get it from atlas dashboard)
mongoose.connect(uri, { userNewUrlParser: true, useCreateIndex: true });
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
}); // start listening on the server Port
