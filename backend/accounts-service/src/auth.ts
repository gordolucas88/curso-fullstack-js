import bcrypt from 'bcryptjs'

function hashPassword(password:string) { // Cria um hash do password do usuario, que vai ser comparado sempre que tiver um novo acesso
  return bcrypt.hashSync(password, 10 )
  
}

function comparePassword(password: string, hashPassword:string){ // compara a senha digitada se ira gerar o mesmo hash
  return bcrypt.compareSync(password, hashPassword)
}

export default {hashPassword, comparePassword }