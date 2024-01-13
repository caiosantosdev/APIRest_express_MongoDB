import "dotenv/config";
import http from "http";
import app from "./src/app.js";

const PORT = 3000;

app.listen(PORT, () => {
    console.log("Server rodando na porta 3000");
});