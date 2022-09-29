import { allCarts } from "../Data/allCarts.js";
import { getNewCartId } from "../utils/carritoUtils.js";

export const ping = (req, res) => {
  res.status(200).json({ status: "OK" });
};

export const getCarts = (req, res) => {
  res.json(allCarts);
};

export const createNewCart = (req, res) => {
  const newCart = req.body;
  console.log(newCart);
  if (newCart.length < 1 || Object.keys(newCart).length === 0) {
    res.status(500).json({ status: "error", message: "Tu carrito esta vacio" });
  } else {
    //aqui tiene que ir el write file
    allCarts.push({
      productos: newCart,
      id: getNewCartId(allCarts.length),
      timeStamp: new Date()
    });
    console.log(allCarts);
    res
      .status(200)
      .json({ status: "OK", id: allCarts[allCarts.length - 1].id });
  }
};

export const deleteCart = (req, res) => {
  const id = req.params.id + 1;

  function removeObjectWithId(arr, id) {
    const objWithIdIndex = arr.findIndex((obj) => obj.id === id);
    arr.splice(objWithIdIndex, 1);

    return arr;
  }

  removeObjectWithId(allCarts, id);
  res.json(allCarts);
};
