import express from "express";
import {
  ping,
  getAll,
  getOne,
  addOne,
  deleteOne,
  modifyOne
} from "../Controllers/productosController.js";

const productosRouter = express.Router();

productosRouter.get("/ping", ping);
productosRouter.get("/", getAll);
productosRouter.get("/:id", getOne);
productosRouter.post("/", addOne);
// productosRouter.put("/:id", modifyOne);
productosRouter.delete("/:id", deleteOne);

export default productosRouter;
