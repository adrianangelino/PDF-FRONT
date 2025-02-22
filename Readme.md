Projeto CPF Extractor
Este projeto consiste em duas partes

Back-End: Uma API construída com Node.js, Express, Firebase Admin e pdfjs-dist para processar uploads de arquivos PDF, extrair CPFs e armazená-los no Firebase Realtime Database.

Front-End: Uma aplicação Vue.js que permite ao usuário fazer upload de PDFs, visualizar os CPFs extraídos, e gerenciar (editar/excluir) os CPFs armazenados.

Índice
Pré-requisitos
Instalação
Back-end
Front-end
Configuração
Back-end
Front-end
Funcionalidades
Estrutura do Projeto
Uso
Contribuição
Licença
Pré-requisitos
Node.js (v12 ou superior)
NPM ou Fios
Conta no Firebase (para config)
Vue CLI (para desenvolver e rodar o front-end da aplicação)
Instalação
Back-end


Editar
git clone <URL_DO_REPOSITÓRIO>
cd backend

Instalar as dependências:

bater

Copiar

Editar
npm install
# ou
yarn install
Configuração do Firebase:

Coloque o arquivo serviceAccountKey.json(credenciais do Firebase) no diretório src/config.
Certifique-se de que a URL do Firebase não index.jsesteja correta.
Iniciar ou servidor:

bater

Copiar

Editar
npm start
# ou
yarn start
O back-end ficará disponível em:http://localhost:5000

Front-end
Navegue até o diretório do front-end:

bater

Copiar

Editar
cd frontend
Instalar as dependências:

bater

Copiar

Editar
npm install
# ou
yarn install
Iniciar o servidor de desenvolvimento:

bater

Copiar

Editar
npm run serve
# ou
yarn serve
O front-end geralmente será útil em:http://localhost:8080

Configuração
Configuração do Back-End
O back-end utiliza as seguintes tecnologias e pacotes:

Express: Framework para criar uma API.
Multer: Middleware para upload de arquivos.
pdfjs-dist: Biblioteca para extrair texto de arqu
Firebase Admin: Para integração com o Firebase Realtime Database.
Principais pontos finais:

POST /api/pdf/upload: Realiza o upload de um arquivo PDF, extrai os CPFs e os salva no Firebase.
GET /api/cpfs: Retorna todos os CPFs salvos.
PUT /api/cpfs/:cpf:
DELETE /api/cpfs/:cpf: Exclui um CPF

------------------------------------------------------------------------------------

Configuração do Front-End

O front-end foi desenvolvido com:

Vue.js: Estrutura
Axios: Para fazer requisições HTTP à API.
Roteador Vue: Para
Componentes principais:

---------------------------------------------------------------------------------------

HomePage.vue: Permite o upload de arquivos PDF e exibe os CPFs extraídos.

CpfList.vue: Exibe os CPFs

Funcionalidades:

Upload de PDF: Permite enviar um arquivo PDF para remoção de CPFs.

Extração de CPFs: Utilize a bibliotpdfjs-distpara extrair os números de CPF do PDF.

Armazenamento no Firebase: Salva os CPFs extraídos no Firebase Realtime Database.

Visualização dos CPFs: Uma interface exibe os CPFs em um container centralizado com scroll (caso a lista seja longa).

Edição e Exclusão: Permite que o usuário edite ou exclua um CPF diretamente pelo front-end.

Estrutura do Projeto:

backend/
├── src/
│   ├── config/         # Configurações, incluindo o serviceAccountKey.json do Firebase
│   ├── controller/     # Lógica dos controladores para as rotas
│   ├── routes/         # Definição dos endpoints da API
│   ├── services/       # Serviços para manipulação de dados, como extração de PDF e CPF
│   └── (outros arquivos de suporte)
└── index.js            # Arquivo principal do servidor Express

 frontend/
    ├── src/
    │   ├── assets/
    │   │   └── styles/
    │   │       └── CpfList.scss           # Arquivo SCSS com os estilos da lista
    │   ├── components/                   # Componentes Vue (se houver)
    │   ├── views/
    │   │   ├── HomePage.vue              # Página de upload e extração
    │   │   └── CpfList.vue               # Página de visualização/edição/exclusão de CPFs
    │   ├── router/
    │   │   └── index.js                  # Configuração das rotas (Vue Router)
    │   └── App.vue
    ├── package.json
    └── README.md                        # (Opcional) README do front-end
Uso
Back-end:

Inicie o servidor com npm start ou `yarn stayarn start.
O back-end estará disponível em http://localhost:5000.
Front-end:

Inicie o servidor de desenvolvimento com npm run serveou yarn serve.
Acesse o aplicativo via navegador em http://localhost:8080.
Utilize uma HomePage para fazer o upload de PDFs e extrair CPFs.

#   v u e - n o d e - f i r e b a s e - c p f  
 #   P D F  
 