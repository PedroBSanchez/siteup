const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth");
const userRepository = require("../repositories/userRepository");
const Bcrypt = require("bcryptjs");
const generateToken = require("../middleware/generateToken");
const userValidation = require("../validations/userValidation");

router.get("/", async (req, res) => {
  try {
    res.status(200).send("ok");
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (userValidation.loginValidation(email, password).error) {
      return res.status(400).send({ error: "Invalid login" });
    }

    const user = await userRepository.findByEmail(email);

    if (!user) {
      return res.status(400).send({ error: "User not found" });
    }

    if (!(await Bcrypt.compare(password, user.password))) {
      return res.status(400).send({ error: "Invalid password" });
    }

    const login = { user, token: generateToken({ id: user.id }) };

    user.password = null;

    return res.status(200).json(login);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});

router.post("/signup", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (userValidation.loginValidation(email, password).error) {
      return res.status(400).send({ error: "Invalid data" });
    }

    if (email && password) {
      const newUser = await userRepository.create(email, password);

      if (newUser.error) return res.status(400).send({ error: newUser.error });

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

router.post("/addurl", async (req, res) => {
  try {
    authMiddleware(req, res);
    if (req.userId) {
      const { url } = req.body;

      if (userValidation.addUrlValidation(url).error) {
        return res.status(400).send({ error: "Invalid URL" });
      }

      const newUrl = await userRepository.addUrl(req.userId, url);

      if (newUrl.error) {
        return res.status(400).send({ error: newUrl.error });
      }

      return res.status(200).send({ success: "URL added successfully" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});

router.delete("/removeurl", async (req, res) => {
  try {
    authMiddleware(req, res);
    if (req.userId) {
      const url = req.body.url;

      if (userValidation.addUrlValidation(url).error) {
        return res.status(400).send({ error: "Invalid URL" });
      }

      const removeUrl = await userRepository.removeUrl(req.userId, url);

      if (removeUrl.error) {
        return res.status(400).send({ error: removeUrl.error });
      }

      return res.status(200).send({ success: "URL successfully removed" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});

router.get("/listurls", async (req, res) => {
  try {
    authMiddleware(req, res);
    if (req.userId) {
      const urls = await userRepository.findUrls(req.userId);

      return res.status(200).send({ urls: urls });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});

module.exports = router;
