import express from "express";
import {
  ping,
  createNewCart,
  deleteCart,
  getCarts
} from "../Controllers/carritoController.js";

const carritoRouter = express.Router();

carritoRouter.get("/ping", ping);
carritoRouter.get("/", getCarts);
//el front solo ocupa esta ruta por que no tiene sentido que el cliente
//pueda modificar carritos o borrarlos, al igual que mover los items dentro del carrito
carritoRouter.post("/", createNewCart);
// esto se prueba con Insomnia o Postman para ver su funcionamiento, despues implementare
// un front para admin que permita usar todas estas rutas para modificar el carrito
carritoRouter.delete("/:id", deleteCart);

export default carritoRouter;
