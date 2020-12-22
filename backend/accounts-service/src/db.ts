import { Sequelize } from 'sequelize'
// Carrega as variaveis de ambiente
const dbName = process.env.DB_NAME!;
const dbUser = process.env.DB_USER!;
const dbPassword = process.env.DB_PASSWORD!;
const dbHost = process.env.DB_HOST!;

// Cria objeto de conexao do sequelize
const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
  dialect: 'mysql',
  host: dbHost
})

export default sequelize;