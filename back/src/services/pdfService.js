const fs = require('fs');
const pdf = require('pdf-parse');

// Função para extrair CPFs de um PDF
const extractCpfsFromPdf = async (pdfPath) => {
  const dataBuffer = fs.readFileSync(pdfPath);
  const data = await pdf(dataBuffer);
  const cpfs = extractCpfsFromText(data.text);
  return cpfs;
};

// Função para extrair CPFs de um texto
const extractCpfsFromText = (text) => {
  const cpfRegex = /\b\d{3}\.\d{3}\.\d{3}-\d{2}\b/g;
  const cpfs = text.match(cpfRegex) || [];
  return cpfs;
};

module.exports = { extractCpfsFromPdf };
