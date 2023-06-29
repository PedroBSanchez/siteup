const userModel = require("../models/user.model");

const findByEmail = async (email) => {
  return await userModel.findOne({ email: email }).select("+password");
};

const create = async (email, password) => {
  const user = await findByEmail(email);

  if (user) return { error: "User already exists" };

  const newUser = await userModel.create({
    email: email,
    password: password,
    urls: [],
  });

  return newUser;
};

const findUser = async (userId) => {
  const user = await userModel.findOne({ _id: userId.id });
  return user;
};

const addUrl = async (userId, url) => {
  const user = await findUser(userId);
  let urls = user.urls;

  if (urls.includes(url)) {
    return { error: "URL already added" };
  }

  urls = [...urls, url];

  return await userModel.updateOne(
    { _id: userId.id },
    { $set: { urls: urls } }
  );
};

const removeUrl = async (userId, url) => {
  const user = await findUser(userId);
  let urls = user.urls;

  if (urls.includes(url)) {
    const index = urls.indexOf(url);
    urls.splice(index, 1);

    const removeUrl = await userModel.updateOne(
      { _id: userId.id },
      { $set: { urls: urls } }
    );
    return removeUrl;
  }

  return { error: "URL not found" };
};

const findUrls = async (userId) => {
  const user = await userModel.findOne({ _id: userId.id });
  return user.urls;
};

module.exports = { findByEmail, create, findUser, addUrl, removeUrl, findUrls };
