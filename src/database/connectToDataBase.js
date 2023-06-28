const mongoose = require("mongoose");

const connectToDataBase = async () => {
  const mongo_url = `mongodb://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@mongo:27017`;
  //const mongo_url = `mongodb://admin:admin@0.0.0.0:27017`;

  console.log(
    process.env.MONGODB_USERNAME,
    process.env.MONGODB_PASSWORD,
    process.env.MONGODB_DATABASE_INIT
  );

  mongoose.connect(mongo_url);

  mongoose.connection.on("error", (error) =>
    console.error("Error on connect to database: " + error)
  );
  mongoose.connection.once("open", () =>
    console.log("MongoDB successfully connected!")
  );
};

module.exports = connectToDataBase;
