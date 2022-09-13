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
    allowNull = false,
  },

  sintomas: {
    type: DataTypes.STRING,
    allowNull = false,
  },

  porcentaje: {
    type: DataTypes.INTEGER,
    allowNull = false,
  },

  imagen: {
    type: DataTypes.STRING,
    allowNull = false,
  },

  id_usuario: {
      type: DataTypes.INTEGER,
      foreignKey: true,
      allowNull = false
  }

  

}, {
  timestamps: false
});



export default Reporte;