import { Sequelize } from "sequelize";
import database from "../config/database.js"; 
const { DataTypes } = Sequelize;

const Usuario = database.define("usuarios", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },

  nombre: {
    type: DataTypes.STRING
  },

  apellido: {
    type: DataTypes.STRING
  },

  email: {
    type: DataTypes.STRING
  },

  edad: {
    type: DataTypes.INTEGER
  },

  contraseña: {
    type: DataTypes.INTEGER
  }


}, {
  timestamps: false
});



export default Usuario;