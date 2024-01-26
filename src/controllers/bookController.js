import livroModel from "../models/Livro.js";
import { authorModel } from "../models/Autor.js";
import { query } from "express";

class bookController{
    static async bookSearching ( req, res, next ) {
        try{
            const bookList = await livroModel.find({})
            res.status(200).json(bookList);
        }catch(error){
            next(error);
        }
    }
    static async bookSearchingById ( req, res, next) {
        try{
            const id = req.params.id;
            const book = await livroModel.findById(id);
            if(!book){
                res.status(404).send({ message : "Livro não encontrado" });
            }
            else{
                res.status(200).json(book);
            }
        }catch(error){
            next(error);
        }
    }
    static async bookSearchingByPublishingCo ( req, res, next) {
        const publishingCo = req.query.editora;
        try{
            const publishingCoBooks = await livroModel.find({editora : publishingCo});
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
            const createdBook = await livroModel.create(completeBook);
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
            await livroModel.findByIdAndUpdate(id, newBook);
            res.status(200).json({ message : "Livro atualizado com sucesso",
                                    livro : newBook});
        }catch(error){
            next(error);
        }
    }
    static async deleteBook ( req, res) {
        try{
            const id = req.params.id;
            await livroModel.findByIdAndDelete(id);
            res.status(200).json({ message : "Livro deletado com sucesso"});
        }catch(error){
            next(error);
        }
    }
}

export default bookController;

