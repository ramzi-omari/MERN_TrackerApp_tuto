const router = require("express").Router();
// we need express Router
let User = require("../models/user.model");
// we require the mongoose's model

router.route("/").get((req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Error: " + err));
  // find is a mongoose methode, with HTTP Get request here it'll get
  //a list of all the `users` from mongoDB Atlas Database & it'll return a promise
});
//this is the first route (the first EndPoint)

router.route("/add").post((req, res) => {
  // this's HTTP Post request
  const username = req.body.username;
  // we create a new instance of user
  const newUser = new User({ username });

  // we save the user into DB using save methode .then return User added or error message
  newUser
    .save()
    .then(() => res.json("User added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

// we'are exporting the router
module.exports = router;
