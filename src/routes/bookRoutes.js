import express from "express";
import bookController from "../controllers/bookController.js";

const routes = express.Router();

routes.get("/books", bookController.bookSearching);
routes.get("/books/search", bookController.bookSearchingByFilter);
routes.get("/books/:id", bookController.bookSearchingById);
routes.post("/books", bookController.createBook);
routes.patch("/books/:id", bookController.updateBook);
routes.delete("/books/:id", bookController.deleteBook);

export default routes;