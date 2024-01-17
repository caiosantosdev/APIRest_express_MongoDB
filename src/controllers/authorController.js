import { authorModel , authorSchema } from "../models/Autor.js";

class authorController{
    static async authorSearching ( req, res) {
        try{
            const authorList = await authorModel.find({})
            res.status(200).json(authorList);
        }catch(error){
            res.status(500).json({message: `${error.message} - falha na requisição`})
        }
    };
    static async authorSearchingById ( req, res) {
        try{
            const id = req.params.id;
            const author = await authorModel.findById(id);
            res.status(200).json(author);
        }catch(error){
            res.status(500).json({message: `${error.message} - falha na busca do autor`})
        }
    };
    static async createAuthor( req, res ) {
        try{
            const newAuthor = await authorModel.create(req.body);
            res.status(201).json({ message : "Criado com sucesso",
                                    author: newAuthor
                                 });
        }catch(erro){
            res.status(500).json({ message : `${erro.message} - falha ao cadastrar autor`})
        }
    };
    static async updateAuthor ( req, res) {
        try{
            const newAuthor = req.body;
            const id = req.params.id;
            await authorModel.findByIdAndUpdate(id, newAuthor);
            res.status(200).json({ message : "Autor atualizado com sucesso",
                                    author : newAuthor});
        }catch(error){
            res.status(500).json({message: `${error.message} - falha na atualização do autor`})
        }
    };
    static async deleteAuthor ( req, res) {
        try{
            const id = req.params.id;
            await authorModel.findByIdAndDelete(id);
            res.status(200).json({ message : "Autor deletado com sucesso"});
        }catch(error){
            res.status(500).json({message: `${error.message} - falha na requisição DELETE`})
        }
    };
};

export default authorController;

