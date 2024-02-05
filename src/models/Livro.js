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
        ],
        validate: {
            validator: function (publishing) {
                //lista de editoras não permitidas
                const forbiddenPublishings = ["Raios" , "Saraiva", "Pegasus"];
                //verifica e retorna para o campo validate o valor
                return forbiddenPublishings.indexOf(publishing) === -1;
            },
            message: "{VALUE} não é uma editora permitida"
        }
    },
    preco: { type : mongoose.Schema.Types.Number },
    paginas: { 
        type : mongoose.Schema.Types.Number,
        min: [
            10,
             "O numero minimo de paginas é 10. Valor fornecido: {VALUE}"
        ],
        max: [
            5000,
            "O numero de paginas excedeu a quantidade maxima. Valor Fornecido: {VALUE}"
        ]
    },
    //talvez tenha que refatorar esse author tanto no banco de dados quanto no Controller de Livro.
    author: { type : mongoose.Schema.Types.ObjectId }
}, {versionKey : false});

const bookModel = mongoose.model("livros", livroSchema);

export { bookModel };