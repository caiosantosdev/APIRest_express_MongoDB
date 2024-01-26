import mongoose from "mongoose";
import { authorSchema } from "./Autor.js";

const livroSchema = new mongoose.Schema({
    id: { type : mongoose.Schema.Types.ObjectID },
    titulo: { 
        type: mongoose.Schema.Types.String, 
        required: [
            true,
            "O titulo é obrigatório."
        ]
    },
    editora: { 
        type: mongoose.Schema.Types.String , 
        required: [
            true,
            "É obrigatório ter editora."
        ]
    },
    preco: { type : mongoose.Schema.Types.Number },
    paginas: { type : mongoose.Schema.Types.Number },
    //talvez tenha que refatorar esse author tanto no banco de dados quanto no Controller de Livro.
    author: authorSchema
}, {versionKey : false});

const livro = mongoose.model("livros", livroSchema);

export default livro;