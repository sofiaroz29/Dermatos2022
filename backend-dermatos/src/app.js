import express from "express";
import morgan from "morgan";
import multer from "multer";
import dotenv from 'dotenv' 
dotenv.config()

const app = express();

app.use(express.json());

app.use('/Images', express.static('./Images'))

import usuarioRoutes from "../routes/usuario.routes.js";
import reporteRoutes from "../routes/reporte.routes.js";


app.use(morgan("dev"));
app.use(express.json());
app.set('port', process.env.PORT || 3000);

app.use("/api/usuario", usuarioRoutes);
app.use ("/api", reporteRoutes);

app.use ("/images", express.static ("./images"));

export default app; 