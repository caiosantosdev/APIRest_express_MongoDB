import express from "express";

const app = express();
app.use(express.json());

const books = [
    {
        id: 1,
        titulo: "O senhor dos aneis"
    },
    {
        id: 2,
        titulo: "O Hobbit"
    }
];

app.get("/", (req,res) => {
    res.status(200).send("Curso de node.js");
});

app.get("/books", (req, res) => {
    res.status(200).json(books);
});

app.post("/books", (req, res) => {
    const book = req.body;
    books.push(book);
    res.status(201).send("Livro cadastrado com sucesso");
});

export default app;