import {AccountStatus} from './accountStatus'

//Criado a Interface, ou Model que basicamente sao as diretivas da aplicacao
export interface IAccount{

  id: number,
  name: string,
  email: string,
  password: string,
  status: AccountStatus

}

import Joi from 'joi'

const accountSchema = Joi.object({
  //inserir aqui o esquema de validação
  id: Joi.number()
         .integer()
         .min(1),
  name: Joi.string()
           .min(3)
           .max(150)
           .required(),
  email: Joi.string()
            .email()
            .min(8)
            .max(150)
            .required(),   //Marca que o campo deve ser obrigatorio      
  password: Joi.string()
               .min(3)
               .max(50)
               .required(),
  status: Joi.number()
             .integer()
             .min(100)
             .max(400)

})

const loginSchema = Joi.object({
  email: Joi.string()
            .email()
            .min(8)
            .max(150)
            .required(),   //Marca que o campo deve ser obrigatorio      
  password: Joi.string()
                .min(3)
                .max(50)
                .required(),

})

export { accountSchema, loginSchema}