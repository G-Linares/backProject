import { allProducts } from "../Data/allProducts.js";
import { getNewId, removeObjectWithId } from "../utils/productosUtils.js";

export const ping = (req, res) => {
  res.status(200).json({ status: "OK" });
};

// se hace llamado a este metodo en <ProductGrid/>
export const getAll = (req, res) => {
  res.status(200).json(allProducts);
};
// se hace llamado a este metodo en <ProductDetail />
export const getOne = (req, res) => {
  const { id } = req.params;
  if (!id)
    return res
      .status(500)
      .json({ status: "ERROR", message: "Item No Encontrado" });
  const resultingProd = allProducts[id - 1];
  res.status(200).json(resultingProd);
};

// se hace llamado a este metodo en <Form/>
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
  res
    .status(200)
    .json({ status: "OK", message: "Item Agregado Satisfactoriamente" });
};

export const modifyOne = (req, res) => {
  //recibe un form con nueva informacion sobre un item, lo filtra, elimina el viejo y mete el nuevo
  // despues lo manda
};

//se hace llamado a este metodo solo en <AdminButtons />
export const deleteOne = (req, res) => {
  let itemId = parseInt(req.params.id, 10);
  //funcion para borrar un item, arumnetos recibe la array y el id del elemento
  removeObjectWithId(allProducts, itemId);
  res
    .status(200)
    .json({ status: "OK", message: "Item Borrado Satisfactoriamente" });
};
