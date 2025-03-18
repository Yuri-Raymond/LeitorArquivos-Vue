const express = require("express");
const app = express();
const cors = require("cors");

// Habilitar CORS para requisições de origens diferentes
app.use(cors());

// Middleware para aceitar requisições do tipo JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Definir as rotas do upload
const uploadRoutes = require("./routes/uploadRoutes");
app.use("/api", uploadRoutes); // Definir que as rotas de upload começam com "/api"

module.exports = app;
