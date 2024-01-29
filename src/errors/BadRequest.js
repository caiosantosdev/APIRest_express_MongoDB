import BaseError from "./BaseError.js";

class BadRequest extends BaseError{
    constructor(message){
        super(message, 500);
    }
}

export default BadRequest;