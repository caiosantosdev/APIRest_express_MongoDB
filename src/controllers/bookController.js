import { bookModel } from "../models/index.js";
import { authorModel } from "../models/Autor.js";
import NotFindedError from "../errors/NotFindedError.js";

class bookController{
    static async bookSearching ( req, res, next ) {
        try{
            const bookList = await bookModel.find({})
            res.status(200).json(bookList);
        }catch(error){
            next(error);
        }
    }
    static async bookSearchingById ( req, res, next) {
        try{
            const id = req.params.id;
            const book = await bookModel.findById(id);
            if(!book){
                throw new NotFindedError("Livro não encontrado.");
            }
            else{
                res.status(200).json(book);
            }
        }catch(error){
            next(error);
        }
    }
    static async bookSearchingByFilter ( req, res, next) {
        try{
            const { publishingCo, title } = req.query;
            
            const search = {};
            
            const regex = new RegExp(title, "i");
            
            if(publishingCo){
                search.editora = publishingCo;
            }
            if(title){
                search.titulo = regex;
            }
            //outra opção:
            // if(title){
            //     search.titulo = { $regex: titulo, $options: "i"};
            // }
            
            
            const publishingCoBooks = await bookModel.find(search);
            res.status(200).json(publishingCoBooks);
        }catch(error){
            next(error);
        }
    }
    static async createBook( req, res, next ) {
        const newBook = req.body;
        try{
            const findedAuthor = await authorModel.findById(newBook.author);
            const completeBook = { ...newBook , author: {...findedAuthor } };
            const createdBook = await bookModel.create(completeBook);
            res.status(201).json({ message : "Criado com sucesso",
                                    livro: createdBook
                                 });
        }catch(error){
            next(error);
        }
    }
    static async updateBook ( req, res) {
        try{
            const newBook = req.body;
            const id = req.params.id;
            await bookModel.findByIdAndUpdate(id, newBook);
            res.status(200).json({ message : "Livro atualizado com sucesso",
                                    livro : newBook});
        }catch(error){
            next(error);
        }
    }
    static async deleteBook ( req, res) {
        try{
            const id = req.params.id;
            await bookModel.findByIdAndDelete(id);
            res.status(200).json({ message : "Livro deletado com sucesso"});
        }catch(error){
            next(error);
        }
    }
}

export default bookController;

