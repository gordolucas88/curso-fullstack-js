import { Request, Response } from 'express';
import { IAccount } from '../models/account';
import repository from '../models/accountModel';
import auth from '../auth'

const accounts: IAccount[] = [] //Definido que a variavel deve ser um array de IAccount que e o modelo definido no Model



async function getAccounts(req: Request, res: Response, next: any) {
  const accounts = await repository.findAll(); // Similar ao 'Select * from table' utilizando Generics
  //retorna JSON com a listagem das contas atribuidas na variavel accounts
  res.json(accounts.map(item => { // Limpando as senhas
    item.password = '';
    return item;
  }));
};


async function getAccount(req: Request, res: Response, next: any) {
  //Funcao para retornar uma conta especifica
  try {
    const id = parseInt(req.params.id); //Definindo qual o cadastro solicitado na requisicao
    if (!id) {
      throw new Error("ID is invalid format") // Valido a ID para nao retornar undefined, descoberto na hora de executar os testes
    };
    const account = await repository.findById(id)
    //const index = accounts.findIndex(item => item.id === id); //Procura no array o indice que contem o valor pedido na requisicao.
    if (account === null) {//Index nao encontrado
      return res.status(404).end(); // Retorna status Not Found para o navegado e encerra a requisicao.
    } else {
      account.password = ''
      return res.json(account) // Retorna o cadastro solicitado em caso de exito
    }
  } catch (error) {
    console.log(error)
    res.status(400).end(); //Retorna para o navegado erro 400 e encerra a requisicao
  }

}

async function addAccount(req: Request, res: Response, next: any) {
  //Adiciona uma nova conta no array de contas
  try {
    const newAccount = req.body as IAccount; //Definindo que o "body" deve seguir o modelo definido na Interface, caso nao siga da erro.  
    newAccount.password = auth.hashPassword(newAccount.password)
    const result = await repository.add(newAccount)
    //accounts.push(newAccount); // Adiciona a conta no array
    newAccount.password = '';
    newAccount.id = result.id;
    res.status(201).json(newAccount); //Retorna para o navegador status 201 como resposta, um JSON com as informacoes da conta cadastrada
  } catch (error) {
    console.log(error)
    res.status(400).end(); //Retorna para o navegado erro 400 e encerra a requisicao
  }


}

async function setAccount(req: Request, res: Response, next: any) {
  // Atualiza uma conta já cadastrada, através do id
  try {
    const accountId = parseInt(req.params.id); //pega o id requisitado
    if (!accountId) {
      throw new Error("ID is invalid format") // Valido a ID para nao retornar undefined, descoberto na hora de executar os testes
    };
    const accountParams = req.body as IAccount; //Definindo que o "body" deve seguir o modelo definido na Interface, caso nao siga da erro.  
    
    const updatedAccount = await repository.set(accountId, accountParams);
    updatedAccount.password = '';
    res.status(200).json(updatedAccount)
 


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