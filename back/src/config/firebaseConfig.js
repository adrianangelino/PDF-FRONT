const admin = require('firebase-admin');

// Inicie o Firebase Admin SDK com as credenciais do seu projeto Firebase
admin.initializeApp({
  credential: admin.credential.cert(require('./serviceAccountKey.json')),
  databaseURL: 'https://vue-node-firebase-cpf-default-rtdb.firebaseio.com/', // Substitua pelo seu URL do Firebase
});

const db = admin.database();

module.exports = { db };
