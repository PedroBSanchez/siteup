const dotenv = require("dotenv");

// const connectToDataBase = require("");

dotenv.config();
connectToDataBase();

require("./src/server");
