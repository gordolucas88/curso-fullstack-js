import app from './app'
import database from './db'

(async () => { //I IF funcao que executa automaticamente, pesquisar sobre isso

  try {


    //Carregando variaveis de ambiente
    const port = process.env.PORT

    await database.sync() //Inicia a conexao com o banco de dados e sincroniza o schema com base no modelo criado
    console.log(`Running database ${process.env.DB_NAME}`)

    await app.listen(port, () => {//Define a porta a ser utilizada pelo express.
      // funcao listen, recebe uma funcao opcional como segundo parametro
      console.log(`Running on port ${port}`)
    })
  } catch (error) {
    console.log(error)
  };
})();