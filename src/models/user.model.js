const mongoose = require("mongoose");
const Bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    password: { type: String, required: true, select: false },
    urls: { type: Array, required: true },
    created_at: { type: Date, default: Date.now },
  },
  {
    collection: "Users",
  }
);

UserSchema.pre("save", async function (next) {
  const hash = await Bcrypt.hash(this.password, 10);

  this.password = hash;

  next();
});

const userModel = mongoose.model("Users", UserSchema);

module.exports = userModel;
