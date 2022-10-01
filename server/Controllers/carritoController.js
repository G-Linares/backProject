import { getNewCartId, removeObjectWithId } from "../utils/carritoUtils.js";

import { Contenedor } from "../Class/Contenedor.js";

const contenedor = new Contenedor("./Data/carritos.json");

export const ping = (req, res) => {
  res.status(200).json({ status: "OK" });
};

export const getCarts = async (req, res) => {
  try {
    const allCarts = await contenedor.getAll();
    res.status(200).json(allCarts);
  } catch (e) {
    res.status(500).json({ status: "error", message: "algo salio mal" });
  }
};

export const createNewCart = async (req, res) => {
  const newCart = req.body;
  if (newCart.length < 1 || Object.keys(newCart).length === 0) {
    res.status(500).json({ status: "error", message: "Tu carrito esta vacio" });
  } else {
    const allCarts = await contenedor.getAll();
    allCarts.push({
      productos: newCart,
      id: getNewCartId(allCarts.length),
      timeStamp: new Date()
    });
    contenedor.saveAll(allCarts);
    res
      .status(200)
      .json({ status: "OK", id: allCarts[allCarts.length - 1].id });
  }
};

export const deleteCart = async (req, res) => {
  const id = req.params.id;
  try {
    const allCarts = await contenedor.getAll();
    if (id > allCarts.length || id < 0)
      res
        .status(500)
        .json({ status: "error", message: "no hay item con ese id" });
    const resultingArray = removeObjectWithId(allCarts, id);
    await contenedor.saveAll(resultingArray);
    res.status(200).json({ status: "success", message: "carrito borrado" });
  } catch (e) {
    res.status(500).json({ status: "error", message: "algo salio mal" });
  }
};
