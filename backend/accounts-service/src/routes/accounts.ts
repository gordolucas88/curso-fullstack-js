import {Router, Request, Response} from 'express';
import Joi from 'joi';
import accountsController from '../controllers/accounts';
import {accountSchema, loginSchema} from '../models/account';
import { validateAccount, validateLogin } from './middlewares'


const router = Router(); //Instacia o módulo de roteamento do express


// usar : após a declaração da variavél, indica qual o tipo daquela variavél em TypeScript
router.get('/accounts/', accountsController.getAccounts); //Criando uma rota tipo GET, a funcao recebe 2 parametros, caminho da requisicao e depois uma funcao, que normalmente tem os parametros (request, resolve e response)
router.get('/accounts/:id', accountsController.getAccount); //Criando rota tipo GET, que recebe um parametro ID, e chama funcao que retorna o registro com o id solicictado
router.patch('/accounts/:id', validateAccount, accountsController.setAccount); //Criando rota PATCH, que atualiza um cliente
router.post('/accounts/', validateAccount, accountsController.addAccount); //Criando uma rota tipo POST, a funcao recebe 2 parametros, caminho da requisicao e depois uma funcao, que normalmente tem os parametros (request, resolve e response)
router.post('/accounts/login', validateLogin,accountsController.loginAccount);
router.post('/accounts/logout', accountsController.logoutAccount )

export default router //Exportando a variavél para ser usado no meu módulo app