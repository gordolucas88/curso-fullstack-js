
import {Router, Request, Response} from 'express';
import Joi from 'joi';
import accountsController from '../controllers/accounts';
import {accountSchema, loginSchema, accountUpdateSchema} from '../models/accountSchemas';

function validateSchema(schema : Joi.ObjectSchema<any>, req: Request, res: Response, next: any) {
  // Função valida se os dados da requisição, estão de acordo com o modelo
  // Cadastrado no accountSchema
  const {error} = schema.validate(req.body);
  if(error == null){
    return next()
  };

  const {details} = error;
  const message = details.map(item => item.message).join(',');

  console.log(message);
  res.status(422).end(); // error code para requisao nao processada
}

function validateAccount(req: Request, res: Response, next: any){

  return validateSchema(accountSchema, req, res, next);
}

function validateUpdateAccount(req: Request, res: Response, next: any){

  return validateSchema(accountUpdateSchema, req, res, next);
}

function validateLogin(req: Request, res: Response, next: any) {
  return validateSchema(loginSchema, req, res, next);
}

export { validateAccount, validateLogin, validateUpdateAccount }