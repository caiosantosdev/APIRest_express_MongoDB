import BadRequest from "./BadRequest.js";

class ValidationError extends BadRequest{
    constructor(error){
        const errorMessages = Object.values(error.errors)
        .map( erro => erro.message)
        .join("; ");
        super(`Os seguintes erros foram encontrados: ${errorMessages}`);
    }
}

export default ValidationError;