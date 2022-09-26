import express from "express";
import { ping, getAll, getOne } from "../Controllers/productosController.js";

const productosRouter = express.Router();

productosRouter.get("/ping", ping);
productosRouter.get("/", getAll);
productosRouter.get("/:id", getOne);

export default productosRouter;
