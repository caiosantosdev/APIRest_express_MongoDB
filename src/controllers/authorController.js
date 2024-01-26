import { authorModel } from "../models/Autor.js";

class AuthorController{
    static async authorSearching ( req, res , next) {
        try{
            const authorList = await authorModel.find({})
            res.status(200).json(authorList);
        }catch(error){
            next(error);
        }
    }
    static async authorSearchingById ( req, res , next ) {
        try{
            const id = req.params.id;
            const author = await authorModel.findById(id);
            if(author != null){
                res.status(200).json(author);
            }
            else{
                res.status(404).send({message : "Autor não encontrado."});
            }
        }catch(error){
            next(error);
        }
    }
    static async createAuthor( req, res, next ) {
        try{
            const newAuthor = await authorModel.create(req.body);
            res.status(201).json({ message : "Criado com sucesso",
                                    author: newAuthor
                                 });
        }catch(error){
            next(error);    
        }
    }
    static async updateAuthor ( req, res , next ) {
        try{
            const newAuthor = req.body;
            const id = req.params.id;
            await authorModel.findByIdAndUpdate(id, newAuthor);
            res.status(200).json({ message : "Autor atualizado com sucesso",
                                    author : newAuthor});
        }catch(error){
            next(error);
        }
    }
    static async deleteAuthor ( req, res , next ) {
        try{
            const id = req.params.id;
            await authorModel.findByIdAndDelete(id);
            res.status(200).json({ message : "Autor deletado com sucesso"});
        }catch(error){
            next(error);
        }
    }
}

export default AuthorController;

