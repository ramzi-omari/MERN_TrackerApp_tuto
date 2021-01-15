const router = require("express").Router();
// we need express Router
let Exercise = require("../models/exercise.model");
// we require the mongoose's model

router.route("/").get((req, res) => {
  //if it's route/exercises/  we find our exercises and return them as JSON or Error
  Exercise.find()
    .then((exercises) => res.json(exercises))
    .catch((err) => res.status(400).json("Error: " + err));
  // find is a mongoose methode, with HTTP Get request here it'll get
  //a list of all the `users` from mongoDB Atlas Database & it'll return a promise
});
//this is the first route (the first EndPoint)

router.route("/add").post((req, res) => {
  // if it's a /add post request
  const username = req.body.username;
  const description = req.body.description;
  const duration = Number(req.body.duration);
  const date = Date.parse(req.body.date);

  // create new exercise with new variables and save then return Json exercise added or error
  const newExercise = new Exercise({
    username,
    description,
    duration,
    date,
  });

  newExercise
    .save()
    .then(() => res.json("Exercise added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

// id is the variable to take a single exercise by its id
router.route("/:id").get((req, res) => {
  Exercise.findById(req.params.id)
    .then((exercise) => res.json(exercise))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").delete((req, res) => {
  Exercise.findByIdAndDelete(req.params.id)
    .then(() => res.json("Exercise deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/update/:id").post((req, res) => {
  Exercise.findById(req.params.id)
    .then((exercise) => {
      exercise.username = req.body.username;
      exercise.description = req.body.description;
      exercise.duration = Number(req.body.duration);
      exercise.username = Date.parse(req.body.username);

      exercise
        .save()
        .then(() => res.json("Exercise updated! "))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

// we'are exporting the router
module.exports = router;
