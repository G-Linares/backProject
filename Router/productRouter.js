import express from "express";
import Productos from "../api/productos.js";

const productRouter = express.Router();
let productos = new Productos();

productRouter.get("/productos/listar", (req, res) => {
  res.json(productos.listarAll());
});

productRouter.get("/productos/listar/:id", (req, res) => {
  let { id } = req.params;
  res.json(productos.listar(id));
});

productRouter.post("/productos/guardar", (req, res) => {
  let producto = req.body;
  productos.guardar(producto);
  res.redirect("/");
});

productRouter.put("/productos/actualizar/:id", (req, res) => {
  let { id } = req.params;
  let producto = req.body;
  productos.actualizar(producto, id);
  res.json(producto);
});

productRouter.delete("/productos/borrar/:id", (req, res) => {
  let { id } = req.params;
  let producto = productos.borrar(id);
  res.json(producto);
});

productRouter.get("/productos", (req, res) => {
  let prods = productos.listarAll();
  res.render("vista", {
    productos: prods,
    hayProductos: prods.length
  });
});

export default productRouter;
