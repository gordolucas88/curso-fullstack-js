import { Request, Response } from 'express'
import { IAccount } from '../models/account'

const accounts: IAccount[] = [] //Definido que a variavel deve ser um array de IAccount que e o modelo definido no Model



function getAccounts(req: Request, res: Response, next: any) {
  res.json(accounts);
  //retorna JSON com a listagem das contas atribuidas na variavel accounts
};


function getAccount(req: Request, res: Response, next: any) {
  //Funcao para retornar uma conta especifica
  try {
    const id = parseInt(req.params.id); //Definindo qual o cadastro solicitado na requisicao
    if (!id) {
      throw new Error("ID is invalid format") // Valido a ID para nao retornar undefined, descoberto na hora de executar os testes
    };
    const index = accounts.findIndex(item => item.id === id); //Procura no array o indice que contem o valor pedido na requisicao.
    if (index === -1) {//Index nao encontrado
      return res.status(404).end(); // Retorna status Not Found para o navegado e encerra a requisicao.
    } else {
      return res.json(accounts[index]) // Retorna o cadastro solicitado em caso de exito
    }
  } catch (error) {
    console.log(error)
    res.status(400).end(); //Retorna para o navegado erro 400 e encerra a requisicao
  }

}

function addAccount(req: Request, res: Response, next: any) {
  //Adiciona uma nova conta no array de contas
  try {
    const newAccount = req.body as IAccount; //Definindo que o "body" deve seguir o modelo definido na Interface, caso nao siga da erro.  
    accounts.push(newAccount); // Adiciona a conta no array
    res.status(201).json(newAccount); //Retorna para o navegador status 201 como resposta, um JSON com as informacoes da conta cadastrada
  } catch (error) {
    console.log(error)
    res.status(400).end(); //Retorna para o navegado erro 400 e encerra a requisicao
  }


}

function setAccount(req: Request, res: Response, next: any) {
  // Atualiza uma conta já cadastrada, através do id
  try {
    const accountId = parseInt(req.params.id); //pega o id requisitado
    if (!accountId) {
      throw new Error("ID is invalid format") // Valido a ID para nao retornar undefined, descoberto na hora de executar os testes
    };
    const accountParams = req.body as IAccount; //Definindo que o "body" deve seguir o modelo definido na Interface, caso nao siga da erro.  
    const index = accounts.findIndex(item => item.id === accountId); // Encontra o index ou cadastro a ser alterado
    if (index === -1) { // Valida se o ID existe
      return res.status(404).end();
    };

    const originalAccount = accounts[index] // define a conta antes da atualizacao em uma variavel

    if (accountParams.name) { // testa se nome foi um dos parametros passados
      originalAccount.name = accountParams.name; // atribui o novo valor
    }
    if (accountParams.password) { // testa se senha foi um dos parametros passados
      originalAccount.password = accountParams.password; // atribui o novo valor
    };

    accounts[index] = originalAccount // atribui o valor alterado


    res.status(200).json(originalAccount); //Retorna para o navegador status 201 como resposta, um JSON com as informacoes da conta cadastrada
  } catch (error) {
    console.log(error)
    res.status(400).end(); //Retorna para o navegado erro 400 e encerra a requisicao
  }

}


function loginAccount(req: Request, res: Response, next: any) {
  try {

    const loginParams = req.body as IAccount;
    const index = accounts.findIndex(item => item.email === loginParams.email && item.password === loginParams.password);
    if (index === -1) {
      return res.status(401).end();
    }

    res.json({
      auth: true,
      token: {}
    });

  }
  catch (error) {
    console.log(error);
    res.status(400).end();
  }

}

function logoutAccount(req: Request, res: Response, next: any){
  res.json({
    auth: false,
    token: null
  })
}


export default { getAccounts, getAccount, addAccount, setAccount, loginAccount, logoutAccount }