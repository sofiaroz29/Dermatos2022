import app from "./app.js";
import database from "../config/database.js";

import '../models/usuarios.js';
import '../models/reporte.js';


async function main() {
    try {
        await database.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
    await database.sync({alter: true});
    app.listen(app.get('port'));
    console.log("Server on port 3000");
}


main();