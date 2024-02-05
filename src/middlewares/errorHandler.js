import mongoose from "mongoose";
import BaseError from "../errors/BaseError.js";
import BadRequest from "../errors/BadRequest.js";
import ValidationError from "../errors/ValidationError.js";

function errorHandler (erro, req, res, next) {
    if(erro instanceof mongoose.Error.CastError){
        new BadRequest().sendResponse(res);
    }
    else if (erro instanceof mongoose.Error.ValidationError) {
        new ValidationError(erro).sendResponse(res);
    }
    else if( erro instanceof BaseError){
        erro.sendResponse(res);
    }
    else{
        new BaseError().sendResponse(res);
    }
}

export {
    errorHandler
};