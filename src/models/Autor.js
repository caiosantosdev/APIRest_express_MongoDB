import mongoose from "mongoose";


const authorSchema = new mongoose.Schema({
    id : { type: mongoose.Schema.Types.ObjectId },
    nome : { type: mongoose.Schema.Types.String, required: [true , "O nome do autor é obrigatório."] },
    nacionalidade : { type: String }
}, {versionKey : false});

const authorModel = mongoose.model("autores", authorSchema);

export { authorModel , authorSchema };