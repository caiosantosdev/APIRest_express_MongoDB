import livroModel from "../models/Livro.js";
import { authorModel } from "../models/Autor.js";

class bookController{
    static async bookSearching ( req, res) {
        try{
            const bookList = await livroModel.find({})
            res.status(200).json(bookList);
        }catch(error){
            res.status(500).json({message: `${error.message} - falha na requisição`})
        }
    };
    static async bookSearchingById ( req, res) {
        try{
            const id = req.params.id;
            const book = await livroModel.findById(id);
            res.status(200).json(book);
        }catch(error){
            res.status(500).json({message: `${error.message} - falha na busca do livro`})
        }
    };
    static async createBook( req, res ) {
        const newBook = req.body;
        try{
            const findedAuthor = await authorModel.findById(newBook.author);
            const completeBook = { ...newBook , author: {...findedAuthor } };
            const createdBook = await livroModel.create(completeBook);
            res.status(201).json({ message : "Criado com sucesso",
                                    livro: createdBook
                                 });
        }catch(erro){
            res.status(500).json({ message : `${erro.message} - falha ao cadastrar livro`})
        }
    };
    static async updateBook ( req, res) {
        try{
            const newBook = req.body;
            const id = req.params.id;
            await livroModel.findByIdAndUpdate(id, newBook);
            res.status(200).json({ message : "Livro atualizado com sucesso",
                                    livro : newBook});
        }catch(error){
            res.status(500).json({message: `${error.message} - falha na atualização do livro`})
        }
    };
    static async deleteBook ( req, res) {
        try{
            const id = req.params.id;
            await livroModel.findByIdAndDelete(id);
            res.status(200).json({ message : "Livro deletado com sucesso"});
        }catch(error){
            res.status(500).json({message: `${error.message} - falha na requisição DELETE`})
        }
    };
};

export default bookController;

