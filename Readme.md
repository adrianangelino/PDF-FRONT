Projeto CPF Extractor
Este projeto consiste em duas partes:

Back-End:
Uma API construída com Node.js, Express, Firebase Admin e pdfjs-dist para processar uploads de arquivos PDF, extrair CPFs e armazená-los no Firebase Realtime Database.

Front-End:
Uma aplicação Vue.js que permite ao usuário fazer upload de PDFs, visualizar os CPFs extraídos e gerenciar (editar/excluir) os CPFs armazenados.

Índice
Pré-requisitos
Instalação
Back-End
Front-End
Configuração
Back-End
Front-End
Funcionalidades
Estrutura do Projeto
Uso
Contribuição
Pré-requisitos
Node.js (v12 ou superior)
NPM ou Yarn
Conta no Firebase (para configurar o Firebase Realtime Database)
Vue CLI (para desenvolver e rodar o front-end da aplicação)
Instalação
Back-End
Clone o repositório:

bash
Copiar
Editar
git clone <URL do repositório>
cd backend
Instale as dependências:

bash
Copiar
Editar
npm install # ou yarn install
Configuração do Firebase:

Coloque o arquivo serviceAccountKey.json (credenciais do Firebase) no diretório src/config.
Certifique-se de que a URL do Firebase esteja correta no arquivo index.js.
Iniciar o servidor:

bash
Copiar
Editar
npm start # ou yarn start
O back-end ficará disponível em: http://localhost:5000

Front-End
Navegue até o diretório do front-end:

bash
Copiar
Editar
cd frontend
Instale as dependências:

bash
Copiar
Editar
npm install # ou yarn install
Iniciar o servidor de desenvolvimento:

bash
Copiar
Editar
npm run serve # ou yarn serve
O front-end geralmente estará disponível em: http://localhost:8080

Configuração
Configuração do Back-End
O back-end utiliza as seguintes tecnologias e pacotes:

Express: Framework para criar uma API.
Multer: Middleware para upload de arquivos.
pdfjs-dist: Biblioteca para extrair texto dos arquivos PDF.
Firebase Admin: Para integração com o Firebase Realtime Database.
Principais pontos finais (endpoints):

POST /api/pdf/upload: Realiza o upload de um arquivo PDF, extrai os CPFs e os salva no Firebase.
GET /api/cpfs: Retorna todos os CPFs salvos.
PUT /api/cpfs/:cpf: Edita um CPF.
DELETE /api/cpfs/:cpf: Exclui um CPF.
Configuração do Front-End
O front-end foi desenvolvido com:

Vue.js: Estrutura para construir a interface.
Axios: Para fazer requisições HTTP à API.
Vue Router: Para navegação entre as páginas.
Componentes principais:

HomePage.vue: Permite o upload de arquivos PDF e exibe os CPFs extraídos.
CpfList.vue: Exibe os CPFs extraídos e permite edição/exclusão.
Funcionalidades
Upload de PDF: Permite enviar um arquivo PDF para o back-end para extração dos CPFs.
Extração de CPFs: Utiliza o pdfjs-dist para extrair os números de CPF dos arquivos PDF.
Armazenamento no Firebase: Os CPFs extraídos são salvos no Firebase Realtime Database.
Visualização dos CPFs: A interface exibe os CPFs em um container centralizado, com scroll (caso a lista seja longa).
Edição e Exclusão: Permite que o usuário edite ou exclua um CPF diretamente pela interface.
Estrutura do Projeto
bash
Copiar
Editar
backend/
│
├── src/
│   ├── config/                # Configurações (ex.: serviceAccountKey.json para o Firebase)
│   ├── controller/            # Lógica para as rotas da API
│   ├── routes/                # Endpoints da API (ex.: upload PDF, listar/excluir CPFs)
│   ├── services/              # Manipulação de dados (ex.: extração de CPFs dos PDFs)
│   └── (outros arquivos de suporte)
│
└── index.js                   # Arquivo principal que inicializa o servidor Express

frontend/
│
├── src/
│   ├── assets/                # Arquivos estáticos (imagens, fontes, etc.)
│   ├── components/            # Componentes Vue.js reutilizáveis
│   ├── views/                 # Páginas da aplicação
│   │   ├── HomePage.vue       # Página para upload de PDF e visualização de CPFs
│   │   └── CpfList.vue        # Página para listagem, edição e exclusão de CPFs
│   ├── router/                # Configuração do Vue Router para navegação entre páginas
│   └── App.vue                # Componente principal da aplicação
│
├── package.json               # Dependências do front-end
└── README.md                  # Documentação do front-end

Uso
Back-End
Inicie o servidor:

bash
Copiar
Editar
npm start # ou yarn start
O back-end ficará disponível em: http://localhost:5000.

Front-End
Inicie o servidor de desenvolvimento:

bash
Copiar
Editar
npm run serve # ou yarn serve
O front-end estará disponível em: http://localhost:8080.

Contribuição
Fork este repositório.
Crie uma branch para sua funcionalidade (git checkout -b feature/nova-funcionalidade).
Faça o commit das suas mudanças (git commit -am 'Adiciona nova funcionalidade').
Envie a branch para o repositório remoto (git push origin feature/nova-funcionalidade).
Abra um pull request.
