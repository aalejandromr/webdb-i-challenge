const express = require("express");

const db = require("./data/dbConfig.js");
const accounstRouter = require("./accounts/router");

const server = express();

server.use(express.json());
server.use("/api/accounts", accounstRouter);

module.exports = server;
