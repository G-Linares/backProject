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
  try {
    const url = req.body;
    let modeledNewItem = {
      ...url,
      // crea un nuevo id dependiendo del ultimo item,
      id: getNewId(allProducts.length),
      price: parseInt(url.price, 10),
      stock: parseInt(url.stock, 10),
      alcohol: parseInt(url.alcohol, 10)
    };
    // le hace push al array existente
    allProducts.push(modeledNewItem);
    res
      .status(200)
      .json({ status: "OK", message: "Item Agregado Satisfactoriamente" });
  } catch (e) {
    return res
      .status(500)
      .json({ status: "ERROR", message: "No se pudo agregar item", e });
  }
};

//agarra el id del item a modificar y la nueva data y la mezcla en el array existente
export const modifyOne = (req, res) => {
  const newItemData = req.body;
  const idOfItem = req.params.id;
  try {
    allProducts[idOfItem - 1] = {
      ...newItemData,
      id: allProducts[idOfItem - 1].id
    };
    return res
      .status(200)
      .json({ status: "OK", message: "Item Editado Satisfactoriamente" });
  } catch (e) {
    return res
      .status(500)
      .json({ status: "ERROR", message: "No se pudo editar item", e });
  }
};

//se hace llamado a este metodo solo en <AdminButtons />
export const deleteOne = (req, res) => {
  let itemId = parseInt(req.params.id, 10);
  //funcion para borrar un item, arumnetos recibe la array y el id del elemento
  try {
    removeObjectWithId(allProducts, itemId);
    res
      .status(200)
      .json({ status: "OK", message: "Item Borrado Satisfactoriamente" });
  } catch (e) {
    return res
      .status(500)
      .json({ status: "ERROR", message: "No se pudo borrar item", e });
  }
};
