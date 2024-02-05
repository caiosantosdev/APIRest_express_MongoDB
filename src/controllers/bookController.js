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
    static async bookSearchingFilter ( req, res, next) {
        try{
            const { publishingCo, title , minPag, maxPag, authorName } = req.query;
            
            const search = await searchFilter ( publishingCo, title , minPag, maxPag, authorName );
            
            if(search !== null){
                const booksByAuthor = await bookModel.find(search);
                console.log(booksByAuthor);
                res.status(200).json({
                    message : "Os seguintes livros foram encontrados:",
                    livros: booksByAuthor
                });
            }else{
                res.status(200).json({
                    message: "O author não possui livros registrados"
                });
            }
            
        }catch(error){
            next(error);
        }
    }
    static async createBook( req, res, next ) {
        const newBook = req.body;
        try{
            // const findedAuthor = await authorModel.findById(newBook.author);
            // const completeBook = { ...newBook , author: {...findedAuthor } };
            const completeBook = { ...newBook , author: newBook.author};
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

async function searchFilter( publishingCo, title, minPag, maxPag, authorName ){
    
    const search = {};
    
    if(publishingCo){
        const publishingRegex = new RegExp(publishingCo, "i");
        search.editora = publishingRegex;
    }
    if(title){
        const titleRegex = new RegExp(title, "i");
        search.titulo = titleRegex;
    }
    
    if(minPag || maxPag) search.paginas = {};
    
    if(minPag) search.paginas.$gte = minPag;
    
    if(maxPag) search.paginas.$lte = maxPag;
    
    if(authorName){
        const author = await authorModel.findOne({ "nome" : {$regex: authorName, $options: "i"}});
        if(!author){
            throw new NotFindedError("autor não encontrado.");
        }
        const authorId = author._id.toString();
        search.author = authorId;
    }
    
    return search;
}

export default bookController;

