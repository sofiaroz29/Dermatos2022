import { Sequelize } from "sequelize";
import database from "../config/database.js"; 
import Reporte from "./reporte.js";
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


  contrasenia: {
    type: DataTypes.STRING,
    allowNull: false,
  },


}, {
  timestamps: false
});


Usuario.hasMany(Reporte, {
  foreignkey: "id_usuario",
  sourceKey: "id",
});

Reporte.belongsTo(Usuario, { foreignkey: "projectId", targetId: "id" });


export default Usuario;