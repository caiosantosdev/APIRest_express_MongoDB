import NotFindedError from "../errors/NotFindedError.js";

function manipulator_404( req, res, next ) {
    const error = new NotFindedError();
    next(error);
}

export {
    manipulator_404
}