const express = require("express");
const { get } = require("http");

const studentsRoutes = require("./routes/studentsRoutes");
const teachersRoutes = require("./routes/teachersRoutes");

const app = express();

app.use(express.json());

app.use("/api/v1/students", studentsRoutes);
app.use("/api/v1/teachers", teachersRoutes);

module.exports = app;
