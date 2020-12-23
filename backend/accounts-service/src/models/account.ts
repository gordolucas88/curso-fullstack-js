import {AccountStatus} from './accountStatus'

//Criado a Interface, ou Model que basicamente sao as diretivas da aplicacao
export interface IAccount{

  id?: number,
  name: string,
  email: string,
  password: string,
  status: AccountStatus,
  domain: string,

}
