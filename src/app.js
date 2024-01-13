import express from "express";
import databaseConnect from "./config/dbConnect.js";
import routes from "./routes/index.js";

const connection = await databaseConnect();

connection.on("error", (erro) => {
    console.log("erro de conexao:" , erro);
});

connection.once("open", () => {
    console.log("Conexao com o banco feita com sucesso");
})

const app = express();
routes(app);

export default app;