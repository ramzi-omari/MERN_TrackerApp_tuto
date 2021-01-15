# MERN Tracker App Tutorial

## MongoDB Atlas:

- Create a Cluster
- Network access : Add current IP & DB User
- then Connect to cluster

## Install App

- npx create-react-app mern-tracker-app

## BACKEND

### BACKEND Install

- create a new folder backend

  - create package.json: npm init -y

  - Install dependences: npm i express cors mongoose dotenv
  - sudo npm i -g nodemon
  - create server.js and paste this configuration:

```js
const express = require("express");
const cors = require("cors");

require("dotenv").config();
// to have environment variable in dotenv file

const app = express();
const port = process.env.PORT || 5000;
// to create our express server and configure the port

app.use(cors()); // cors middleware
app.use(express.json()); // to allow us to parse json (sent from the server)

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
}); // start listening on the server Port
```

- nodemon server // in terminal to start the server
- connect toward our database a MongoDB Atlas by adding

```js
const mongoose = require("mongoose");
```

- before add.listen we add :

```js
const uri = process.env.ATLAS_URI; // uri where our db is stored (we get it from atlas dashboard)

mongoose.connect(uri, { userNewUrlParser: true, useCreateIndex: true });
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});
```

- create **.env** and write inside URI from:
  > MongoDB atlas Cluster >> Connect your application >> connection string AND change Password:  
  >  `ATLAS_URI = mongodb+srv://ramzi-omari:<password>@cluster0.bdqgw.mongodb.net/<dbname>?retryWrites=true&w=majority`

**now the application is connected to MongoDB**

### create DB Schema
