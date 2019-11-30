const mongoose = require("mongoose");
const Joi = require("joi");
const express = require("express");
const router = express.Router();

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  }
});

const User = new mongoose.model("User", userSchema);

router.get("/", async (req, res) => {
  const users = await User.find().sort("name");
  res.send(users);
});

router.post("/", async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = new User({ name: req.body.name });
  user = await user.save();
  res.send(user);
});

router.put("/:id", async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    { new: true }
  );
  if (!user)
    return res.status(404).send("The user with the given ID was not found.");
  res.send(user);
});

router.delete("/:id", async (req, res) => {
  const user = await User.findByIdAndRemomve(req.params.id);

  if (!user)
    return res.status(404).send("The user with the given ID was not found.");
  res.send(user);
});

router.get("/:id", async (req, res) => {
  const user = await User.findByID(req.params.id);

  if (!user)
    return res.status(404).send("The user with the given ID was not found.");
  res.send(user);
});

function validateUser(user) {
  const schema = {
    name: Joi.string()
      .min(5)
      .required()
  };

  return Joi.validate(user, schema);
}

module.exports = router;
