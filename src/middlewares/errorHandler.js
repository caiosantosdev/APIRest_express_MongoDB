import mongoose from "mongoose";

function errorHandler (erro, req, res, next) {

    if(erro instanceof mongoose.Error.CastError){
        res.status(400).send({ message : "Dados fornecidos de maneira incorreta." });
    }
    else if (erro instanceof mongoose.Error.ValidationError) {
        const mensagensErro = Object.values(erro.errors)
        .map( erro => erro.message)
        .join("; ");

        res.status(400).send({ message : `Os seguintes erros foram encontrados: ${mensagensErro}`});
    }
    else{
        res.status(500).json({ message: `${erro.message} - falha na busca do autor` });
    }
}

export {
    errorHandler
};