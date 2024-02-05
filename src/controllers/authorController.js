import NotFindedError from "../errors/NotFindedError.js";
import { authorModel } from "../models/index.js";

class AuthorController{
    static async authorSearching ( req, res , next) {
        try{
            
            const authorList = authorModel.find();
            
            req.resultado = authorList;
            
            next();
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
                throw new NotFindedError("Autor não encontrado.");
            }
        }catch(error){
            next(error);
        }
    }
    static async authorSearchingFilter ( req, res, next) {
        try{
            const { name, nationality } = req.query;
            
            const search = {};
            
            const regexName = new RegExp(name, "i")
            
            if(name){
                search.nome = regexName;
            }
            if(nationality){
                search.nacionalidade = { $regex: nationality, $options: "i" };
            }
            
            const success = await authorModel.find(search);
            
            if(success){
                res.status(200).json({
                    message: "Autores encontrados:",
                    autores: success
                });
            }else{
                throw new NotFindedError("não há autores com esse nome.");
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

