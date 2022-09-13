import express from "express";
import morgan from "morgan";

const app = express();


app.use(morgan("dev"));
app.use(express.json());
app.set('port', process.env.PORT || 3000);



export default app; 