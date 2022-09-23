import { Sequelize } from "sequelize";
import database from "../config/database.js"; 
const { DataTypes } = Sequelize;

const Reporte = database.define("reportes", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },

  parte_del_cuerpo: {
    type: DataTypes.STRING,
  },

  sintomas: {
    type: DataTypes.TEXT,
  },

  antecedentes: {
    type: DataTypes.STRING,
  },

  conducta_sol: {
    type: DataTypes.STRING,
  },

  fototipos: {
    type: DataTypes.INTEGER,
  },

  porcentaje: {
    type: DataTypes.INTEGER,
  },

  imagen: {
    type: DataTypes.STRING,
  },

  id_usuario: {
      type: DataTypes.INTEGER,
      foreignKey: true,
  }
});



export default Reporte;