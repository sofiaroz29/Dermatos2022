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

  estado: {
    type: DataTypes.STRING,
  },

  imagen: {
    type: DataTypes.STRING,
  },

  imgformat: {
    type: DataTypes.STRING
  },

});



export default Reporte;