const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth");
const userRepository = require("../repositories/userRepository");
const Bcrypt = require("bcryptjs");
const generateToken = require("../middleware/generateToken");

router.get("/", async (req, res) => {
  try {
    res.status(200).send("ok");
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userRepository.findByEmail(email);

    if (!user) {
      return res.status(400).send({ error: "User not found" });
    }

    if (!(await Bcrypt.compare(password, user.password))) {
      return res.status(400).send({ error: "Invalid password" });
    }

    const login = { user, token: generateToken({ id: user.id }) };

    return res.status(200).json(login);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});

router.post("/signup", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (email && password) {
      const newUser = await userRepository.create(email, password);

      if (newUser.error)
        return res.status(400).send({ error: "Failed to create user" });

      return res
        .status(200)
        .send({ user: newUser, token: generateToken({ id: newUser.id }) });
    }

    return res.status(400).send({ error: "User not created" });
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});

module.exports = router;
