const userModel = require("../models/user.model");

const findByEmail = async (email) => {
  return await userModel.findOne({ email: email }).select("+password");
};

const create = async (email, password) => {
  const user = await this.findByEmail(email);

  if (user) return { error: "User already exists" };

  const newUser = await this.userModel.create({
    email: email,
    password: password,
  });

  return newUser;
};

module.exports = { findByEmail, create };
