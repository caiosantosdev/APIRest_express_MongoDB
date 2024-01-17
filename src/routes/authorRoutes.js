import express from "express";
import authorController from "../controllers/authorController.js";

const routes = express.Router();

routes.get("/authors", authorController.authorSearching);
routes.get("/authors/:id", authorController.authorSearchingById);
routes.post("/authors", authorController.createAuthor);
routes.put("/authors/:id", authorController.updateAuthor);
routes.delete("authors/:id", authorController.deleteAuthor);

export default routes;