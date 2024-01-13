import express from "express";
import databaseConnect from "./config/dbConnect.js";
import livro from "./models/Livro.js"

const connection = await databaseConnect();

connection.on("error", (erro) => {
    console.log("erro de conexao:" , erro);
});

connection.once("open", () => {
    console.log("Conexao com o banco feita com sucesso");
})


const app = express();
app.use(express.json());

// const books = [
//     {
//         id: 1,
//         titulo: "O senhor dos aneis"
//     },
//     {
//         id: 2,
//         titulo: "O Hobbit"
//     }
// ];

function bookSearch(id){
    return books.findIndex(currentBook =>{
        return currentBook.id === Number(id);
    });
}

app.get("/", (req,res) => {
    res.status(200).send("Curso de node.js");
});

app.get("/books", async (req, res) => {
    const bookList = await livro.find({})
    res.status(200).json(bookList);
});

app.get("/books/:id", (req, res) => {
    const index = bookSearch(req.params.id);
    res.status(200).json(books[index]);
});

app.post("/books", (req, res) => {
    const book = req.body;
    books.push(book);
    res.status(201).send("Livro cadastrado com sucesso");
});

app.put("/books/:id", (req, res) => {
    const index = bookSearch(req.params.id);
    books[index].titulo = req.body.titulo;
    res.status(200).json(books[index]);
});

app.delete("/books/:id", (req, res) => {
    const index = bookSearch(req.params.id);
    books.splice(index, 1);
    res.status(200).send("Livro removido com sucesso.");
});



export default app;