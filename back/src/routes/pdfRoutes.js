const express = require('express');
const router = express.Router();
const pdfController = require('../controllers/pdfController');

// Rota para o upload de PDF
router.post('/upload', pdfController.uploadPdf);

// Rota para listar todos os CPFs armazenados
router.get('/cpfs', pdfController.getCpfs);

module.exports = router;
