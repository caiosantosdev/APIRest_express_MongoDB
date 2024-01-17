import express from "express";
import bookRoutes from "./bookRoutes.js";
import authorRoutes from "./authorRoutes.js";

const routes = (app) => {
    app.route("/").get((req, res) => res.status(200).send("Curso de node.js "));
    app.use(express.json());
    app.use(bookRoutes);
    app.use(authorRoutes);
};

export default routes;