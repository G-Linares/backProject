import { Router } from "express";
import { Contenedor } from "../Class/Contenedor.js";

const items = new Contenedor("./Data/data.json");

const productRouter = Router();

productRouter.get("/", async (req, res) => {
  res.status(200).json(await items.getAll());
});

productRouter.get("/:id", async (req, res) => {
  const id = Number(req.params.id);
  try {
    res.json(await items.getById(id));
  } catch (e) {
    res.status(404).send({ error: "Producto No Encontrado" });
  }
});

productRouter.post("/", async (req, res) => {
  const { thumbnail, price, title } = req.body;
  try {
    const resultingID = await items.save({
      title: title,
      thumbnail: thumbnail,
      price: price
    });
    res.status(201).send({ success: `Item creado con el ID: ${resultingID}` });
  } catch (e) {
    res.status(500).send({ error: "No se pudo crear el item" });
  }
});

productRouter.put("/:id", async (req, res) => {
  const { thumbnail, price, title } = req.body;
  const id = Number(req.params.id);
  try {
    const idOfItemModified = await items.modifyById(id, {
      title: title,
      thumbnail: thumbnail,
      price: price
    });
    res.status(200).send({
      success: `Se modifico el item ${idOfItemModified} satisfactoriamente`
    });
  } catch (e) {
    res.status(500).send({
      error: `No se modifico por que ${e}`
    });
  }
});

productRouter.delete("/:id", async (req, res) => {
  const id = Number(req.params.id);
  try {
    await items.deleteById(id);
    res.status(200).send({
      success: `Se borro satisfactoriamente`
    });
  } catch (e) {
    res.status(500).send({
      error: `No se modifico por que ${e}`
    });
  }
});

export default productRouter;
