const dotenv = require("dotenv");

const connectToDataBase = require("./src/database/connectToDataBase");

dotenv.config();
connectToDataBase();

require("./src/server");
