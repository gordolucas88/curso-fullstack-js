import express from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import accountsRouter from './routes/accounts'
// Middlewares são camadas aonde ocorrem algum tipo de operação.

const app = express(); //Instância o express.
app.use(helmet()); //Configura para utilizar o helmet.
app.use(bodyParser.json()); //Configura para utilizar as requisições em formato JSON.
app.use(accountsRouter); //aplicando a rota definida para ser usado no express

export default app;

