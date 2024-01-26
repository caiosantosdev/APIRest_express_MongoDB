import express from "express";
import databaseConnect from "./config/dbConnect.js";
import routes from "./routes/index.js";
import { errorHandler } from "./middlewares/errorHandler.js";

const connection = await databaseConnect();
    

connection.on("error", (erro) => {
    console.log("erro de conexao:" , erro);
});

connection.once("open", () => {
    console.log("Conexao com o banco feita com sucesso");
})

const app = express();

//gerenciador de rotas utilizando o app.
routes(app);

//middleware
app.use(errorHandler);

export default app;