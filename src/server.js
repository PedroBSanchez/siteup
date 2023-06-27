const express = require("express");
const { use } = require("express/lib/application");
const cors = require("cors");
const userController = require("./controllers/userController");

const app = express();
app.use(cors());
app.use(express.json());

//Rotas

app.use("/user", userController);

const port = process.env.PORT || 8080;

app.listen(port, () => console.log(`Server up on port ${port}`));
