import { allProducts } from "../Data/allProducts.js";

export const ping = (req, res) => {
  res.status(200).json({ status: "OK" });
};

export const getAll = (req, res) => {
  res.status(200).json(allProducts);
};
export const getOne = (req, res) => {
  const { id } = req.params;
  const resultingProd = allProducts[id - 1];
  res.status(200).json(resultingProd);
};

export const addOne = (req, res) => {
  // crea un nuevo id dependiendo del ultimo item,
  // le hace push al array existente y lo manda de regreso
};

export const modifyOne = (req, res) => {
  //recibe un form con nueva informacion sobre un item, lo filtra, elimina el viejo y mete el nuevo
  // despues lo manda
};

export const deleteOne = (req, res) => {
  //recibe por url el id del item que se va a eliminar asi filtra la cadena y manda una nueva sin ese id
  //despues lo manda
};
