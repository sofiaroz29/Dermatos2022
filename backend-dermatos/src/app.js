import express from "express";
import morgan from "morgan";

const app = express();

import usuarioRoutes from "../routes/usuario.routes.js";

app.use(morgan("dev"));
app.use(express.json());
app.set('port', process.env.PORT || 3000);

app.use("/api/usuario", usuarioRoutes);

export default app; 