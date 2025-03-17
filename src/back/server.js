const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");

const app = express();

// Configurar CORS
app.use(cors());

// Configurar multer
const upload = multer({ dest: path.join(__dirname, "uploads/") });

// Rota de teste
app.get("/", (req, res) => {
  res.send("API funcionando!");
});

// Rota de upload
app.post("/api/upload", upload.single("arquivo"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ mensagem: "Nenhum arquivo enviado." });
  }

  res.status(200).json({
    mensagem: "Arquivo enviado com sucesso!",
    arquivo: req.file.filename,
  });
});

// Iniciar o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
