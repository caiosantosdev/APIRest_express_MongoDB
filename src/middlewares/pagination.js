import BadRequest from "../errors/BadRequest.js";

async function pagination( req, res, next ) {
    try{
        let {limite = 5, pagina = 1, ordenacao = "titulo:1"} = req.query;
            
        let [ordenation, order] = ordenacao.split(":");
        
        limite = parseInt(limite);
        pagina = parseInt(pagina);
        order = parseInt(order);
        
        const result = req.resultado;
        
        if(limite > 0 && pagina > 0){
            const resultPaggedList = await result.find()
            .sort({ [ordenation]: order })
            .skip((pagina-1) * limite)
            .limit(limite)
            .exec();
            
            res.status(200).json(resultPaggedList);
        }else{
            throw new BadRequest("requisição incorreta");
        }
    }catch(error){
        next(error);
    }
    
}

export default pagination;