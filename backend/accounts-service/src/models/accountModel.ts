
import { optional } from 'joi';
import Sequelize, { Model, Optional } from 'sequelize';
import database from '../db';
import { IAccount } from './account';

interface AccountCreationAttributes extends Optional<IAccount, "id"> { } // Importando a heranca da interface

export interface AccountModel extends Model<IAccount, AccountCreationAttributes>, IAccount { } // Importando o modelo baseado nas definicoes da classe

const accountModel = database.define<AccountModel>('account', { //Criando modelo da tabela <Informa que o Id dev estar nas regras propostas na interface>
  id: { //Nome da coluna
    type: Sequelize.INTEGER.UNSIGNED, //Tipo Inteiro, somente numeros positivos
    primaryKey: true, // Define a PK
    autoIncrement: true, // Define que sera auto incrementada
    allowNull: false, // Nao permite Nulos
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true // Nao permite valores duplicados
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  status: {
    type: Sequelize.SMALLINT.UNSIGNED,
    allowNull: false,
    defaultValue: 100 //Atribui um valor padrao ao campo, caso nao seja informado
  },
  domain: {
    type: Sequelize.STRING,
    allowNull: true,
  }

})


function findAll() {
  return accountModel.findAll<AccountModel>();
}

function findById(id: number) {
  return accountModel.findByPk<AccountModel>(id); // where id = *****

}

function add(account: IAccount) {
  return accountModel.create(account);
}

async function set(id: number, account: IAccount) {
  const originalAccount = await accountModel.findByPk<AccountModel>(id)
  if (originalAccount !== null) {
    originalAccount.name = account.name;
    originalAccount.domain = account.domain;
    originalAccount.status = account.status
    if (!account.password) {
      originalAccount.password = account.password
    }
    await originalAccount.save()
    return originalAccount
  }

  throw new Error('Account not found')

}


export default { findAll, findById, add, set }