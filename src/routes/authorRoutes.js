import express from "express";
import AuthorController from "../controllers/authorController.js";
import pagination from "../middlewares/pagination.js";

const routes = express.Router();

routes.get("/authors", AuthorController.authorSearching, pagination);
routes.get("/authors/search", AuthorController.authorSearchingFilter);
routes.get("/authors/:id", AuthorController.authorSearchingById);
routes.post("/authors", AuthorController.createAuthor);
routes.put("/authors/:id", AuthorController.updateAuthor);
routes.delete("/authors/:id", AuthorController.deleteAuthor);

export default routes;