import express from "express";
import { item1, item2, item3 } from "./dummyData.js";
import { Contenedor } from "./Contenedor.js";

const app = express();

const PORT = process.env.PORT || 8080;

const items = new Contenedor("./productos.txt");

//esto va a crear los items cuando se arranca el servidor
const createInstances = async (items) => {
  await items.save(item1);
  await items.save(item2);
  await items.save(item3);
};

app.use("/products", async (req, res) => {
  let allCurrentItem = await items.getAll();
  res.send(JSON.stringify(allCurrentItem, null, 2));
});

app.use("/productoRandom", async (req, res) => {
  let allCurrentItem = await items.getAll();
  let randomIndex = Math.floor(Math.random() * allCurrentItem.length);
  res.send(JSON.stringify(allCurrentItem[randomIndex], null, 2));
});

app.listen(PORT, () => {
  createInstances(items);
  console.log(`Server running on port: ${PORT}`);
});
