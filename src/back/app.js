const express = require("express");
const cors = require("cors");
const path = require("path");
const uploadRoutes = require("./routes/uploadRoutes");

const app = express();

// Middleware global
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir arquivos estáticos da pasta 'uploads'
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Conectar rotas
app.use("/api/upload", uploadRoutes);

module.exports = app;
