const path = require("path");

module.exports = {
  handleUpload: (req, res) => {
    if (!req.file) {
      return res.status(400).json({ mensagem: "Nenhum arquivo enviado." });
    }

    // Dados do arquivo
    const fileData = {
      originalName: req.file.originalname,
      savedName: req.file.filename,
      size: req.file.size,
      mimeType: req.file.mimetype,
      url: `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`,
    };

    res.status(200).json({
      mensagem: "Arquivo enviado com sucesso!",
      arquivo: fileData,
    });
  },
};
