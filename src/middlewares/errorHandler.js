import mongoose from "mongoose";
import BaseError from "../errors/BaseError.js";
import BadRequest from "../errors/BadRequest.js";
import NotFindedError from "../errors/NotFindedError.js";

function errorHandler (erro, req, res, next) {
    if(erro instanceof mongoose.Error.CastError){
        new BadRequest().sendResponse(res);
    }
    else if (erro instanceof mongoose.Error.ValidationError) {
        new ValidationError(erro).sendResponse(res);
    }
    else if( erro instanceof NotFindedError){
        erro.sendResponse(res);
    }
    else{
        new BaseError().sendResponse(res);
    }
}

export {
    errorHandler
};