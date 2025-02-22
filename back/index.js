const express = require('express');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const firebaseAdmin = require('firebase-admin');
const pdfjsLib = require('pdfjs-dist');

const app = express();
const port = 5000;

// Configurar CORS e JSON
app.use(cors());
app.use(express.json());

// Configuração do Multer para upload de arquivos
const upload = multer({ dest: 'uploads/' });

// Configuração do Firebase
const serviceAccount = require('./src/config/serviceAccountKey.json');
firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount),
  databaseURL: 'https://vue-node-firebase-cpf-default-rtdb.firebaseio.com/',
});

const db = firebaseAdmin.database();
const ref = db.ref('cpfs');

// Função para extrair texto de PDFs
async function extractTextFromPdf(filePath) {
  try {
    const data = new Uint8Array(fs.readFileSync(filePath));
    const pdfDocument = await pdfjsLib.getDocument(data).promise;
    let text = '';

    for (let i = 0; i < pdfDocument.numPages; i++) {
      const page = await pdfDocument.getPage(i + 1);
      const content = await page.getTextContent();
      text += content.items.map(item => item.str).join(' ') + '\n';
    }

    if (!text) {
      throw new Error('Texto não encontrado no PDF.');
    }

    return text;
  } catch (error) {
    console.error('Erro ao extrair texto do PDF:', error.message);
    if (error.message && error.message.includes('Invalid number: - (charCode 45)')) {
      throw new Error('FormatError: Invalid number: - (charCode 45)');
    }
    throw new Error('Falha ao extrair texto do PDF');
  }
}

// Função para validar o CPF
function isValidCpf(cpf) {
  const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
  return cpfRegex.test(cpf);
}

// Função para extrair CPFs do texto
function extractCpfsFromText(text) {
  const cpfRegex = /(\d{3}\.\d{3}\.\d{3}-\d{2})/g;
  return text.match(cpfRegex) || [];
}

// Endpoint para upload e processamento do PDF
app.post('/api/pdf/upload', upload.single('file'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'Nenhum arquivo enviado' });
  }

  const filePath = path.join(__dirname, req.file.path);

  try {
    // Simulação de erro ao tentar extrair texto de um PDF mal formado
    let text = await extractTextFromPdf(filePath);
    console.log("Texto extraído:", text);  // Verificando o texto extraído

    // Limitar o tamanho do texto para evitar grandes mensagens
    if (text.length > 1000) {
      console.warn("Texto extraído muito grande, comprimento:", text.length);
    }

    const cpfs = extractCpfsFromText(text);
    console.log("CPFs encontrados:", cpfs);

    // Validar CPFs e remover os inválidos
    const validCpfs = cpfs.filter(isValidCpf);
    console.log("CPFs válidos:", validCpfs);

    // Limitar a quantidade de CPFs enviados para o Firebase
    const maxCpfsPerPush = 10; // Limite de CPFs por vez
    if (validCpfs.length > maxCpfsPerPush) {
      console.warn(`Mais de ${maxCpfsPerPush} CPFs encontrados. Enviando apenas os primeiros.`);
    }

    // Enviar CPFs válidos em lotes
    validCpfs.slice(0, maxCpfsPerPush).forEach((cpf) => {
      ref.push({ cpf });
    });

    if (validCpfs.length > 0) {
      res.json({ message: 'CPFs extraídos e salvos com sucesso!', cpfs: validCpfs.slice(0, maxCpfsPerPush) });
    } else {
      res.status(400).json({ error: 'Nenhum CPF válido encontrado no arquivo.' });
    }
  } catch (error) {
    console.error('Erro ao processar o PDF:', error.message);
    if (error.message === 'FormatError: Invalid number: - (charCode 45)') {
      return res.status(400).json({ error: 'Formato de número inválido detectado no PDF.' });
    }
    res.status(500).json({ error: 'Erro ao processar o arquivo. Verifique se o PDF está correto ou tente outro arquivo.' });
  } finally {
    // Limpeza do arquivo temporário
    try {
      fs.unlinkSync(filePath);
    } catch (err) {
      console.error("Erro ao remover o arquivo temporário:", err);
    }
  }
});

// Endpoint para buscar todos os CPFs
app.get('/api/cpfs', async (req, res) => {
  try {
    const snapshot = await ref.once('value');
    const cpfs = snapshot.val();
    res.json({ cpfs: cpfs ? Object.values(cpfs).map(item => item.cpf) : [] });
  } catch (error) {
    console.error('Erro ao buscar CPFs:', error);
    res.status(500).json({ error: 'Erro ao buscar CPFs.' });
  }
});

// Endpoint para excluir um CPF
app.delete('/api/cpfs/:cpf', async (req, res) => {
  const cpfToDelete = req.params.cpf;

  try {
    // Buscar todos os CPFs e procurar o CPF para excluir
    const snapshot = await ref.once('value');
    const cpfs = snapshot.val();
    
    // Encontrar o CPF a ser excluído
    const cpfKey = Object.keys(cpfs).find(key => cpfs[key].cpf === cpfToDelete);

    if (cpfKey) {
      // Deletar o CPF encontrado
      await ref.child(cpfKey).remove();
      res.json({ message: `CPF ${cpfToDelete} excluído com sucesso.` });
    } else {
      res.status(404).json({ error: 'CPF não encontrado.' });
    }
  } catch (error) {
    console.error('Erro ao excluir CPF:', error);
    res.status(500).json({ error: 'Erro ao excluir CPF.' });
  }
});

// Endpoint para editar um CPF
app.put('/api/cpfs/:cpf', async (req, res) => {
  const cpfToEdit = req.params.cpf;
  const newCpf = req.body.cpf;

  try {
    // Buscar todos os CPFs e procurar o CPF para editar
    const snapshot = await ref.once('value');
    const cpfs = snapshot.val();
    
    // Encontrar o CPF a ser editado
    const cpfKey = Object.keys(cpfs).find(key => cpfs[key].cpf === cpfToEdit);

    if (cpfKey) {
      // Atualizar o CPF encontrado
      await ref.child(cpfKey).update({ cpf: newCpf });
      res.json({ message: `CPF ${cpfToEdit} atualizado para ${newCpf}.` });
    } else {
      res.status(404).json({ error: 'CPF não encontrado.' });
    }
  } catch (error) {
    console.error('Erro ao editar CPF:', error);
    res.status(500).json({ error: 'Erro ao editar CPF.' });
  }
});

// Endpoint para excluir um CPF
app.delete('/api/cpfs/:cpf', async (req, res) => {
  const cpf = req.params.cpf;

  try {
    // Buscando o CPF no Firebase e removendo-o
    const snapshot = await ref.orderByChild('cpf').equalTo(cpf).once('value');
    const cpfData = snapshot.val();

    if (!cpfData) {
      return res.status(404).json({ error: 'CPF não encontrado.' });
    }

    // Pega o ID do CPF para remover o nó
    const cpfId = Object.keys(cpfData)[0];
    await ref.child(cpfId).remove();

    res.json({ message: 'CPF excluído com sucesso.' });
  } catch (error) {
    console.error('Erro ao excluir CPF:', error.message);
    res.status(500).json({ error: 'Erro ao excluir CPF' });
  }
});


// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
