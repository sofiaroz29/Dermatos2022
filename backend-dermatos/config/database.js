import  Sequelize  from 'sequelize';
//import dbConfig from './config.js'
import dotenv from 'dotenv';

dotenv.config({ path: './.env'});


//const environment = dbConfig["development"];

const database = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
  }
);

export default database;