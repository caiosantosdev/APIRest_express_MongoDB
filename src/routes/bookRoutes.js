import express from "express";
import bookController from "../controllers/bookController.js";
import pagination from "../middlewares/pagination.js";


const routes = express.Router();

routes.get("/books", bookController.bookSearchingAll, pagination);
routes.get("/books/search", bookController.bookSearchingFilter, pagination);
routes.get("/books/:id", bookController.bookSearchingById);
routes.post("/books", bookController.createBook);
routes.patch("/books/:id", bookController.updateBook);
routes.delete("/books/:id", bookController.deleteBook);

export default routes;