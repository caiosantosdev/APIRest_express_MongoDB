function errorHandler (erro, req, res, next) {
    if(error instanceof mongoose.Error.CastError){
        res.status(400).send({ message : "Dados fornecidos de maneira incorreta."});
    }
    else{
        res.status(500).json({message: `${error.message} - falha na busca do autor`});
    }
}

export {
    errorHandler
};