const multer = require('multer');
const path = require('path');
const pdfService = require('../services/pdfService');
const { db } = require('../config/firebaseConfig');

// Configuração do Multer para o upload de arquivos PDF
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage }).single('file');

// Função para processar o upload e extrair os CPFs
const uploadPdf = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(500).json({ error: 'Erro no upload do arquivo' });
    }

    try {
      const cpfs = await pdfService.extractCpfsFromPdf(req.file.path);
      await saveCpfsToFirebase(cpfs);
      res.json({ message: 'Arquivo processado com sucesso!', cpfs });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao processar o PDF' });
    }
  });
};

// Função para salvar os CPFs no Firebase
const saveCpfsToFirebase = async (cpfs) => {
  const ref = db.ref('cpfs');
  cpfs.forEach(async (cpf) => {
    await ref.push(cpf);
  });
};

// Função para obter todos os CPFs armazenados
const getCpfs = async (req, res) => {
  const ref = db.ref('cpfs');
  ref.once('value', (snapshot) => {
    const cpfs = [];
    snapshot.forEach((childSnapshot) => {
      cpfs.push(childSnapshot.val());
    });
    res.json({ cpfs });
  });
};

module.exports = { uploadPdf, getCpfs };
