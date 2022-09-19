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
    type: DataTypes.STRING,
  },

  porcentaje: {
    type: DataTypes.INTEGER,
  },

  imagen: {
    type: DataTypes.BLOB("long"),
  },

  id_usuario: {
      type: DataTypes.INTEGER,
      foreignKey: true,
  },

  

}, {
  timestamps: false
});



export default Reporte;