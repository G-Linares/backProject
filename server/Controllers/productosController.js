import { allProducts } from "../Data/allProducts.js";
import { getNewId, removeObjectWithId } from "../utils/productosUtils.js";

export const ping = (req, res) => {
  res.status(200).json({ status: "OK" });
};

export const getAll = (req, res) => {
  res.status(200).json(allProducts);
};
export const getOne = (req, res) => {
  const { id } = req.params;
  if (!id)
    return res
      .status(500)
      .json({ status: "ERROR", message: "item no encontrado" });
  const resultingProd = allProducts[id - 1];
  res.status(200).json(resultingProd);
};

export const addOne = (req, res) => {
  const url = req.body;
  let modeledNewItem = {
    ...url,
    // crea un nuevo id dependiendo del ultimo item,
    id: getNewId(allProducts.length),
    precio: parseInt(url.precio, 10),
    stock: parseInt(url.stock, 10),
    alcohol: parseInt(url.alcohol, 10)
  };
  // le hace push al array existente
  allProducts.push(modeledNewItem);
  res.status(200).json({ status: "OK", message: "item agregado" });
};

export const modifyOne = (req, res) => {
  //recibe un form con nueva informacion sobre un item, lo filtra, elimina el viejo y mete el nuevo
  // despues lo manda
};

export const deleteOne = (req, res) => {
  let itemId = parseInt(req.params.id, 10);
  //funcion para borrar un item, arumnetos recibe la array y el id del elemento
  removeObjectWithId(allProducts, itemId);
  console.log(allProducts);
  res.status(200).json({ status: "OK", message: "item agregado" });
};
