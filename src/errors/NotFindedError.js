import BaseError from "./BaseError.js";

class NotFindedError extends BaseError{
    constructor(message = "Pagina nao encontrada."){
        super(message, 404);
    }
}

export default NotFindedError;