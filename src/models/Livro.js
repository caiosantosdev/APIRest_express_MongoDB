import mongoose from "mongoose";
import { authorSchema } from "./Autor.js";

const livroSchema = new mongoose.Schema({
    id: { type : mongoose.Schema.Types.ObjectID },
    titulo: { type: mongoose.Schema.Types.String, required: true},
    editora: { type: mongoose.Schema.Types.String },
    preco: { type : mongoose.Schema.Types.Number },
    paginas: { type : mongoose.Schema.Types.Number },
    author: authorSchema
}, {versionKey : false});

const livro = mongoose.model("livros", livroSchema);

export default livro;