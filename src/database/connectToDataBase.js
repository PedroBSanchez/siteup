const mongoose = require("mongoose");

const connectToDataBase = async () => {
  //Dev Mongoose
  //const mongo_url = `mongodb://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@localhost:27017`;

  //Docker
  const mongo_url = `mongodb://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@mongo:27017`;

  mongoose.connect(mongo_url);

  mongoose.connection.on("error", (error) =>
    console.error("Error on connect to database: " + error)
  );
  mongoose.connection.once("open", () =>
    console.log("MongoDB successfully connected!")
  );
};

module.exports = connectToDataBase;
