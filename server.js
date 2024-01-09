const express = require("express");

const cors = require('cors')

const errorHandler = require('./middleware/errorHandler.js');


const dotenv = require("dotenv").config({ path: `.env.${process.env.NODE_ENV == "local"? "local": "production"}` });

const app = express();
const path = require("path");

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
const port = 4002;

const corsOptions = {
    origin: '*'
};

app.use(cors(corsOptions))

app.use(express.json());

app.use("/api/product-create", require("./routes/userRoutes"));

app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
    console.log(process.env.NODE_ENV,"env---");
});
