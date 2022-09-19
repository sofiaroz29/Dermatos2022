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
    type: DataTypes.STRING,
    allowNull: false,
  },

  apellido: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  edad: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  contrasenia: {
    type: DataTypes.STRING,
    allowNull: false,
  },


}, {
  timestamps: false
});



export default Usuario;