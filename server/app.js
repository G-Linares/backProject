import express from "express";
import cors from "cors";

import productosRouter from "./Routers/productosRouter.js";

const PORT = process.env.PORT || 8080;
const app = express();

app.use(cors());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/productos", productosRouter);

const server = app.listen(PORT, () => {
  console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
});
server.on("error", (error) => console.log(`Error en servidor ${error}`));
