const express = require("express");
const app = express();
const router = require("./routes");
const cors = require("cors");
const {errors} = require("celebrate");

app.use(cors());
app.use(express.json());
app.use(router);
app.use(errors());

module.exports = app;